import { useState, useEffect, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useProductContext } from '../../context/ProductContext';
import { IProduct } from '../../interfaces/interfaces';

const Search = () => {
  const { products } = useProductContext();
  const [value, setValue] = useState<IProduct | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (value?._id) {
      navigate(`/${value?._id}`);
      setValue(null);
    }
  }, [value]);

  let filteredProducts: IProduct[] = [];
  if (inputValue)
    filteredProducts =
      products?.filter(product =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      ) || [];

  return (
    <Stack spacing={2}>
      {filteredProducts && (
        <Autocomplete
          value={value}
          onChange={(event: SyntheticEvent, newValue: IProduct | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={filteredProducts.map(product => product)}
          getOptionLabel={option => (option ? option.title : '')}
          noOptionsText="Ingen produkt matchar din sökning"
          size="small"
          sx={{ width: 150 }}
          color="accent"
          renderInput={params => <TextField {...params} label="Sök produkt" />}
        />
      )}
    </Stack>
  );
};

export default Search;
