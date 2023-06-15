import { useState } from 'react';

import { useProductContext } from '../../context/ProductContext';
import ProductModal from '../../components/ProductModal/ProductModal';
import { IProductDialog } from '../../interfaces/interfaces';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const AllProducts = () => {
  const [dialogOpen, setDialogOpen] = useState<IProductDialog>({
    open: false,
    product: '',
  });
  const [productId, setProductId] = useState<string>('');

  const { deleteProduct, products, setProductModal } = useProductContext();

  const handleClickOpen = (id: string) => {
    setDialogOpen({ open: true, product: id });
  };

  const handleUpdateClick = (id: string) => {
    setProductModal(true);
    setProductId(id);
  };

  const handleClose = () => {
    setDialogOpen({ ...dialogOpen, open: false });
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    handleClose();
  };

  const buttonWrapper = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,

    '@media (min-width: 900px)': {
      flexDirection: 'row',
    },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: 'repeat(3, 1fr)' },
        gap: 2,
      }}
      component="section"
    >
      {products &&
        products?.map(product => (
          <Card
            sx={{
              xs: { maxWidth: '100%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            key={product._id}
            component="article"
          >
            <CardMedia
              component="img"
              alt={product.title}
              height="140"
              image={product.image}
            />
            <CardContent sx={{ height: '100%' }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography gutterBottom variant="body2" component="p">
                {product.price} SEK
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>
            <CardActions sx={buttonWrapper}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                color="accent"
                onClick={() => handleUpdateClick(product._id)}
              >
                Uppdatera
              </Button>
              <Button
                fullWidth
                size="small"
                variant="contained"
                color="warning"
                onClick={() => handleClickOpen(product._id)}
                style={{ marginLeft: 0 }}
              >
                Ta bort
              </Button>
            </CardActions>
          </Card>
        ))}
      <ProductModal productId={productId} setProductId={setProductId} />
      <Dialog
        open={dialogOpen.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Är du säker på att du vill ta bort produkten?'}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="accent" variant="contained">
            Avbryt
          </Button>
          <Button
            onClick={() => handleDelete(dialogOpen.product)}
            autoFocus
            color="warning"
            variant="contained"
          >
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllProducts;
