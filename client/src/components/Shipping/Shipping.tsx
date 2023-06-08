import { styled } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { IShipping } from '../../interfaces/interfaces';
import { deliveryDate } from '../../utils/helper';
import { ChangeEvent } from 'react';

type Props = {
  shippingMethods: IShipping[];
  selectedShipping: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckoutOption = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid black',
});

const Shipping = ({
  shippingMethods,
  selectedShipping,
  handleChange,
}: Props) => {
  return (
    <Paper variant="outlined" sx={{ mb: 4, p: 2 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
        Leveransmetod
      </Typography>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="demo-radio-buttons-group-label" color="textColor">
          Leveransval
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedShipping}
          onChange={e => handleChange(e)}
        >
          {shippingMethods?.map(method => (
            <CheckoutOption key={method.company}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  value={method.company}
                  control={<Radio color="accent" />}
                  label={method.company}
                />
                <Typography variant="caption">
                  Levereras: {deliveryDate(method.deliveryTimeInHours)}
                </Typography>
              </Box>
              <Typography>{method.price} SEK</Typography>
            </CheckoutOption>
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default Shipping;
