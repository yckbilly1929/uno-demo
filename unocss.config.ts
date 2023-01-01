/* eslint-disable import/no-extraneous-dependencies */

import { defineConfig, presetAttributify, presetUno } from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'
import presetIcons from '@unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  include: ['src/**/*.{html,tsx}'],
  exclude: ['node_modules', '.git', 'dist'],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        demo: FileSystemIconLoader('./src/assets/images'),
      },
    }),
    presetAttributify({
      prefixedOnly: true,
      strict: true,
    }),
  ],
  transformers: [transformerCompileClass()],
})
