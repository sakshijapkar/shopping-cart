import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductList from "./components/ProductList";
import Basket from "./components/Basket";

import { loadCartFromFirebase } from "./utils/firebaseCart";
import { setCart } from "./features/basket/basketSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      const data = await loadCartFromFirebase();
      dispatch(setCart(data));
    };

    loadCart();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-orange-200 p-6">

      {/* SIMPLE HEADER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold">🛒 Shopping Cart</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ProductList />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <Basket />
        </div>

      </div>
    </div>
  );
}