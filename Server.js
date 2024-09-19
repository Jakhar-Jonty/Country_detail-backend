const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BASE_URL = 'https://restcountries.com/v3.1';

// Search endpoint
app.get('/api/countries', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }

    const response = await axios.get(`${BASE_URL}/name/${name}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'No countries found' });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching countries' });
    }
  }
});

// countries list

app.get('/api/allcountries', async (req, res) => {
  try {
    
    // const { name } = req.query;
    // if (!name) {
    //   return res.status(400).json({ error: 'Name parameter is required' });
    // }

    const response = await axios.get(`${BASE_URL}/all`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'No countries found' });
    } else {
      res.status(500).json({ error: 'An error occurred while fetching countries' });
    }
  }
});

// Detail endpoint
// app.get('/api/countries/:code', async (req, res) => {
//   try {
//     const { code } = req.params;
//     const response = await axios.get(`${BASE_URL}/alpha/${code}`);
//     res.json(response.data[0]);
//   } catch (error) {
//     console.error('Error fetching country details:', error);
//     if (error.response && error.response.status === 404) {
//       res.status(404).json({ error: 'Country not found' });
//     } else {
//       res.status(500).json({ error: 'An error occurred while fetching country details' });
//     }
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});