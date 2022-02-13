import {
  Avatar,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteBind, postClient } from "../redux/storeSlice";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
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
const EditForm = React.forwardRef(({ client, close }, ref) => {
  const dispatch = useDispatch();
  const fullAddress = useSelector((state) => state.store.addressName);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addClient = (data) => {
    dispatch(postClient({ ...data, Id: client.id }));
  };

  const deleteFlat = () => {
    dispatch(deleteBind(client.bindId));
    close();
  };

  return (
    <Box ref={ref} sx={style}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Avatar sx={{ mr: 3 }}>
          <EditIcon />
        </Avatar>
        <Typography>Редактировать жильца</Typography>
      </Box>
      <p>{`${fullAddress.street}, ${fullAddress.house}, ${fullAddress.flat}`}</p>
      <form onSubmit={handleSubmit(addClient)}>
        <Controller
          control={control}
          rules={{ required: "Обязательное поле!", maxLength: 10 }}
          name="Phone"
          defaultValue={client.phone}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                sx={{ width: "100%", mb: 3 }}
                type={"tel"}
                error={errors.Phone?.type === "required"}
                label={
                  errors.Phone?.type === "required"
                    ? errors.Phone.message
                    : "Телефон"
                }
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
          defaultValue={client.email}
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
          defaultValue={client.name}
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
            Отправить
          </Button>
          <Button
            onClick={deleteFlat}
            variant="contained"
            sx={{ mr: 3 }}
            color="secondary"
          >
            Отвязать
          </Button>
          <Button variant="outlined" onClick={close}>
            Отмена
          </Button>
        </div>
      </form>
    </Box>
  );
});

export default EditForm;
