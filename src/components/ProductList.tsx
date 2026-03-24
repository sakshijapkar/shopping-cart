import { useDispatch } from "react-redux";
import { addItem } from "../features/basket/basketSlice";
import { products } from "../data/products";

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center border-b pb-3"
        >
          <div>
            <p className="font-medium text-lg">{product.name}</p>
            <p className="text-gray-500">£ {product.price.toFixed(2)}</p>
          </div>

          <button
            onClick={() => dispatch(addItem(product.id))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg transition"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}