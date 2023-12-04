const express = require('express');
const router = express.Router();
const githubApiController = require('./GithubApiController');

router.get('/github-repos', githubApiController.getAllRepos);

module.exports = router;
