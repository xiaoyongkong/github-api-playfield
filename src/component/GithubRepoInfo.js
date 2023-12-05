import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CreateModal from './Modal/CreateRepo';
import EditModal from './Modal/EditRepo';

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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      setIsCreateModalOpen(false);
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
    setIsEditModalOpen(true);
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
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error:' + error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDeleteRepo = async (repoName) => {
    const shouldDelete = window.confirm('Are you sure you want to delete ' + repoName + ' ?');
    if (!shouldDelete) {
      return;
    }
    const apiUrl = `http://localhost:3001/api/delete-repo/${repoName}`;
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

  return (
    <div>
      <ToastContainer />
      <button onClick={() => setIsCreateModalOpen(true)}>Create New Repository</button>
      <CreateModal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
        handleCreateRepo={handleCreateRepo}
        newRepoName={newRepoName}
        setNewRepoName={setNewRepoName}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onEdit={() => handleEditRepo()}
        editRepoData={editRepoData}
        onInputChange={handleEditInputChange}
        onSaveEdit={handleSaveEdit}
      />

      {repos.length > 0 ? (
        <div>
          <h2>List of Repositories</h2>
          {repos.map(repo => (
            <div className="repo-container" key={repo.id}>
              <h3>{repo.name}</h3>
              <h5>
                {"Description"}
                <p className="repo-container__description--text">{repo.description || "None"}</p>
              </h5>
              <p>{repo.html_url}</p>
                <div>
                  <button onClick={() => handleEditRepo(repo.id)}>Edit</button>
                  <button className={"repo-container__button--delete"} onClick={() => handleDeleteRepo(repo.name)}>Delete</button>
                </div>
              
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
