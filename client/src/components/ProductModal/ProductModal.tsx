import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ProductForm from '../Form/ProductForm';
import { useProductContext } from '../../context/ProductContext';

type Props = {
  productId: string | null;
  setProductId: (arg0: string | null) => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ProductModal = ({ productId, setProductId }: Props) => {
  const { productModal, setProductModal } = useProductContext();

  const handleProductModal = () => {
    setProductModal(false);
    setProductId(null);
  };

  return (
    <div>
      <Modal
        open={productModal}
        onClose={handleProductModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductForm productId={productId} />
        </Box>
      </Modal>
    </div>
  );
};

export default ProductModal;
