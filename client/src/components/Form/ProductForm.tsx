import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Controller } from 'react-hook-form';

import { Button, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import FormHelperText from '@mui/material/FormHelperText';

import { ICategory, IProduct } from '../../interfaces/interfaces';
import FormInputField from './FormInputField/FormInputField';
import { useUserContext } from '../../context/UserContext';
import { productSchema } from './formValidate';
import { useProductContext } from '../../context/ProductContext';

type Props = {
  productId?: string | null;
};

const ProductForm = ({ productId }: Props) => {
  const { errorMessage } = useUserContext();
  const { getProduct, categories, updateProduct, addProduct } =
    useProductContext();
  let product: IProduct | void;
  if (productId) product = getProduct(productId);

  console.log('inside product form productId', productId);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product?.categories?.map(category => category.title) || []
  );

  const [categoryError, setCategoryError] = useState<boolean>(false);

  const defaultValue = {
    description: product?.description || '',
    image: product?.image || '',
    inStock: product?.inStock || 0,
    price: product?.price || 0,
    title: product?.title || '',
  };

  const handleChange = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const { handleSubmit, control } = useForm<IProduct>({
    defaultValues: defaultValue,
    resolver: joiResolver(productSchema),
  });

  const onSubmitUpdateProduct = async (data: IProduct) => {
    console.log('Uppdatera produkt');
    if (selectedCategories.length < 1) {
      console.log('kategor saknas');
      setCategoryError(true);
      return;
    }
    const selectedCategoriesObject = categories?.filter(cat =>
      selectedCategories.includes(cat.title)
    );
    const product = {
      ...data,
      categories: selectedCategoriesObject,
      _id: productId,
      deleted: false,
    };
    updateProduct(product);
  };

  const onSubmitAddProduct = async (data: IProduct) => {
    console.log('Lägg till produkt');
    if (selectedCategories.length < 1) {
      console.log('kategor saknas');
      setCategoryError(true);
      return;
    }
    const selectedCategoriesObject = categories?.filter(cat =>
      selectedCategories.includes(cat.title)
    );
    const product = {
      ...data,
      categories: selectedCategoriesObject,
      _id: productId,
    };
    addProduct(product);
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {productId ? 'Uppdatera produkt' : 'Lägg till ny produkt'}
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
          name="title"
          control={control}
          label="Titel"
          type="text"
        />
        <FormInputField
          name="description"
          control={control}
          label="Beskrivning"
          multiline={true}
          minRows={3}
          type="textarea"
        />
        {/* <FormControl error> */}
        <InputLabel id="demo-multiple-checkbox-label" color="textColor">
          Kategorier
        </InputLabel>

        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          required
          error={categoryError ? true : false}
          value={selectedCategories}
          onChange={handleChange}
          input={
            <OutlinedInput
              label="Kategorier"
              sx={{ color: 'black' }}
              color="secondary"
            />
          }
          renderValue={selected => selected.join(', ')}
          sx={{ width: '100%' }}
          //MenuProps={MenuProps}
        >
          {categories?.map(category => (
            <MenuItem key={category._id} value={category.title}>
              <Checkbox
                checked={
                  selectedCategories.findIndex(cat => cat === category.title) >
                  -1
                }
                color="accent"
              />
              <ListItemText primary={category.title} />
            </MenuItem>
          ))}
        </Select>
        {categoryError && (
          <FormHelperText sx={{ color: 'rgba(224,17,17,0.8)' }}>
            Du måste välja minst 1 kategori
          </FormHelperText>
        )}

        {/* </FormControl> */}
        <FormInputField
          name="image"
          control={control}
          label="Bild"
          type="text"
        />
        <FormInputField
          name="price"
          control={control}
          label="Pris"
          type="number"
        />
        <FormInputField
          name="inStock"
          control={control}
          label="Antal i lager"
          type="number"
        />
        {errorMessage && <Typography>{errorMessage}</Typography>}

        <Button
          variant="contained"
          onClick={
            productId
              ? handleSubmit(onSubmitUpdateProduct)
              : handleSubmit(onSubmitAddProduct)
          }
          color="accent"
        >
          {productId ? 'Spara produkt' : 'Lägg till produkt'}
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
