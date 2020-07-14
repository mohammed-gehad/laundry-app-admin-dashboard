import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import api from "../../api/server";
import { logout } from "../auth/authSlice";
import { socket } from "../../api/server";

const orderAdapter = createEntityAdapter({
  selectId: (order) => order._id,
});

export const sendMessageToCustomer = createAsyncThunk(
  "orders/sendMessageToCustomer",
  async ({ id, message }) => {
    socket.emit("messageToCustomer", {
      id,
      message,
    });

    return { id, message };
  }
);

export const asyncOrders = createAsyncThunk("orders/asyncOrders", async () => {
  const result = await api.get("/admin/orders");
  return result.data.orders;
});

export const canceledOrder = createAsyncThunk("orders/canceled", async (id) => {
  await api.delete(`/admin/orders/canceled/${id}`);
  return id;
});
export const deliveredOrder = createAsyncThunk(
  "orders/delivered",
  async (id) => {
    await api.delete(`/admin/orders/delivered/${id}`);
    return id;
  }
);
export const orderInProgress = createAsyncThunk(
  "orders/orderInProgress",
  async (id) => {
    await api.put(`/admin/orders/orderInProgress/${id}`);
    return id;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: orderAdapter.getInitialState({
    loading: false,
  }),
  reducers: {
    receiveMessage: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          chat: [payload.message, ...state.entities[payload.id].chat],
        },
      });
    },
  },
  extraReducers: {
    [logout]: (state) => {},
    [asyncOrders.fulfilled]: (state, { payload }) => {
      orderAdapter.setAll(state, payload);
    },
    [asyncOrders.pending]: (state, { payload }) => {},
    [asyncOrders.rejected]: (state, { payload }) => {
      console.log("rejected");
    },
    [canceledOrder.fulfilled]: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload,
        changes: { status: "canceled" },
      });
    },
    [deliveredOrder.fulfilled]: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload,
        changes: { status: "delivered" },
      });
    },
    [orderInProgress.fulfilled]: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload,
        changes: { status: "in progress" },
      });
    },
    [sendMessageToCustomer.fulfilled]: (state, { payload }) => {
      orderAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          chat: [payload.message, ...state.entities[payload.id].chat],
        },
      });
    },
  },
});

export const { receiveMessage } = ordersSlice.actions;
export const ordersSelector = orderAdapter.getSelectors(
  (state) => state.orders
);

export default ordersSlice.reducer;
