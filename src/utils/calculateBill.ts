type Product = {
  id: string;
  name: string;
  price: number;
};

export function calculateBill(
  items: Record<string, number>,
  products: Product[]
) {
  let subtotal = 0;
  let savings = 0;

  const itemDetails: any[] = [];

  const getQty = (name: string) => {
    const product = products.find((p) => p.name === name);
    return product ? items[product.id] || 0 : 0;
  };

  const soupQty = getQty("Soup");

  Object.keys(items).forEach((id) => {
    const product = products.find((p) => p.id === id)!;
    const qty = items[id];

    let itemTotal = product.price * qty;
    let itemSavings = 0;

    // Cheese → Buy 1 Get 1 Free
    if (product.name === "Cheese") {
      const freeItems = Math.floor(qty / 2);
      itemSavings += freeItems * product.price;
    }

    // Bread → 50% OFF if Soup present
    if (product.name === "Bread") {
      const eligible = Math.min(qty, soupQty);
      itemSavings += eligible * (product.price * 0.5);
    }

    // Butter → 1/3 OFF
    if (product.name === "Butter") {
      itemSavings += qty * (product.price / 3);
    }

    subtotal += itemTotal;
    savings += itemSavings;

    itemDetails.push({
      id,
      name: product.name,
      price: product.price,
      qty,
      total: itemTotal,
      savings: itemSavings,
      final: itemTotal - itemSavings,
    });
  });

  return {
    subtotal,
    savings,
    total: subtotal - savings,
    itemDetails,
  };
}