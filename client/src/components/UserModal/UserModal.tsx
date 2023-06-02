import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoginForm from '../Form/LoginForm';
import { useState } from 'react';
import RegisterForm from '../Form/RegisterForm';

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

type Props = {
  open: boolean;
  handleClose: () => void;
};

const UserModal = ({ open, handleClose }: Props) => {
  const [login, setLogin] = useState(true);

  const toggleForm = () => {
    setLogin(!login);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {login ? (
            <LoginForm toggleForm={toggleForm} handleClose={handleClose} />
          ) : (
            <RegisterForm toggleForm={toggleForm} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
