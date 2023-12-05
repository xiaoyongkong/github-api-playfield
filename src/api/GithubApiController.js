const { Octokit } = require('@octokit/rest');

const username = 'xiaoyongkong';
const accessToken = 'YOUR_GITHUB_TOKEN';

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

exports.createRepo = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await octokit.repos.createForAuthenticatedUser({ name });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editRepo = async (req, res) => {
  try {
    const { repo } = req.params;
    const existingInfo = await octokit.repos.get({ owner: username, repo });
    const updatedInfo = {
      name: req.body.name || existingInfo.data.name,
      description: req.body.description || existingInfo.data.description,
    };

    const response = await octokit.repos.update({ owner: username, repo, ...updatedInfo });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteRepo = async (req, res) => {
  try {
    const { repo } = req.params;
    const response = await octokit.repos.delete({ owner: username, repo });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



