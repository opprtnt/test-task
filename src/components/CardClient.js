import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createRef, useState } from "react";
import EditForm from "./EditForm";
import { useDispatch } from "react-redux";
import { deleteBind } from "../redux/storeSlice";

const CardClient = ({ client }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = createRef();
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        width: "25%",
        mr: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
          <Avatar sx={{ mr: 2 }}>
            <PermIdentityIcon />
          </Avatar>
          <Box>
            <Typography>{client.name}</Typography>
            <Typography>{client.phone}</Typography>
            <Typography>{client.email}</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "space-between", backgroundColor: "lightgray" }}
      >
        <IconButton onClick={() => dispatch(deleteBind(client.bindId))}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </CardActions>
      <Modal ref={ref} open={open} onClose={handleClose}>
        <>
          <EditForm ref={ref} close={handleClose} client={client} />
        </>
      </Modal>
    </Card>
  );
};

export default CardClient;
