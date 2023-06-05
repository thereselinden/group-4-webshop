import CartItemList from "../../components/CartItemList/CartItemList";
import Shipping from "../../components/Shipping/Shipping";
import useFetch from "../../hooks/useFetch";
import { IShipping } from "../../interfaces/interfaces";
import { useCartContext } from "../../context/CartContext";
import { calcOrderTotal } from "../../utils/helper";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Link from "@mui/material/Link";

import CustomerForm from "../../components/Form/CustomerForm";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";

type Props = {};

const CheckoutContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "3fr auto",
});

const Checkout = (props: Props) => {
  const [
    [shippingMethods, setShippingMethods],
    [isLoading, setIsLoading],
    [errorMessage, setErrorMessage],
  ] = useFetch<IShipping[]>("/api/shippingmethod");

  shippingMethods?.sort((a, b) => {
    return a.price > b.price ? 1 : -1;
  });

  const [selectedShipping, setSelectedShipping] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);

  const { calcProductTotal, numOfProducts } = useCartContext();
  const { user, setUserModal } = useUserContext();

  useEffect(() => {
    if (shippingMethods) {
      setSelectedShipping(shippingMethods[0].company);
      setShippingPrice(shippingMethods[0].price);
    }
  }, [shippingMethods]);

  useEffect(() => {
    const selectedMethod = shippingMethods?.find(
      (method) => method.company === selectedShipping
    );
    if (selectedMethod) setShippingPrice(selectedMethod.price);
  }, [selectedShipping]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShipping((event.target as HTMLInputElement).value);
  };

  return (
    <>
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
            <Paper variant="outlined">
              <Typography variant="h4" component="h2">
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
                <CustomerForm />
              )}
            </Paper>
          </Box>
          <Box>
            <CartItemList />
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between", py: 0 }}
              >
                <Typography variant="h6">Summa</Typography>
                <Typography variant="h6">{calcProductTotal()} SEK</Typography>
              </ListItem>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between", py: 0 }}
              >
                <Typography variant="subtitle1">Fraktkostnad</Typography>
                <Typography variant="subtitle1">{shippingPrice} SEK</Typography>
              </ListItem>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between", py: 0 }}
              >
                <Typography variant="h6">Totalsumma</Typography>
                <Typography variant="h6">
                  {calcOrderTotal(calcProductTotal, shippingPrice)} SEK
                </Typography>
              </ListItem>
            </List>
          </Box>
        </CheckoutContainer>
      )}
    </>
  );
};

export default Checkout;
