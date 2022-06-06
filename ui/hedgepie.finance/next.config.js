const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  env: {
    REACT_APP_CHAIN_ID: '56',
    WEB3_STORAGE_API_TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI2ZTA1YUU0OTk1RUM2NzczMzEyNDhlNGE2NzUxZmJFNzA1NGIwMjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTI1NTE5NTA3ODQsIm5hbWUiOiJIZWRnZVBpZSJ9.ork_9KUdnTA-zTx9jKwHcE1f_IWcK9CQU_SIpQquKwo',
  },
})
