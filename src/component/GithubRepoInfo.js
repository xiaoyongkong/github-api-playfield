import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GithubRepoInfo.css';

const GithubRepoInfo = () => {
  const [repos, setRepos] = useState([]);
  const [newRepoName, setNewRepoName] = useState('');
  const [editRepoData, setEditRepoData] = useState({
    id: null,
    name: '',
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


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
      toast.success('Repository created successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchRepos();
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:' + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
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
      toast.success('Repository edited successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchRepos();
      setEditRepoData({
        id: null,
        name: '',
        description: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:' + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDeleteRepo = async (repoId) => {
    const apiUrl = `http://localhost:3001/api/delete-repo/${repoId}`;
    try {
      await axios.delete(apiUrl);
      console.log('Repository deleted successfully');
      toast.success('Repository deleted successfully', {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchRepos();
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:' + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={() => setIsModalOpen(true)}>Create New Repository</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Create New Repository Modal"
      >
        <h2>Create New Repository</h2>
        <label>
          Repository Name:
          <input
            type="text"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
        </label>
        <button onClick={handleCreateRepo}>Save</button>
      </Modal>

      {repos.length > 0 ? (
        <div>
          <h2>List of Repositories</h2>
            {repos.map(repo => (
              <div className="repo-container" key={repo.id}>
                <h3>{repo.name}</h3>
                <h5>{"Description"}
                  <p className="repo-container__description--text">{repo.description || "None"}</p>
                </h5>
                <p>{repo.html_url}</p>
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
              </div>
            ))}
        </div>
      ) : (
        <p>Loading repository information...</p>
      )}
    </div>
  );
};

export default GithubRepoInfo;
