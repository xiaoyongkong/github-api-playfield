import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GithubRepoInfo = () => {
  const [repos, setRepos] = useState([]);
  const [newRepoName, setNewRepoName] = useState('');
  const [editRepoData, setEditRepoData] = useState({
    id: null,
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = () => {
    const apiUrl = 'http://localhost:3001/api/github-repos';
    axios.get(apiUrl)
      .then(response => {
        setRepos(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  const handleCreateRepo = async () => {
    const apiUrl = 'http://localhost:3001/api/create-repo';
    try {
      await axios.post(apiUrl, { name: newRepoName });
      console.log('Repository created successfully');
      fetchRepos();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEditRepo = (repoId) => {
    const repoToEdit = repos.find(repo => repo.id === repoId);
    setEditRepoData({
      id: repoId,
      name: repoToEdit.name,
      description: repoToEdit.description || '',
    });
  };

  const handleEditInputChange = (e) => {
    setEditRepoData({
      ...editRepoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = async (repoName) => {
    const apiUrl = `http://localhost:3001/api/edit-repo/${repoName}`;
    try {
      await axios.put(apiUrl, {
        name: editRepoData.name,
        description: editRepoData.description,
      });
      console.log('Repository edited successfully');
      fetchRepos();
      setEditRepoData({
        id: null,
        name: '',
        description: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteRepo = async (repoId) => {
    const apiUrl = `http://localhost:3001/api/delete-repo/${repoId}`;
    try {
      await axios.delete(apiUrl);
      console.log('Repository deleted successfully');
      fetchRepos();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <div>
        <label>
          New Repository:
          <input
            type="text"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
        </label>
        <button onClick={handleCreateRepo}>Create New Repository</button>
      </div>

      {repos.length > 0 ? (
        <div>
          <h2>List of Repositories</h2>
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>
                <h3>{"Repo Name -> " + repo.name}</h3>
                <p>{"Repo Description -> " + (repo.description || "None")}</p>
                <p>{"Repo URL -> " + repo.html_url}</p>
                {editRepoData.id === repo.id ? (
                  <div>
                    <label>
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={editRepoData.name}
                        onChange={handleEditInputChange}
                      />
                    </label>
                    <label>
                      Description:
                      <input
                        type="text"
                        name="description"
                        value={editRepoData.description}
                        onChange={handleEditInputChange}
                      />
                    </label>
                    <button onClick={() => handleSaveEdit(repo.name)}>Save</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEditRepo(repo.id)}>Edit</button>
                    <button onClick={() => handleDeleteRepo(repo.name)}>Delete</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading repository information...</p>
      )}
    </div>
  );
};

export default GithubRepoInfo;
