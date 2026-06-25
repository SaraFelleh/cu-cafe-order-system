import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { menu } from "./data/menu";
import { db } from "./firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import Cashier from "./pages/Cashier";
import "./App.css";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const table =
    new URLSearchParams(window.location.search).get("table") || "Unknown";

  const path = window.location.pathname;

if (path === "/cashier") {
  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login onLogin={() => {}} />;
  }

  return <Cashier />;
}

  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  function decreaseQuantity(itemId) {
    setCart(
      cart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


const cartItemsCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);

async function sendOrder() {
  const today = new Date().toISOString().split("T")[0];
  const counterRef = doc(db, "dailyCounters", today);

  let orderNumber = 1;

  try {
    const counterSnap = await getDoc(counterRef);

    if (counterSnap.exists()) {
      orderNumber = counterSnap.data().lastNumber + 1;

      await updateDoc(counterRef, {
        lastNumber: orderNumber,
      });
    } else {
      await setDoc(counterRef, {
        lastNumber: 1,
      });
    }

    const formattedOrderNumber = String(orderNumber).padStart(3, "0");
    const order = {
     orderNumber: String(orderNumber).padStart(3, "0"),
    table: table,
    items: cart,
    total: total,
    status: "new",
    createdAt: serverTimestamp(),
    };
    console.log(order);
    await addDoc(collection(db, "orders"), order);

    alert("Ihre Bestellung wurde gesendet. Bitte zahlen Sie an der Kasse.");

    setCart([]);
    setIsCartOpen(false);
  } catch (error) {
    console.error(error);
    alert("Error sending order");
  }
}
  return (
    <div>
<header
  style={{
    position: "sticky",
    top: 0,
    background: "#15161d",
    padding: "28px 90px 24px",
    zIndex: 100,
    borderBottom: "1px solid #333",
    overflow: "visible",
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      overflow: "visible",
    }}
  >
    <h1
      style={{
        margin: 0,
        fontSize: "64px",
        fontWeight: "800",
        lineHeight: "1",
        letterSpacing: "1px",
        background:
          "linear-gradient(180deg, #FFF2D5 0%, #F2C97D 20%, #C8873F 45%, #8F5728 70%, #F4D18C 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 2px 4px rgba(184,115,51,0.12)",
      }}
    >
      Cu Café
    </h1>

    <h2
      style={{
        margin: 0,
        fontSize: "26px",
        lineHeight: "1",
        color: "#ffffff",
      }}
    >
      Table {table}
    </h2>
  </div>

  <button
    onClick={() => setIsCartOpen(true)}
    style={{
      position: "fixed",
      top: "25px",
      right: "30px",
      width: "60px",
      height: "60px",
      borderRadius: "18px",
      border: "2px solid #E0BE6D",
      background: "#1f212b",
      color: "#E0BE6D",
      fontSize: "24px",
      fontWeight: "bold",
      cursor: "pointer",
      zIndex: 1000,
      boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
    }}
  >
    <>
    <FiShoppingCart size={24} />
    <span>{cartItemsCount}</span>
   </>
  </button>
</header>

<img
  src="/images/coffee-menu.png"
  alt="Coffee menu"
  className="hero-image"
/>

<div className="menu-container">
  {menu.map((category) => (
    <section className="category-section" key={category.category}>
     <img
      src={category.image}
      alt={category.category}
      className="category-image"
     />
      <h2 className="category-title">
        {category.icon} {category.category}
      </h2>

      <div className="menu-grid">
        {category.items.map((item) => (
<div className="menu-card" key={item.id}>
  <h3>{item.name}</h3>

  <p className="price">{item.price.toFixed(2)}€</p>

  {cart.find((cartItem) => cartItem.id === item.id) ? (
    <div className="quantity-controls">
      <button onClick={() => decreaseQuantity(item.id)}>
        -
      </button>

      <span>
        {
          cart.find((cartItem) => cartItem.id === item.id)
            ?.quantity
        }
      </span>

      <button onClick={() => addToCart(item)}>
        +
      </button>
    </div>
  ) : (
    <button
      className="add-button"
      onClick={() => addToCart(item)}
    >
      Add
    </button>
  )}
</div>
        ))}
      </div>
    </section>
  ))}
</div>

{isCartOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "400px",
      maxWidth: "95%",
      height: "100vh",
      background: "#1f212b",
      color: "white",
      padding: "30px",
      zIndex: 200,
      overflowY: "auto",
      boxShadow: "-8px 0 20px rgba(0,0,0,0.4)",
    }}
  >
   <button
  onClick={() => setIsCartOpen(false)}
  style={{
    position: "absolute",
    top: "20px",
    right: "20px",
    border: "none",
    background: "transparent",
    color: "white",
    fontSize: "26px",
    cursor: "pointer",
  }}
>
  ×
</button>

    <h2 style={{ color: "#E0BE6D", textAlign: "center" }}>
      Your Order
    </h2>

<p
  style={{
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "20px",
    color: "#F2C97D",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "2px",
  }}
>
  TABLE {table}
</p>

    {cart.length === 0 ? (
      <p>No items yet</p>
    ) : (
      <>
        {cart.map((item) => (
          <div key={item.id}>
            <p>{item.name} × {item.quantity}</p>
            <p>{(item.price * item.quantity).toFixed(2)}€</p>

            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <button onClick={() => addToCart(item)}>+</button>

            <hr />
          </div>
        ))}

        <h3>Total: {total.toFixed(2)}€</h3>

        <button className="send-order-button" onClick={sendOrder}>
          Send Order
        </button>
      </>
    )}
  </div>
)}
    </div>
  );
}

export default App;