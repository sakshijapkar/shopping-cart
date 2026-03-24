import { useState } from "react";

export default function Coupon({ total, setDiscount }: any) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const applyCoupon = () => {
    if (code === "SAVE10") {
      setDiscount(total * 0.1);
      setError("");
    } else {
      setError("Invalid Coupon");
    }
  };

  return (
    <div className="mt-4">
      <input
        className="border p-2 mr-2"
        placeholder="Enter Coupon"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-3 py-1"
        onClick={applyCoupon}
      >
        Apply
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}