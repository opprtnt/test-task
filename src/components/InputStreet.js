import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getStreets, getHouses } from "../redux/storeSlice";

const InputStreet = () => {
  const dispatch = useDispatch();
  const streets = useSelector((state) => state.store.listStreet);
  const [defaultProps, setDefaultProps] = useState({});
  const [open, setOpen] = useState(false);
  const loading = open && streets.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    dispatch(getStreets());
    if (active) {
      setDefaultProps({
        option: streets,
        getOptionLabel: (option) => option.name,
      });
    }
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setDefaultProps({});
    }
  }, [open]);
  return (
    <Autocomplete
      {...defaultProps}
      disablePortal
      open={open}
      loading={loading}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      //onChange={(e, id) => setID(id)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Улица" />}
    />
  );
};
export default InputStreet;
