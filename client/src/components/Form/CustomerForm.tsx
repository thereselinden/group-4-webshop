import { useForm } from 'react-hook-form';

import FormInputField from './FormInputField/FormInputField';
import { useUserContext } from '../../context/UserContext';

const CustomerForm = () => {
  const { user } = useUserContext();

  const defaultValue = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  };

  const { control } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
          gap: 15,
          marginBottom: 15,
        }}
      >
        <FormInputField
          name="firstName"
          control={control}
          label="Förnamn"
          type="text"
          disabled={true}
        />

        <FormInputField
          name="lastName"
          control={control}
          label="Efternamn"
          type="text"
          disabled={true}
        />

        <FormInputField
          name="email"
          control={control}
          label="E-postadress"
          type="email"
          disabled={true}
        />
      </form>
    </>
  );
};

export default CustomerForm;
