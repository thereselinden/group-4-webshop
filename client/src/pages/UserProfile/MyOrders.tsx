import { SyntheticEvent, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import fetchData from '../../utils/FetchData';

import { IConfirmedOrder } from '../../interfaces/interfaces';
import {
  calcOrderItemTotal,
  calcOrderProductTotal,
  calcOrderTotalProducts,
  formatOrderDate,
  formatOrderDay,
} from '../../utils/helper';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {};

const MyOrders = (props: Props) => {
  const { user } = useUserContext();

  console.log('user', user);

  let [[orders, setOrders], [loadingOrders, setLoadingOrders]] =
    useFetch<IConfirmedOrder[]>('/api/orders');

  if (orders && user?.isAdmin) {
    orders = orders?.filter(order => order.customer._id === user?._id);
    console.log('inne i admin filter if');
  }

  console.log('all orders', orders);

  const [expanded, setExpanded] = useState<string | false>(false);
  const [singleOrder, setSingleOrder] = useState<IConfirmedOrder | null>(null);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);

  const handleChange =
    (panel: string, orderId: string) =>
    (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      handleSingleOrder(orderId);
    };

  const handleSingleOrder = async (id: string) => {
    setLoadingOrder(true);
    try {
      const order = await fetchData<IConfirmedOrder>(`/api/orders/${id}`);
      setSingleOrder(order);
      setLoadingOrder(false);
    } catch (err) {
      console.log(err);
      setLoadingOrder(false);
    }
  };

  // if (orders) {
  //   const myOrders = orders.filter(
  //     (order: IConfirmedOrder) => order._id === user?.id
  //   );
  //   return myOrders;
  // }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Mina köp
      </Typography>
      {orders &&
        orders.map((order, index) => (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`, order._id)}
            sx={{ mb: 3 }}
            key={order._id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box sx={{ width: '25%' }}>
                <Typography>{formatOrderDay(order.createdAt)}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {calcOrderTotalProducts(order.orderItems)}{' '}
                  {calcOrderTotalProducts(order.orderItems) > 1
                    ? 'produkter'
                    : 'produkt'}
                </Typography>
              </Box>

              <Typography
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  pr: 2,
                  color: 'text.secondary',
                }}
              >
                {/* TODO! DETTA TAR EJ HÄNSYN TILL FRAKTKOSTNADEN */}
                {calcOrderProductTotal(order.orderItems)} SEK
                {/* {order.orderItems.map(item =>
                  calcOrderItemTotal(item.quantity, item.price)
                )} SEK*/}
              </Typography>
            </AccordionSummary>
            {loadingOrder
              ? 'Laddar single order....'
              : singleOrder && (
                  <AccordionDetails>
                    {singleOrder.orderItems.map(item => (
                      <Typography key={item.product._id}>
                        {item.product.title}
                      </Typography>
                    ))}
                  </AccordionDetails>
                )}
          </Accordion>
        ))}
    </>
  );
};

export default MyOrders;
