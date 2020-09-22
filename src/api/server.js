const app = require('./app')
const { PORT } = require('../../src/config/envConfig')

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
