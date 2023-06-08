import { SyntheticEvent, useState } from 'react';

import Typography from '@mui/material/Typography';
import OrderAccordion from '../../components/OrderAccordion/OrderAccordion';

import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import fetchData from '../../utils/FetchData';
import { IConfirmedOrder } from '../../interfaces/interfaces';

const MyOrders = () => {
  const { user } = useUserContext();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [singleOrder, setSingleOrder] = useState<IConfirmedOrder | null>(null);
  const [loadingOrder, setLoadingOrder] = useState<boolean>(false);
  let [[orders], [loadingOrders]] = useFetch<IConfirmedOrder[]>('/api/orders');

  if (orders && user?.isAdmin) {
    orders = orders?.filter(order => order.customer._id === user?._id);
  }

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
            singleOrder={singleOrder}
            loadingOrder={loadingOrder}
            handleChange={handleChange}
            expanded={expanded}
          />
        ))}
    </>
  );
};

export default MyOrders;
