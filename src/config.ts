const config = {
  // from bundler
  version: process.env.VERSION || 'unknown',
  nodeEnv: process.env.NODE_ENV,

  // regex
  passwordPattern: /^[A-Za-z0-9!@#$%^&*()]+$/,
} as const

export default config
