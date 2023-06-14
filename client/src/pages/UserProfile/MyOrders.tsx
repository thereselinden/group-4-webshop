import { SyntheticEvent, useState } from 'react';

import Typography from '@mui/material/Typography';

import OrderAccordion from '../../components/OrderAccordion/OrderAccordion';
import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import { IConfirmedOrder } from '../../interfaces/interfaces';

const MyOrders = () => {
  const { user } = useUserContext();
  const [expanded, setExpanded] = useState<string | false>(false);
  let [[orders]] = useFetch<IConfirmedOrder[]>('/api/orders');

  if (orders && user?.isAdmin) {
    orders = orders?.filter(order => order.customer._id === user?._id);
  }

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Mina köp
      </Typography>
      {orders &&
        orders.map(order => (
          <OrderAccordion
            key={order._id}
            order={order}
            handleChange={handleChange}
            expanded={expanded}
          />
        ))}
    </>
  );
};

export default MyOrders;
