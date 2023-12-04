import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GithubRepoInfo = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/api/github-repos';
    axios.get(apiUrl)
      .then(response => {
        setRepos(response.data);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, []);

  return (
    <div>
      {repos.length > 0 ? (
        <div>
          <h2>Lista de Repositórios</h2>
          <ul>
            {repos.map(repo => (
              <li key={repo.id}>
                <h3>{"Repo Name -> " + repo.name}</h3>
                <p>{"Repo Description -> " + (repo.description || "None")}</p>
                <p>{"Repo URL -> " + repo.html_url}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Carregando informações dos repositórios...</p>
      )}
    </div>
  );
};

export default GithubRepoInfo;
