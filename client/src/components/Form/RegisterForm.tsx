import { useForm } from 'react-hook-form';
import { IRegisterForm } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { joiResolver } from '@hookform/resolvers/joi';
import { registerSchema } from './formValidate';
import { useUserContext } from '../../context/UserContext';

type Props = {
  toggleForm: () => void;
};

const defaultValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegisterForm = ({ toggleForm }: Props) => {
  const { handleSubmit, control } = useForm<IRegisterForm>({
    defaultValues: defaultValue,
    resolver: joiResolver(registerSchema),
  });

  const { register, user, errorMessage, isLoading } = useUserContext();

  const onSubmit = async (data: IRegisterForm) => {
    register(data);
    toggleForm();
    // const res = await fetch('api/users/register', {
    //   method: 'POST',
    //   headers: { 'content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const data1 = await res.json();
    // console.log('Submit register data', data1);
  };

  return (
    <>
      <form
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
          gap: 15,
        }}
      >
        <HowToRegIcon color="accent" fontSize="large" />

        <Typography variant="h4">Registrera konto</Typography>
        <FormInputField
          name="firstName"
          control={control}
          label="Förnamn"
          type="text"
        />

        <FormInputField
          name="lastName"
          control={control}
          label="Efternamn"
          type="text"
        />

        <FormInputField
          name="email"
          control={control}
          label="E-postadress"
          type="email"
        />
        <FormInputField
          name="password"
          control={control}
          label="Lösenord"
          type="password"
        />
        {errorMessage && <Typography>{errorMessage}</Typography>}

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          color="accent"
        >
          Registrera konto
        </Button>
        <Link
          color="inherit"
          underline="hover"
          style={{ cursor: 'pointer' }}
          onClick={() => toggleForm()}
        >
          Har du redan ett konto, logga in
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
