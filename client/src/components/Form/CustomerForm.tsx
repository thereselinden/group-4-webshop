import { useForm } from "react-hook-form";
import FormInputField from "./FormInputField/FormInputField";
import { useUserContext } from "../../context/UserContext";
import { joiResolver } from "@hookform/resolvers/joi";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import { customerSchema } from "./formValidate";

type Props = {};

const CustomerForm = (props: Props) => {
  const { errorMessage, isLoading, user } = useUserContext();

  const defaultValue = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: "",
    zip: "",
    city: "",
    country: "",
  };

  const { handleSubmit, control } = useForm({
    defaultValues: defaultValue,
    resolver: joiResolver(customerSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    // göra fetch ('/api/order/)
  };

  return (
    <>
      <form
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
          gap: 15,
        }}
      >
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
          name="address"
          control={control}
          label="Gatuadress"
          type="text"
        />
        <FormInputField
          name="zip"
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

export default CustomerForm;
