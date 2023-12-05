import React, { useState } from 'react';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';

const CreateModal = ({ isOpen, onRequestClose }) => {
  const [newRepoName, setNewRepoName] = useState('');

  const handleCreate = async () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      classNames={"create-repo-container"}
      contentLabel="Create New Repository Modal"
    >
      <h2>Create New Repository</h2>
      <label>
        Repository Name:
        <input
          type="text"
          value={newRepoName}
          className={"create-repo-container__input-name"}
          onChange={(e) => setNewRepoName(e.target.value)}
        />
      </label>
      <button onClick={handleCreate}>Save</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CreateModal;
