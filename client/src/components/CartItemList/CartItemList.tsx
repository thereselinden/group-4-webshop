import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { List } from "@mui/material";

import { useCartContext } from "../../context/CartContext";

type Props = {};

const CartItemList = (props: Props) => {
  const { cartItems, calcProductTotal, addToCart, removeFromCart } =
    useCartContext();
  return (
    <Box>
      {cartItems.map((item) => (
        <ListItem
          sx={{
            display: "grid",
            justifyContent: "space-between",
            gridTemplateColumns: "1fr 2fr auto",
            gap: 1,
          }}
          key={item.product._id}
        >
          <Box
            component="img"
            src={item.product.image}
            alt={item.product.title}
            sx={{ width: 75 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              component="p"
              style={{ marginLeft: 8, fontWeight: 700 }}
            >
              {item.product.title}
            </Typography>
            <Typography style={{ marginLeft: 8 }}>
              {item.product.price} kr
            </Typography>
            <Typography>
              <IconButton onClick={() => removeFromCart(item.product._id)}>
                <RemoveIcon sx={{ fontSize: 15 }} />
              </IconButton>

              {item.quantity}
              <IconButton onClick={() => addToCart(item.product, 1)}>
                <AddIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => removeFromCart(item.product._id, item.quantity)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </ListItem>
      ))}
    </Box>
  );
};
export default CartItemList;
