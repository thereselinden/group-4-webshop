import { SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chip, Stack } from '@mui/material';

import { IConfirmedOrder } from '../../interfaces/interfaces';
import {
  calcOrderProductTotal,
  calcOrderTotalProducts,
  formatOrderDay,
} from '../../utils/helper';

type Props = {
  order: IConfirmedOrder;
  handleChange: (
    arg0: string
  ) =>
    | ((event: SyntheticEvent<Element, Event>, expanded: boolean) => void)
    | undefined;
  handleOrderShipped?: (arg0: string) => void;
  expanded: string | false;
  isAdmin?: boolean;
};

const OrderAccordion = ({
  order,
  handleChange,
  handleOrderShipped,
  expanded,
  isAdmin = false,
}: Props) => {
  return (
    <Accordion
      expanded={expanded === `panel${order._id}`}
      onChange={handleChange(`panel${order._id}`)}
      sx={{ mb: 3 }}
      key={order._id}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box sx={{ width: '25%' }}>
          <Typography>#{order.orderNumber}</Typography>
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
            gap: 1,
          }}
        >
          {calcOrderProductTotal(order.orderItems) + order.shippingMethod.price}{' '}
          SEK
          {order?.shipped ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CheckCircleOutlineIcon color="disabled" />
          )}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '90%' }}>
          {order.orderItems.map(item => (
            <Box
              key={item.product._id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography key={item.product._id}>
                {item.quantity} x {item.product.title}
              </Typography>
              <Typography>{item.price} SEK </Typography>
            </Box>
          ))}
          <Typography variant="subtitle2">
            Fraktmetod {order.shippingMethod.company} (
            {order.shippingMethod.price} SEK)
          </Typography>

          {/* </Box> */}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {isAdmin && handleOrderShipped && (
            <>
              <Stack direction="row" spacing={1}>
                {!order?.shipped ? (
                  <Chip
                    label="Markera som skickad"
                    color="secondary"
                    onClick={() => handleOrderShipped(order._id)}
                  />
                ) : (
                  <Chip label="Order skickad" color="success" />
                )}
              </Stack>
            </>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderAccordion;
