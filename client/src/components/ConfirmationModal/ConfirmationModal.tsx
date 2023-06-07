import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Modal from '@mui/material/Modal';
import useFetch from '../../hooks/useFetch';
import { IConfirmedOrder } from '../../interfaces/interfaces';
import {
  formatOrderDate,
  calcOrderItemTotal,
  calcOrderProductTotal,
  calcOrderTotal,
} from '../../utils/helper';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  m: 'auto',
};

type Props = {
  confirmationModal: boolean;
  handleConfirmationCloseModal: () => void;
  order: string;
};

const ConfirmationModal = ({
  confirmationModal,
  handleConfirmationCloseModal,
  order,
}: Props) => {
  const [[confirmedOrder, setConfirmedOrder]] = useFetch<IConfirmedOrder>(
    `/api/orders/${order}`
  );

  let orderProductTotal = 0;

  if (confirmedOrder)
    orderProductTotal = calcOrderProductTotal(confirmedOrder.orderItems);

  return (
    <div>
      {confirmedOrder && (
        <Modal
          open={confirmationModal}
          onClose={() => handleConfirmationCloseModal()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Tack för din beställning, {confirmedOrder.customer.firstName}!
            </Typography>
            <Typography>
              Ordernummer: {confirmedOrder.orderNumber}
              <br />
              Orderdatum: {formatOrderDate(confirmedOrder.createdAt)}
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Kunduppgifter
              </Typography>
              <Typography>
                {confirmedOrder.customer.firstName}{' '}
                {confirmedOrder.customer.lastName}
                <br />
                {confirmedOrder.deliveryAddress.street}
                <br />
                {confirmedOrder.deliveryAddress.zipcode}{' '}
                {confirmedOrder.deliveryAddress.city}
                <br />
                {confirmedOrder.deliveryAddress.country}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Produkter
              </Typography>
              <List>
                {confirmedOrder.orderItems.map(item => (
                  <ListItem
                    key={item.product._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      py: 0,
                    }}
                  >
                    <Typography>
                      {item.quantity} x {item.product.title}
                    </Typography>
                    <Typography>
                      {calcOrderItemTotal(item.quantity, item.price)} SEK
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider />
            <Box>
              <List>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 0,
                  }}
                >
                  <Typography>Summa</Typography>
                  <Typography>{orderProductTotal} SEK</Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 0,
                  }}
                >
                  <Typography variant="subtitle1">Fraktkostnad</Typography>
                  <Typography variant="subtitle1">
                    {confirmedOrder.shippingMethod.price} SEK
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 0,
                  }}
                >
                  <Typography variant="h6">Totalsumma</Typography>
                  <Typography variant="h6">
                    {orderProductTotal + confirmedOrder.shippingMethod.price}{' '}
                    SEK
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ConfirmationModal;
