const express = require('express');
const router = express.Router();
const githubApiController = require('./GithubApiController');

router.get('/github-repos', githubApiController.getAllRepos);
router.post('/create-repo', githubApiController.createRepo);
router.put('/edit-repo/:repo', githubApiController.editRepo);
router.delete('/delete-repo/:repo', githubApiController.deleteRepo);

module.exports = router;
