const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({
    message: 'Kubernetes networking!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});