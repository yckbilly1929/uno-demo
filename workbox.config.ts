/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable @typescript-eslint/no-var-requires */

import { GenerateSWOptions, ManifestTransform } from 'workbox-build'

import getPublicUrlOrPath from './react-dev-utils/getPublicUrlOrPath'

const isDev = process.env.NODE_ENV !== 'production'
const publicUrlOrPath = getPublicUrlOrPath(isDev, undefined, process.env.PUBLIC_URL)

const cdnTransform: ManifestTransform = async (manifestEntries) => {
  const manifest = manifestEntries.map((entry) => {
    // TODO: cache with cdn
    // const cdnOrigin = 'https://example.com'
    // if (entry.url.startsWith('/assets/')) {
    //   entry.url = cdnOrigin + entry.url
    // }
    entry.url = publicUrlOrPath + entry.url
    return entry
  })
  return { manifest, warnings: [] }
}

const config: GenerateSWOptions = {
  // fix browser compatability bug
  inlineWorkboxRuntime: true,
  clientsClaim: true,
  skipWaiting: true,
  mode: 'production',
  // eslint-disable-next-line no-sparse-arrays
  manifestTransforms: [cdnTransform],
  // exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
  maximumFileSizeToCacheInBytes: 2.5 * 1024 * 1024, // cache at most 2.5 MB
  runtimeCaching: [
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'CacheFirst', // can be cache-first as each change results in new hash
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
  ],
  globDirectory: './dist',
  globPatterns: ['**.{html,png,json,txt,ico}'],
  swDest: './dist/service-worker.js',
  sourcemap: false,
}

export default config
