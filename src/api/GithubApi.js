const express = require('express');
const router = express.Router();
const githubApiController = require('./GithubApiController');

router.get('/github-repo-info', githubApiController.getRepoInfo);

module.exports = router;
