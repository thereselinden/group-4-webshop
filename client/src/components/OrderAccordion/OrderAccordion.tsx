import React from "react";
import { IConfirmedOrder } from "../../interfaces/interfaces";

import {
  calcOrderItemTotal,
  calcOrderProductTotal,
  calcOrderTotalProducts,
  formatOrderDate,
  formatOrderDay,
} from "../../utils/helper";

import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Chip, Stack } from "@mui/material";

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
  isAdmin?: boolean;
};

const OrderAccordion = ({
  order,
  singleOrder,
  loadingOrder,
  handleChange,
  expanded,
  isAdmin = false,
}: Props) => {
  console.log(isAdmin);

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
        <Box sx={{ width: "25%" }}>
          <Typography>{formatOrderDay(order.createdAt)}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {calcOrderTotalProducts(order.orderItems)}{" "}
            {calcOrderTotalProducts(order.orderItems) > 1
              ? "produkter"
              : "produkt"}
          </Typography>
        </Box>

        <Typography
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-end",
            pr: 2,
            color: "text.secondary",
            gap: 1,
          }}
        >
          {/* TODO! DETTA TAR EJ HÄNSYN TILL FRAKTKOSTNADEN */}
          {calcOrderProductTotal(order.orderItems)} SEK
          {/* {order.orderItems.map(item =>
          calcOrderItemTotal(item.quantity, item.price)
        )} SEK*/}
          {order.shipped ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CheckCircleOutlineIcon color="disabled" />
          )}
        </Typography>
      </AccordionSummary>
      {loadingOrder
        ? "Laddar single order...."
        : singleOrder && (
            <AccordionDetails
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                {singleOrder.orderItems.map((item) => (
                  <Typography key={item.product._id}>
                    {item.product.title}
                  </Typography>
                ))}
              </Box>
              <Box>
                {isAdmin && (
                  <>
                    <Stack direction="row" spacing={1}>
                      {!order.shipped ? (
                        <Chip
                          label="Markera som skickad"
                          color="success"
                          /* onClick={handleClick}*/
                        />
                      ) : (
                        <Chip
                          label="Ångra skickad"
                          color="warning"
                          /* onClick={handleClick}*/
                        />
                      )}
                    </Stack>
                  </>
                )}
              </Box>
            </AccordionDetails>
          )}
    </Accordion>
  );
};

export default OrderAccordion;
