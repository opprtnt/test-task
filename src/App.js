import { IconButton, Modal } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import ListClient from "./components/ListClient";
import NewClient from "./components/NewClient";
import SearchForm from "./components/SearchForm";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fullAddress = useSelector((state) => state.store.addressName);
  const addressID = useSelector((state) => state.store.addressID);
  return (
    <div className="App">
      <div className="container">
        <SearchForm />
        <div className="row">
          {fullAddress.flat && (
            <p>{`${fullAddress.street}, ${fullAddress.house}, ${fullAddress.flat}`}</p>
          )}
          <IconButton
            sx={{ width: "40px", height: "40px" }}
            disabled={!addressID}
            onClick={handleOpen}
          >
            <PersonAddIcon />
          </IconButton>
        </div>
        <ListClient />
        <Modal open={open} onClose={handleClose}>
          <>
            <NewClient close={handleClose} />
          </>
        </Modal>
      </div>
    </div>
  );
}

export default App;
