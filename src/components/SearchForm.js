import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getStreets,
  getHouses,
  getFlats,
  getClients,
  setAddress,
  setAddressName,
} from "../redux/storeSlice";

const SearchForm = () => {
  const dispatch = useDispatch();
  const streets = useSelector((state) => state.store.listStreet);
  const houses = useSelector((state) => state.store.listHouses);
  const flats = useSelector((state) => state.store.listFlats);
  const [inputValue, setInputValue] = useState([]);
  const [inputValueFlat, setInputValueFlat] = useState([]);

  useEffect(() => {
    if (streets.length === 0) {
      dispatch(getStreets());
    }
  }, [streets, dispatch]);

  return (
    <form action="">
      <div className="row">
        <Autocomplete
          disablePortal
          options={streets}
          getOptionLabel={(streets) => streets.name}
          onChange={(event, newValue) => {
            dispatch(getHouses(newValue));
            dispatch(setAddress(null));
            setInputValue([]);
            setInputValueFlat([]);
            dispatch(setAddressName(["flat", ""]));
            dispatch(setAddressName(["house", ""]));
          }}
          sx={{ width: 300, mr: 1 }}
          renderInput={(params) => <TextField {...params} label="Улица" />}
        />
        <Autocomplete
          disablePortal
          options={houses}
          value={inputValue}
          getOptionLabel={(houses) => houses.name || ""}
          onChange={(event, newValue) => {
            setInputValue(newValue);
            dispatch(getFlats(newValue));
            dispatch(setAddress(null));
            dispatch(setAddressName(["flat", ""]));
            setInputValueFlat([]);
          }}
          sx={{ width: 200, mr: 1 }}
          renderInput={(params) => <TextField {...params} label="Дом" />}
        />
        <Autocomplete
          disablePortal
          options={flats}
          value={inputValueFlat}
          getOptionLabel={(flats) => flats.name || ""}
          sx={{ width: 200 }}
          onChange={(event, newValue) => {
            setInputValueFlat(newValue);
            if (newValue === null) {
              dispatch(setAddressName(["flat", ""]));
              return;
            }
            dispatch(getClients(newValue));
            dispatch(setAddressName(["flat", newValue.flat]));
            dispatch(setAddress(newValue.id));
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Кв/офис" />}
        />
      </div>
    </form>
  );
};

export default SearchForm;
