const { Octokit } = require('@octokit/rest');

const username = 'xiaoyongkong';
const accessToken = 'YOUR_GITHUB_KEY';

const octokit = new Octokit({
  auth: `token ${accessToken}`,
});

exports.getAllRepos = async (req, res) => {
  try {
    const response = await octokit.repos.listForUser({ username });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRepoInfo = async (req, res) => {
  try {
    const response = await octokit.repos.get({ owner: username, repo });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
