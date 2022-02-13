import {
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postClient } from "../redux/storeSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  width: 400,
  p: 4,
  backgroundColor: "white",
};
const NewClient = ({ close }) => {
  const dispatch = useDispatch();
  const fullAddress = useSelector((state) => state.store.addressName);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addClient = (data) => {
    dispatch(postClient(data));
  };

  return (
    <Box sx={style}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ mr: 3 }}>
          <PersonAddIcon />
        </Avatar>
        <Typography>Добавить нового жильца</Typography>
      </Box>
      <Typography sx={{ mb: 3 }}>
        {fullAddress.flat &&
          `${fullAddress.street}, ${fullAddress.house}, ${fullAddress.flat}`}
      </Typography>
      <form onSubmit={handleSubmit(addClient)}>
        <Controller
          control={control}
          rules={{ required: "Обязательное поле!", maxLength: 10 }}
          name="Phone"
          defaultValue={""}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                error={errors.Phone?.type === "required"}
                label={
                  errors.Phone?.type === "required"
                    ? errors.Phone.message
                    : "Телефон"
                }
                sx={{ width: "100%", mb: 3 }}
                type={"tel"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+7</InputAdornment>
                  ),
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          rules={{ maxLength: 50 }}
          name="Email"
          defaultValue={""}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                sx={{ width: "100%", mb: 3 }}
                label="Email"
              />
            );
          }}
        />
        <Controller
          control={control}
          rules={{ maxLength: 100 }}
          name="Name"
          defaultValue={""}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                sx={{ width: "100%", mb: 3 }}
                label="Ф. И. О"
              />
            );
          }}
        />
        <div className="row">
          <Button type="submit" sx={{ mr: 3 }} variant="contained">
            Добавить
          </Button>
          <Button onClick={close} variant="outlined">
            Отмена
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default NewClient;
