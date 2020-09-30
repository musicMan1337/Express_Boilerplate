const app = require('./app');
const logger = require('./libs/logger');
const { PORT } = require('./config/envConfig');

app.listen(PORT, () => {
  logger.http(`Server listening at http://localhost:${PORT}`);
});
