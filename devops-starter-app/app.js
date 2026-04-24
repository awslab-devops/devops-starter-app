const express = require('express');
const fs = require('fs');
const app = express();

// Home route (shows current version)
app.get('/', (req, res) => {
  res.send(`
    <h2>DevOps App</h2>
    <p>Build number: ${process.env.BUILD_NUMBER}</p>
    <a href="/history">View Deployment History</a>
  `);
});

// Deployment history route
app.get('/history', (req, res) => {
  fs.readFile('/var/log/deployments.log', 'utf8', (err, data) => {
    if (err) {
      return res.send(`
        <h2>Deployment History</h2>
        <p>No deployment history found</p>
      `);
    }

    res.send(`
      <h2>Deployment History</h2>
      <pre>${data}</pre>
      <br>
      <a href="/">Go Back</a>
    `);
  });
});

// Start server
app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});
