import { styled } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import useFetch from '../../hooks/useFetch';
import { IShipping } from '../../interfaces/interfaces';
import { deliveryDate } from '../../utils/DeliveryDate';

type Props = {};

const CheckoutOption = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Shipping = (props: Props) => {
  const [
    [shippingmethods, setShippingmethods],
    [isLoading, setIsLoading],
    [errorMessage, setErrorMessage],
  ] = useFetch<IShipping[]>('/api/shippingmethod');

  return (
    <Paper variant="outlined" sx={{ mb: 4 }}>
      <Typography variant="h4" component="h2">
        Leveransmetod
      </Typography>
      <FormControl sx={{ width: '100%', p: 3 }}>
        <FormLabel id="demo-radio-buttons-group-label">Leveransval</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {shippingmethods?.map(method => (
            <CheckoutOption key={method.company}>
              <FormControlLabel
                value={method.company}
                control={<Radio />}
                label={method.company}
              />
              <Typography variant="subtitle1" component="p">
                Levereras: {deliveryDate(method.deliveryTimeInHours)}
              </Typography>
              <Typography>{method.price} SEK</Typography>
            </CheckoutOption>
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default Shipping;
