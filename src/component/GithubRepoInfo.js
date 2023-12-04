import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GithubRepoInfo = () => {
  const [repoInfo, setRepoInfo] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/api/github-repo-info'; 
    axios.get(apiUrl)
      .then(response => {
        setRepoInfo(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  return (
    <div>
      {repoInfo ? (
        <div>
          <h2>{"Repo Name -> " + repoInfo.name}</h2>
          <p>{"Repo Description -> " + repoInfo.description}</p>
          <p>{"Repo Owner -> " + repoInfo.owner.login}</p>
          <p>{"Repo URL -> " + repoInfo.html_url}</p>
        </div>
      ) : (
        <p>Carregando informações do repositório...</p>
      )}
    </div>
  );
};

export default GithubRepoInfo;
