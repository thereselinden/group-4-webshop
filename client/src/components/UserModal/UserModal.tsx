import { useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import LoginForm from '../Form/LoginForm';
import RegisterForm from '../Form/RegisterForm';
import { useUserContext } from '../../context/UserContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserModal = () => {
  const [login, setLogin] = useState(true);
  const { userModal, setUserModal, setRegisterSuccess, setErrorMessage } =
    useUserContext();

  const toggleForm = () => {
    setLogin(!login);
    setRegisterSuccess(false);
    setErrorMessage(null);
  };

  return (
    <div>
      <Modal
        open={userModal}
        onClose={() => setUserModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {login ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <RegisterForm toggleForm={toggleForm} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
