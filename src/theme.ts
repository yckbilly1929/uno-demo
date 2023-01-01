import { createStitches } from '@stitches/react'

import { blue, orange } from '@radix-ui/colors'

const { styled, createTheme, css } = createStitches({
  theme: {
    colors: {
      ...blue,
      ...orange,
      blueAntd: '#1677ff',
    },
  },
})

export { styled, createTheme, css }
