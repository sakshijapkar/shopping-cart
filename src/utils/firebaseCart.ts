import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

// Session ID
if (!localStorage.getItem("sessionId")) {
  localStorage.setItem("sessionId", Date.now().toString());
}

const CART_ID = "guest-" + localStorage.getItem("sessionId");

// SAVE
export const saveCartToFirebase = async (items: any) => {
  await setDoc(doc(db, "cart", CART_ID), { items });
};

// LOAD
export const loadCartFromFirebase = async () => {
  const docRef = doc(db, "cart", CART_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().items || {};
  }

  return {};
};