import { SyntheticEvent, useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import fetchData from '../../utils/FetchData';
import { IConfirmedOrder } from '../../interfaces/interfaces';
import OrderAccordion from '../../components/OrderAccordion/OrderAccordion';
import BackDropLoader from '../../components/BackDropLoader/BackDropLoader';

type Props = {};

const AllOrders = (props: Props) => {
  const { user } = useUserContext();

  const [[orders, setOrders], [loadingOrders, setLoadingOrders]] =
    useFetch<IConfirmedOrder[]>('/api/orders');

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleOrderShipped = async (id: string) => {
    try {
      await fetchData<IConfirmedOrder>(`/api/orders/${id}`, 'PUT');

      const updatedOrders = await fetchData<IConfirmedOrder[]>(`/api/orders/`);
      setOrders(updatedOrders);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Alla ordrar
      </Typography>
      {loadingOrders && <BackDropLoader loading={loadingOrders} />}
      {orders &&
        orders.map(order => (
          <OrderAccordion
            key={order._id}
            order={order}
            handleChange={handleChange}
            handleOrderShipped={handleOrderShipped}
            expanded={expanded}
            isAdmin={user?.isAdmin}
          />
        ))}
    </>
  );
};

export default AllOrders;
