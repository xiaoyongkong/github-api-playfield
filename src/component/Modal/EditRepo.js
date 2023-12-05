import React from 'react';
import Modal from 'react-modal';

const EditRepo = ({ isOpen, onRequestClose, editRepoData, onInputChange, onSaveEdit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      classNames="edit-repo-container"
      contentLabel="Edit Repository Modal"
    >
      <h2>Edit Repository</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          className={"edit-repo-container__input-name"}
          value={editRepoData.name}
          onChange={onInputChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          className={"edit-repo-container__input-description"}
          value={editRepoData.description}
          onChange={onInputChange}
        />
      </label>
      <button onClick={onSaveEdit}>Save</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default EditRepo;
