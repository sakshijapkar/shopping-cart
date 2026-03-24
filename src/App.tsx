import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ProductList from "./components/ProductList";
import Basket from "./components/Basket";

import { loadCartFromFirebase } from "./utils/firebaseCart";
import { setCart } from "./features/basket/basketSlice";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./components/Login";

export default function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);

  // 🔥 AUTH + LOAD CART
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const data = await loadCartFromFirebase();
        dispatch(setCart(data));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
  };

  // 🔥 LOGIN SCREEN
  if (!user) return <Login />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-200 to-orange-300 p-6">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-bold">🛒 Shopping Cart</h2>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user?.email}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* PRODUCTS */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ProductList />
        </div>

        {/* BASKET */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <Basket />
        </div>

      </div>
    </div>
  );
}