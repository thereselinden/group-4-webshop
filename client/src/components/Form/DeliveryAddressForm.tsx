import { useForm } from 'react-hook-form';
import FormInputField from './FormInputField/FormInputField';
import { useUserContext } from '../../context/UserContext';
import { joiResolver } from '@hookform/resolvers/joi';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { deliveryAddressSchema } from './formValidate';
import { IDeliveryAddress } from '../../interfaces/interfaces';

type Props = {
  handleOrderSubmit: (data: IDeliveryAddress) => void;
};

const DeliveryAddressForm = ({ handleOrderSubmit }: Props) => {
  const { errorMessage, isLoading, user } = useUserContext();

  const defaultValue = {
    street: '',
    zipcode: '',
    city: '',
    country: '',
  };

  const { handleSubmit, control } = useForm<IDeliveryAddress>({
    defaultValues: defaultValue,
    resolver: joiResolver(deliveryAddressSchema),
  });

  const onSubmit = async (data: IDeliveryAddress) => {
    console.log(data);
    handleOrderSubmit(data);
    // göra fetch ('/api/order/)
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Leveransuppgifter
      </Typography>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
          gap: 15,
        }}
      >
        <FormInputField
          name="street"
          control={control}
          label="Gatuadress"
          type="text"
        />
        <FormInputField
          name="zipcode"
          control={control}
          label="Postnummer"
          type="text"
        />
        <FormInputField
          name="city"
          control={control}
          label="Stad"
          type="text"
        />
        <FormInputField
          name="country"
          control={control}
          label="Land"
          type="text"
        />
        {errorMessage && <Typography>{errorMessage}</Typography>}

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          color="accent"
        >
          Lägg order
        </Button>
      </form>
    </>
  );
};

export default DeliveryAddressForm;
