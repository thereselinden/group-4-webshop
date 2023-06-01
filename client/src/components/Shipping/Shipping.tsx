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
type Props = {};

const Shipping = (props: Props) => {
  const {
    data: shippingmethods,
    isLoading,
    errorMessage,
  } = useFetch<IShipping[]>('/api/shippingmethod');
  console.log(shippingmethods);
  return (
    <>
      <Paper variant="outlined">
        <Typography variant="h3">Leveransmetod</Typography>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {shippingmethods?.map(method => (
              <>
                <FormControlLabel
                  value={method.company}
                  control={<Radio />}
                  label={method.company}
                />
                <Typography>{method.price} kr</Typography>
              </>
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
    </>
  );
};

export default Shipping;
