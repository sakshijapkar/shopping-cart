import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addItem, removeItem } from "../features/basket/basketSlice";
import { products } from "../data/products";
import { calculateBill } from "../utils/calculateBill";
import Coupon from "./Coupon";

export default function Basket() {
  const items = useSelector((state: any) => state.basket.items);
  const dispatch = useDispatch();

  const [extraDiscount, setExtraDiscount] = useState(0);

  const bill = calculateBill(items, products);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-bold mb-4">Basket</h2>

      {/* EMPTY STATE */}
      {Object.keys(items).length === 0 && (
        <p className="text-gray-500">No items added</p>
      )}

      {/* ITEMS LIST */}
      {bill.itemDetails.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 p-2 rounded mb-2"
        >
          {/* LEFT SIDE */}
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-500">£ {item.price.toFixed(2)}</p>

            <p className="text-sm text-gray-500 mt-1">
              £{item.price.toFixed(2)} × {item.qty} = £
              {item.total.toFixed(2)}
            </p>

            {item.savings > 0 && (
              <p className="text-red-500 text-sm">
                Savings £{item.savings.toFixed(2)}
              </p>
            )}

            <p className="font-medium">
              Item cost £{item.final.toFixed(2)}
            </p>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(addItem(item.id))}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
            >
              +
            </button>

            <span className="font-medium">{item.qty}</span>

            <button
              onClick={() => dispatch(removeItem(item.id))}
              className="border px-3 py-1 rounded-lg hover:bg-gray-200 transition"
            >
              -
            </button>
          </div>
        </div>
      ))}

      {/* COUPON */}
      {bill.itemDetails.length > 0 && (
        <Coupon total={bill.total} setDiscount={setExtraDiscount} />
      )}

      {/* ✅ FINAL TOTAL SECTION UI */}
      {bill.itemDetails.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <p className="text-gray-600">
            Sub Total: £ {bill.subtotal.toFixed(2)}
          </p>

          <p className="text-red-500">
            Savings: £ {bill.savings.toFixed(2)}
          </p>

          {extraDiscount > 0 && (
            <p className="text-green-600">
              Coupon: -£ {extraDiscount.toFixed(2)}
            </p>
          )}

          <p className="font-bold text-xl mt-2">
            Total Amount: £ {(bill.total - extraDiscount).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}