import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import CardClient from "./CardClient";

const ListClients = () => {
  const clients = useSelector((state) => state.store.listClients);
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {clients.length > 0 &&
          clients.map((client) => (
            <CardClient key={client.id} client={client} />
          ))}
      </Box>
    </>
  );
};

export default ListClients;
