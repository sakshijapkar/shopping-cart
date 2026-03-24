type Product = {
  id: string;
  name: string;
  price: number;
};

export function calculateBill(items: Record<string, number>, products: Product[]) {
  let subtotal = 0;
  let savings = 0;

  const itemDetails: any[] = [];

  Object.keys(items).forEach((id) => {
    const product = products.find((p) => p.id === id)!;
    const qty = items[id];

    let itemTotal = product.price * qty;
    let itemSavings = 0;

    //BUTTER DISCOUNT (Already done)
    if (product.name === "Butter" && qty >= 1) {
      itemSavings += 0.4;
    }

    //BREAD: Buy 2 get 50% off 1
    if (product.name === "Bread" && qty >= 2) {
      const discountPairs = Math.floor(qty / 2);
      itemSavings += discountPairs * (product.price * 0.5);
    }

    //SOUP: Buy 3 pay for 2
    if (product.name === "Soup" && qty >= 3) {
      const freeItems = Math.floor(qty / 3);
      itemSavings += freeItems * product.price;
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