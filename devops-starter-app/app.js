const express = require('express');
const fs = require('fs');
const app = express();

// Home page
app.get('/', (req, res) => {
  res.send(`
    <h2>🚀 DevOps Dashboard</h2>
    <p><b>Current Build:</b> ${process.env.BUILD_NUMBER}</p>
    <a href="/history">📊 View Deployment History</a>
  `);
});

// History page with table UI
app.get('/history', (req, res) => {
  fs.readFile('/app/deployments.log', 'utf8', (err, data) => {
    if (err) {
      return res.send("<h2>No deployment history found</h2>");
    }

    const lines = data.trim().split('\n').reverse();

    let tableRows = '';

    lines.forEach((line, index) => {
      const isLatest = index === 0;
      tableRows += `
        <tr style="background:${isLatest ? '#d4edda' : '#fff'}">
          <td>${line}</td>
          <td>${isLatest ? '🟢 Current' : ''}</td>
        </tr>
      `;
    });

    res.send(`
      <html>
      <head>
        <title>Deployment Dashboard</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 10px; }
          th { background-color: #333; color: white; }
          tr:hover { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h2>📊 Deployment History</h2>
        <table>
          <tr>
            <th>Details</th>
            <th>Status</th>
          </tr>
          ${tableRows}
        </table>
        <br>
        <a href="/">⬅ Back to Home</a>
      </body>
      </html>
    `);
  });
});

// Start server
app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});
