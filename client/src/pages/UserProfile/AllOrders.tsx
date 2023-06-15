import { SyntheticEvent, useState } from 'react';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useUserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import fetchData from '../../utils/FetchData';
import { IConfirmedOrder } from '../../interfaces/interfaces';
import OrderAccordion from '../../components/OrderAccordion/OrderAccordion';
import BackDropLoader from '../../components/BackDropLoader/BackDropLoader';

const AllOrders = () => {
  const { user } = useUserContext();

  const [[orders, setOrders], [loadingOrders]] =
    useFetch<IConfirmedOrder[]>('/api/orders');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filterOrderStatus, setFilterOrderStatus] =
    useState<string>('Alla ordrar');

  const sortedOrders = orders?.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  const filterOrders = () => {
    switch (filterOrderStatus) {
      case 'Skickade':
        return sortedOrders?.filter(order => order.shipped) || [];
      case 'Ej skickade':
        return sortedOrders?.filter(order => !order.shipped) || [];
      default:
        return sortedOrders || [];
    }
  };

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleOrderShipped = async (id: string) => {
    try {
      await fetchData<IConfirmedOrder>(`/api/orders/${id}`, 'PUT');
      const updatedOrders = await fetchData<IConfirmedOrder[]>(`/api/orders/`);
      setOrders(updatedOrders);
      setExpanded(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterOrderStatus(event.target.value);
  };

  const filteredOrders: IConfirmedOrder[] = filterOrders();

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Alla ordrar
      </Typography>
      {loadingOrders && <BackDropLoader loading={loadingOrders} />}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label" color="textColor">
          Orderstatus
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={filterOrderStatus}
          label="Orderstatus"
          onChange={handleFilterChange}
          color="textColor"
        >
          <MenuItem value="Alla ordrar">Alla ordrar</MenuItem>
          <MenuItem value="Skickade">Skickade</MenuItem>
          <MenuItem value="Ej skickade">Ej skickade</MenuItem>
        </Select>
      </FormControl>
      {filteredOrders &&
        filteredOrders.map(order => (
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
