import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

import CartItemList from '../../components/CartItemList/CartItemList';
import Shipping from '../../components/Shipping/Shipping';
import useFetch from '../../hooks/useFetch';
import {
  IShipping,
  IDeliveryAddress,
  IConfirmedOrder,
} from '../../interfaces/interfaces';
import { useUserContext } from '../../context/UserContext';
import { useCartContext } from '../../context/CartContext';
import { calcOrderTotal } from '../../utils/helper';
import fetchData from '../../utils/FetchData';
import CustomerForm from '../../components/Form/CustomerForm';
import DeliveryAddressForm from '../../components/Form/DeliveryAddressForm';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import BackDropLoader from '../../components/BackDropLoader/BackDropLoader';

type Props = {};

const CheckoutContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '1rem',
  '@media (min-width: 780px)': {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    gap: '16px',
    padding: 0,
  },
});

const Checkout = (props: Props) => {
  const [
    [shippingMethods, setShippingMethods],
    [isLoading, setIsLoading],
    [errorMessage, setErrorMessage],
  ] = useFetch<IShipping[]>('/api/shippingmethod');

  shippingMethods?.sort((a, b) => {
    return a.price > b.price ? 1 : -1;
  });

  const [selectedShipping, setSelectedShipping] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingId, setShippingId] = useState('');
  const [order, setOrder] = useState<IConfirmedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  console.log('order state checkout ', order);

  const { calcProductTotal, numOfProducts, cartItems, clearCart } =
    useCartContext();
  const { user, setUserModal } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (shippingMethods) {
      setSelectedShipping(shippingMethods[0].company);
      setShippingPrice(shippingMethods[0].price);
    }
  }, [shippingMethods]);

  useEffect(() => {
    const selectedMethod = shippingMethods?.find(
      method => method.company === selectedShipping
    );
    if (selectedMethod) {
      setShippingPrice(selectedMethod.price);
      setShippingId(selectedMethod._id);
    }
  }, [selectedShipping]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShipping((event.target as HTMLInputElement).value);
  };

  const handleOrderSubmit = async (deliveryAddress: IDeliveryAddress) => {
    setLoading(true);
    const orderItems = cartItems.map(item => {
      const orderItem = {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };

      return orderItem;
    });

    const orderData = {
      orderItems,
      deliveryAddress,
      shippingMethod: shippingId,
    };

    try {
      const order = await fetchData<IConfirmedOrder>(
        '/api/orders',
        'POST',
        JSON.stringify(orderData)
      );
      if (!order) throw new Error('Det gick fel');
      setOrder(order);
      clearCart();
      setLoading(false);
      setConfirmationModal(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleConfirmationCloseModal = () => {
    setConfirmationModal(false);
    navigate('/profile');
  };

  return (
    <>
      <BackDropLoader loading={loading} />
      {numOfProducts() === 0 ? (
        <>
          <Typography>Din varukorg är tom</Typography>
          <Button variant="contained">Tillbaka till shoppen</Button>
        </>
      ) : (
        <CheckoutContainer>
          <Box>
            {shippingMethods && (
              <Shipping
                shippingMethods={shippingMethods}
                selectedShipping={selectedShipping}
                handleChange={handleChange}
              />
            )}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                Dina uppgifter
              </Typography>
              {!user ? (
                <Typography>
                  Du behöver vara inloggad för att göra en beställning.
                  <Button
                    variant="contained"
                    color="accent"
                    onClick={() => setUserModal(true)}
                  >
                    Logga in
                  </Button>
                </Typography>
              ) : (
                <>
                  <CustomerForm />
                  <DeliveryAddressForm handleOrderSubmit={handleOrderSubmit} />
                </>
              )}
            </Paper>
          </Box>
          <Paper
            variant="outlined"
            sx={{ p: 2, height: 'fit-content', mb: { xs: 4 } }}
          >
            <CartItemList />
            <List>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}
              >
                <Typography variant="h6">Summa</Typography>
                <Typography variant="h6">{calcProductTotal()} SEK</Typography>
              </ListItem>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}
              >
                <Typography variant="subtitle1">Fraktkostnad</Typography>
                <Typography variant="subtitle1">{shippingPrice} SEK</Typography>
              </ListItem>
              <ListItem
                sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}
              >
                <Typography variant="h6">Totalsumma</Typography>
                <Typography variant="h6">
                  {calcOrderTotal(calcProductTotal, shippingPrice)} SEK
                </Typography>
              </ListItem>
            </List>
          </Paper>
        </CheckoutContainer>
      )}
      {order && (
        <ConfirmationModal
          confirmationModal={confirmationModal}
          handleConfirmationCloseModal={handleConfirmationCloseModal}
          order={order._id}
        />
      )}
    </>
  );
};

export default Checkout;
