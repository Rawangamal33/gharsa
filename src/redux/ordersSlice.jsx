import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";

const initialState = {
  orders: [],
  order:[],
  orderStatus: null,
  ordersStatus: null,
  ordersFilter: {
    PageIndex: 1,
    PageSize: 10,
    OrderId: null,
  },
  totalPages: 0,
  // Add other state properties here
};

export const fetchOrders = createAsyncThunk(
  "order/fetch",
  async (ordersFilter, { rejectWithValue }) => {
    const filter = { ...ordersFilter };
    try {
      const response = await instance.get("Order", { params: filter });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`Order/${orderId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrdersFilter: (state, action) => {
      state.ordersFilter = {
        ...state.ordersFilter,
        ...action.payload,
      };
    },
    // Add other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.ordersStatus = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersStatus = "succeeded";
        const { items = [], count = 0, pageSize = 0 } = action.payload;
        state.orders = items;
        state.totalPages = Math.ceil(count / pageSize);
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.ordersStatus = "failed";
      })
    .addCase(fetchOrderById.pending, (state) => {
        state.orderStatus = "loading";
    })
    .addCase(fetchOrderById.fulfilled, (state, action) => {
         state.order= action.payload;
        
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.orderStatus = "failed";
      });
    // Add reducers for other action types here
  },
});

export const { setOrdersFilter } = orderSlice.actions;

export default orderSlice.reducer;
