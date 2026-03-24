import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveCartToFirebase } from "../../utils/firebaseCart"; // ✅ ADD THIS

type BasketState = {
  items: Record<string, number>;
};

const initialState: BasketState = {
  items: {},
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;

      // SAVE TO FIREBASE
      saveCartToFirebase(state.items);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      if (state.items[id] > 1) state.items[id]--;
      else delete state.items[id];

      //  SAVE TO FIREBASE
      saveCartToFirebase(state.items);
    },

     setCart: (state, action: PayloadAction<Record<string, number>>) => {
      state.items = action.payload;
    },

  },
});

export const { addItem, removeItem, setCart } = basketSlice.actions;
export default basketSlice.reducer;