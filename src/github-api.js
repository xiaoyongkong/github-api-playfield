const axios = require('axios');

const username = 'xiaoyongkong';
const repo = 'github-api-playfield';
const accessToken = 'YOUR_ACESS_TOKEN';

const apiUrl = `https://api.github.com/repos/${username}/${repo}`;
const headers = {
  Authorization: `Bearer ${accessToken}`,
};

axios.get(apiUrl, { headers })
  .then(response => {
    console.log('Repo Info:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
