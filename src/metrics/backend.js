const express = require('express');
const app = express();
app.use(express.json());

// Sample Database (Replace with real DB)
let businesses = [];

// Fetch Businesses
app.get('/api/businesses', (req, res) => res.json(businesses));

// Create Business
app.post('/api/businesses', (req, res) => {
  const newBusiness = { id: businesses.length + 1, ...req.body };
  businesses.push(newBusiness);
  res.json(newBusiness);
});

// Start Ad
app.post('/api/start-ad/:adId', (req, res) => {
  // Call Meta/TikTok API to start ad (implement this)
  res.json({ success: true, message: 'Ad started' });
});

// Stop Ad
app.post('/api/stop-ad/:adId', (req, res) => {
  // Call Meta/TikTok API to stop ad (implement this)
  res.json({ success: true, message: 'Ad stopped' });
});

// Upload Business to Cloud
app.post('/api/upload-business/:businessId', (req, res) => {
  // Upload to cloud storage (e.g., Firebase, AWS S3)
  res.json({ success: true, message: 'Uploaded successfully' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
