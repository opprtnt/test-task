import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStreets = createAsyncThunk(
  "store/getStreets",
  async (_, { dispatch }) => {
    let fetchStreet = await fetch(
      "https://dispex.org/api/vtest/Request/streets?cityId=1"
    );
    let json = await fetchStreet.json();
    dispatch(setListStreet(json));
  }
);
export const getHouses = createAsyncThunk(
  "store/getHouses",
  async (house, { dispatch }) => {
    if (!house) {
      dispatch(setListFlats([]));
      dispatch(setListHouses([]));
      return;
    }
    let fetchHouses = await fetch(
      `https://dispex.org/api/vtest/Request/houses/${house.id}`
    );
    let json = await fetchHouses.json();
    dispatch(setListHouses(json));
    dispatch(setAddressName(["street", `${house.prefix.name}. ${house.name}`]));
  }
);
export const getFlats = createAsyncThunk(
  "store/getFlats",
  async (flat, { dispatch }) => {
    if (!flat) {
      dispatch(setListFlats([]));
      return;
    }
    let fetchFlats = await fetch(
      `https://dispex.org/api/vtest/Request/house_flats/${flat.id}`
    );
    let json = await fetchFlats.json();
    dispatch(setListFlats(json));
    dispatch(setAddressName(["house", `${flat.name}`]));
  }
);
export const getClients = createAsyncThunk(
  "store/getClients",
  async (client, { dispatch }) => {
    let fetchClients = await fetch(
      `https://dispex.org/api/vtest/HousingStock/clients?addressId=${client.id}`
    );
    let json = await fetchClients.json();
    dispatch(setListClients(json));
  }
);

export const postClient = createAsyncThunk(
  "store/postClient",
  async (client, { dispatch, rejectWithValue, getState }) => {
    try {
      let fetchClients = await fetch(
        "https://dispex.org/api/vtest/HousingStock/client",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(client),
        }
      );
      if (!fetchClients.ok) {
        throw new Error("Error");
      }
      let json = await fetchClients.json();
      if ("Id" in client) {
        dispatch(
          editClient({
            name: client.Name,
            phone: client.Phone,
            email: client.Email,
            id: client.Id,
          })
        );
      } else {
        dispatch(
          addClient({
            name: client.Name,
            phone: client.Phone,
            email: client.Email,
            id: json.id,
          })
        );
        bindClient(getState().store.addressID, json.id);
      }
    } catch (err) {
      return rejectWithValue;
    }
  }
);
export const deleteBind = createAsyncThunk(
  "store/deleteBind",
  async (id, { dispatch }) => {
    await fetch(`https://dispex.org/api/vtest/HousingStock/bind_client/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(deleteClient(id));
  }
);
const bindClient = async (address, client) => {
  await fetch("https://dispex.org/api/vtest/HousingStock/bind_client", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      AddressId: address,
      ClientId: client,
    }),
  });
};

const appSlice = createSlice({
  name: "store",
  initialState: {
    listStreet: [],
    listHouses: [],
    listFlats: [],
    listClients: [],
    addressID: null,
    addressName: {
      street: "",
      house: "",
      flat: "",
    },
  },
  reducers: {
    setListStreet(state, action) {
      state.listStreet = action.payload;
    },
    setListHouses(state, action) {
      state.listHouses = action.payload;
    },
    setListFlats(state, action) {
      state.listFlats = action.payload;
    },
    setListClients(state, action) {
      state.listClients = action.payload;
    },
    addClient(state, action) {
      state.listClients.push(action.payload);
    },
    setAddress(state, action) {
      state.addressID = action.payload;
    },
    editClient(state, action) {
      const idx = state.listClients.findIndex(
        (client) => client.id === action.payload.id
      );
      state.listClients[idx] = action.payload;
    },
    deleteClient(state, action) {
      const idx = state.listClients.findIndex(
        (client) => client.bindId === action.payload
      );
      state.listClients.splice(idx, 1);
    },
    setAddressName(state, action) {
      let nameProp = action.payload[0];
      state.addressName[nameProp] = action.payload[1];
    },
  },
  extraReducers: {
    [getClients.rejected]: (state) => {
      state.listClients = [];
    },
  },
});

export const {
  setListStreet,
  setListHouses,
  setListFlats,
  setListClients,
  addClient,
  setAddress,
  editClient,
  deleteClient,
  setAddressName,
} = appSlice.actions;
export default appSlice.reducer;
