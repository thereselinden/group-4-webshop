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
  const [[orders, setOrders]] = useFetch<IConfirmedOrder[]>('/api/orders');
  console.log('all orders', orders);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      // OM VI TAR IN ID HÄR KAN VI SKICKA VIDARE TILL FUNKTION NEDAN?
      //  handleProductFetch(id);
    };

  // OM VI FÅR TILL KANSKE EN PROMISE ALL OM DET ÄR FLER ÄN 1 VARA DVS BLIR FLER /PRODUCT/ID FETCHAR?
  const handleProductFetch = async () => {
    console.log(
      'parameter',
      id.forEach(i => console.log(i))
    );
    try {
      const product = await fetchData(`/api/product/${id}`);
      console.log('product', product);
    } catch (err) {
      console.log(err);
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
            onChange={handleChange(
              `panel${index}`
              // KAN VI SKICKA IN PRODUKT ID HÄR?
            )}
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
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                feugiat. Aliquam eget maximus est, id dignissim quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default MyOrders;
