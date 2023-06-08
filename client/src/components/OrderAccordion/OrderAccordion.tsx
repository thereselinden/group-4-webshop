import React from 'react';
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

type Props = {
  order: IConfirmedOrder;
  singleOrder: IConfirmedOrder | null;
  loadingOrder: boolean;
  handleChange: (
    arg0: string,
    arg1: string
  ) =>
    | ((event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void)
    | undefined;
  expanded: string | false;
};

const OrderAccordion = ({
  order,
  singleOrder,
  loadingOrder,
  handleChange,
  expanded,
}: Props) => {
  return (
    <Accordion
      expanded={expanded === `panel${order._id}`}
      onChange={handleChange(`panel${order._id}`, order._id)}
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
  );
};

export default OrderAccordion;
