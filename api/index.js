const app = require('../server');

// Simple health check — no DB, no i18n needed
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
