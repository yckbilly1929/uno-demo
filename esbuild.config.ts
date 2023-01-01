/* eslint-disable import/no-extraneous-dependencies */

import fs from 'fs-extra'
// const path = require('path')
import chalk from 'chalk'
import * as yaliveServer from 'yalive-server'
import escapeStringRegexp from 'escape-string-regexp'
import { watch } from 'chokidar'
import * as esbuild from 'esbuild'
// import postCssPlugin, { defaultOptions } from '@baurine/esbuild-plugin-postcss3'
// const { yamlPlugin } = require('esbuild-plugin-yaml')
// import postcssPreset from 'postcss-preset-env'
import { transform as svgrTransform } from '@svgr/core'
import { generateSW } from 'workbox-build'

import { version } from './package.json' assert { type: 'json' }
import getPublicUrlOrPath from './react-dev-utils/getPublicUrlOrPath'
import getClientEnvironment from './scripts/env'
import workboxConf from './workbox.config'

const buildStart = new Date()

const isDev = process.env.NODE_ENV !== 'production'

const publicUrlOrPath = getPublicUrlOrPath(isDev, undefined, process.env.PUBLIC_URL)
const env = getClientEnvironment(publicUrlOrPath.slice(0, -1))
const envRaw: { [key: string]: string } = env.raw

const genDefine = () => {
  const define: { [key: string]: string } = {}
  Object.entries(env.stringified['process.env']).forEach(([k, v]) => {
    define[`process.env.${k}`] = (v as string) || JSON.stringify('')
  })

  define['process.env.VERSION'] = JSON.stringify(version)
  return define
}

const svgrPlugin = (options = {}): esbuild.Plugin => ({
  name: 'svgr',
  setup(build) {
    build.onLoad({ filter: /\.svg/ }, async (args) => {
      const rawSvg = await fs.readFile(args.path, 'utf-8')
      const contents = await svgrTransform(rawSvg, { ...options }, { filePath: args.path })

      return {
        contents,
        loader: 'tsx', // assumed .svg always in tsx?
      }
    })
  },
})
const logTimePlugin = (_options = {}): esbuild.Plugin => ({
  name: 'logTime',
  setup(builder) {
    let time!: Date

    builder.onStart(() => {
      time = new Date()
      // eslint-disable-next-line no-console
      console.log('esbuild started')
    })

    builder.onEnd(() => {
      // eslint-disable-next-line no-console
      console.log(`esbuild ended: ${chalk.yellow(`${new Date().getTime() - time.getTime()}ms`)}`)
    })
  },
})

const esbuildParams: esbuild.BuildOptions & { incremental: true } = {
  color: true,
  entryPoints: {
    main: 'src/index.tsx',
    uno: 'src/uno-gen.css',
  },
  entryNames: '[name].[hash]',
  // loader: { '.ts': 'ts', '.tsx': 'tsx' },
  outdir: 'dist',
  metafile: true,
  minify: !isDev,
  format: 'esm',
  bundle: true,
  sourcemap: !isDev,
  logLevel: 'error',
  logOverride: {
    'css-syntax-error': 'error',
  },
  incremental: true,
  splitting: true,
  platform: 'browser',
  plugins: [svgrPlugin(), logTimePlugin()],
  define: genDefine(),
  inject: ['./scripts/process-shim.js'], // fix runtime crash
}

async function copyAssets() {
  await fs.copy('./public', './dist', {
    filter: (src, _dest) => {
      // skip index.html
      if (src.includes('.html')) {
        return false
      }
      return true
    },
  })
}

async function buildMain() {
  const builder = await esbuild.build(esbuildParams)

  return builder
}

function buildHtml(inputFilename: string, outputFilename: string) {
  let result = fs.readFileSync(inputFilename).toString()

  Object.keys(env.raw).forEach((key) => {
    const value = envRaw[key]
    result = result.replace(new RegExp(`%${escapeStringRegexp(key)}%`, 'g'), value)
  })

  fs.writeFileSync(outputFilename, result)
}

function handleAssets() {
  buildHtml('./www/index.html', './dist/index.html')
  // TODO: remove source map after submission?
}

function updateMeta(builder: esbuild.BuildIncremental) {
  Object.keys(builder.metafile?.outputs || []).forEach((k) => {
    const paths = k.split('/')
    const fileName = paths[paths.length - 1]

    if (fileName.match(/main\.[A-Z0-9]*\.js/g)) {
      envRaw.ENTRY_JS = fileName
    }
    if (fileName.match(/main\.[A-Z0-9]*\.css/g)) {
      envRaw.ENTRY_CSS = fileName
    }
    if (fileName.match(/uno\.[A-Z0-9]*\.css/g)) {
      envRaw.ATOMIC_CSS = fileName
    }
  })
}

async function handleWorkbox() {
  if (isDev || process.env.BUILD_LOCAL) {
    return
  }

  const meta = await generateSW({
    ...workboxConf,
  })

  const outputDir = workboxConf.swDest
  const numCached = meta.count
  const sizeInKB = (meta.size / 1024).toFixed(2)

  // eslint-disable-next-line no-console
  console.log(`Generated ${outputDir}, which will precache ${numCached} files, totaling ${sizeInKB} KB.`)
}

async function main() {
  fs.removeSync('./dist')

  // main process
  const [builder, _] = await Promise.all([Promise.resolve(buildMain()), Promise.resolve(copyAssets())])

  updateMeta(builder)

  // post process
  await Promise.all([Promise.resolve(handleAssets()), Promise.resolve(handleWorkbox())])

  if (isDev) {
    watch('src/**/*', { ignoreInitial: true }).on('all', async () => {
      const updatedBuilder = await builder.rebuild()
      updateMeta(updatedBuilder)
      handleAssets()
    })
    watch('public/**/*', { ignoreInitial: true }).on('all', async () => {
      await copyAssets()
      handleAssets()
    })

    yaliveServer.dev({
      port: 5500,
      root: 'dist',
      file: 'index.html',
      cors: true,
      https: true,
      historyApiFallback: true,
      proxy: [{ prefix: '/cdn-cgi', target: 'https://1.1.1.1', changeOrigin: true }],
      server: {
        debug: true,
        color: true,
      },
    })
  } else {
    if (process.env.BUILD_ANALYZER) {
      // eslint-disable-next-line no-console, @typescript-eslint/no-non-null-assertion
      console.log(await esbuild.analyzeMetafile(builder.metafile!, { verbose: false, color: true }))
    }
    // eslint-disable-next-line no-console
    console.log(`Total build ended: ${chalk.yellow(`${new Date().getTime() - buildStart.getTime()}ms`)}`)
    process.exit(0)
  }
}

main()
