const axios = require('axios');

const username = 'xiaoyongkong';
const repo = 'github-api-playfield';
const accessToken = 'YOUR_GITHUB_TOKEN';

const apiUrl = `https://api.github.com/repos/${username}/${repo}`;

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

exports.getRepoInfo = async (req, res) => {
  try {
    const response = await axiosInstance.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
