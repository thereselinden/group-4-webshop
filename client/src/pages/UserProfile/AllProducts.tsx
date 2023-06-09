import { useState } from 'react';

import { useProductContext } from '../../context/ProductContext';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {};

const AllProducts = (props: Props) => {
  const [dialogOpen, setDialogOpen] = useState<any>({
    open: false,
    product: '',
  });

  const { deleteProduct, products } = useProductContext();

  const handleClickOpen = (id: string) => {
    setDialogOpen({ open: true, product: id });
  };

  const handleClose = () => {
    setDialogOpen({ open: false });
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    handleClose();
  };

  return (
    <>
      {products &&
        products?.map(product => (
          <Card sx={{ maxWidth: 345 }} key={product._id}>
            <CardMedia
              component="img"
              alt={product.title}
              height="140"
              image={product.image}
            />
            <CardContent>
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
            <CardActions>
              <Button size="small" variant="contained" color="accent">
                Uppdatera
              </Button>
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => handleClickOpen(product._id)}
              >
                Ta bort
              </Button>
            </CardActions>
          </Card>
        ))}
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
    </>
  );
};

export default AllProducts;
