const app = require('./app')

const { PORT = 3000 } = process.env

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

// Quit connection pool in a graceful manner
process.on('SIGINT', () => {
  console.log('\n Closing connection pools')
  global.ConnectionPools.end(function (err) {
    // all connections in the pool have ended
  });
  process.exit()
})

