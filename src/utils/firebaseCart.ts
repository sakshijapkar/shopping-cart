import { doc, setDoc, getDoc } from "firebase/firestore";

import { db, auth } from "../firebase";

const CART_DOC_ID = "mainCart"; 

// SAVE CART
export const saveCartToFirebase = async (items: any) => {
  const user = auth.currentUser;

  if (!user) return; // 

  await setDoc(doc(db, "cart", user.uid), {
    items,
  });
};

// LOAD CART
export const loadCartFromFirebase = async () => {
  const user = auth.currentUser;

  if (!user) return {};

  const docRef = doc(db, "cart", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().items || {};
  }

  return {};
};

