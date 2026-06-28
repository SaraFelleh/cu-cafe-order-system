import { translations } from "./data/translations";
import CartDrawer from "./components/CartDrawer";
import MenuCard from "./components/MenuCard";
import Header from "./components/Header";
import SuccessModal from "./components/SuccessModal";
import { useEffect, useState } from "react";
import { menu } from "./data/menu";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import Cashier from "./pages/Cashier";
import "./App.css";
import { db, auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [user, setUser] = useState(null);
  const [openOptions, setOpenOptions] = useState({});
  const [authLoading, setAuthLoading] = useState(true);
  const [language, setLanguage] = useState("de");
  const [sessionClosed, setSessionClosed] = useState(
  sessionStorage.getItem("orderSessionClosed") === "true"
  );
  const [staffCalled, setStaffCalled] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const t = translations[language];
  const table =
    new URLSearchParams(window.location.search).get("table") || "Unknown";

  const path = window.location.pathname;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);




  if (path === "/cashier") {
    if (authLoading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return <Login onLogin={() => {}} />;
    }

    return <Cashier />;
  }

function selectExtra(itemKey, extra, item) {
  if (item.multipleExtras === false) {
    setSelectedOptions({
      ...selectedOptions,
      [itemKey]: [extra],
    });
    return;
  }

  const currentExtras = selectedOptions[itemKey] || [];
  const alreadySelected = currentExtras.some(
    (selectedExtra) => selectedExtra.id === extra.id
  );

  setSelectedOptions({
    ...selectedOptions,
    [itemKey]: alreadySelected
      ? currentExtras.filter((selectedExtra) => selectedExtra.id !== extra.id)
      : [...currentExtras, extra],
  });
}

  function selectSize(itemKey, size) {
    setSelectedSizes({
      ...selectedSizes,
      [itemKey]: size,
    });
  }

  function getItemFinalPrice(item, itemKey) {
    const selectedSize = selectedSizes[itemKey];
    const selectedExtras = selectedOptions[itemKey] || [];

    const basePrice = selectedSize ? selectedSize.price : item.price || 0;
    const extraPrice = selectedExtras.reduce(
     (sum, extra) => sum + extra.price,
     0
    );

    return basePrice + extraPrice;
  }

function addToCart(item, itemKey) {
  const selectedSize = selectedSizes[itemKey];

  if (item.sizes && !selectedSize) {
    alert(t.selectSizeRequired);
    return;
  }

  const selectedExtras = selectedOptions[itemKey] || [];

  if (item.extras && item.multipleExtras === false && selectedExtras.length === 0) {
    alert(t.selectMilkRequired);
    return;
  }
  const finalPrice = getItemFinalPrice(item, itemKey);

  const extrasKey =
    selectedExtras.length > 0
      ? selectedExtras.map((extra) => extra.id).sort().join("-")
      : "no-extra";

  const cartKey = `${itemKey}-${selectedSize?.id || "no-size"}-${extrasKey}`;

  const existingItem = cart.find((cartItem) => cartItem.cartKey === cartKey);

  if (existingItem) {
    setCart(
      cart.map((cartItem) =>
        cartItem.cartKey === cartKey
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...item,
        cartKey,
        menuItemKey: itemKey,
        price: finalPrice,
        selectedSize: selectedSize || null,
        selectedExtras: selectedExtras,
        quantity: 1,
      },
    ]);
  }
}

  function increaseCartItem(cartKey) {
    setCart(
      cart.map((cartItem) =>
        cartItem.cartKey === cartKey
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  }

  function decreaseQuantity(cartKey) {
    setCart(
      cart
        .map((item) =>
          item.cartKey === cartKey
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
    if (cart.length === 0) {
      alert(t.noItems);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const counterRef = doc(db, "dailyCounters", today);

try {
  const orderNumber = await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);

    if (counterSnap.exists()) {
      const nextNumber = counterSnap.data().lastNumber + 1;

      transaction.update(counterRef, {
        lastNumber: nextNumber,
      });

      return nextNumber;
    }

    transaction.set(counterRef, {
      lastNumber: 1,
    });

    return 1;
  });
      console.log("Cart before sending:", cart);
      console.log("Total before sending:", total);
      const order = {
       orderNumber: String(orderNumber).padStart(3, "0"),
       table: table,
       items: cart,
       total: total,
       note: orderNote,
       status: "new",
       createdAt: serverTimestamp(),
      };

      console.log(order);
      await addDoc(collection(db, "orders"), order);

      sessionStorage.setItem("orderSessionClosed", "true");
      setSessionClosed(true);

      setShowSuccess(true);
      setCart([]);
      setOrderNote("");
      setIsCartOpen(false);
    } catch (error) {
      console.error(error);
      alert(t.orderError)
    }
  }

  async function callStaff() {
  try {
    await addDoc(collection(db, "staffCalls"), {
      table: table,
      status: "new",
      createdAt: serverTimestamp(),
    });

    setStaffCalled(true);

    setTimeout(() => {
      setStaffCalled(false);
    }, 2500);
  } catch (error) {
    console.error(error);
    alert(t.orderError);
  }
}

if (sessionClosed && path !== "/cashier") {
  return (
      <div className="closed-page">
       <div className="check">✅</div>

        <h1>Cu Café</h1>

         <p>Ihre Bestellung wurde erfolgreich gesendet.</p>

         <p>
            Für eine neue Bestellung
         <br />
            scannen Sie bitte den QR-Code erneut.
         </p>

      <div className="thanks">
           Vielen Dank für Ihren Besuch ☕
      </div>
   </div>

  );
}

return (
  <div dir={language === "ar" ? "rtl" : "ltr"}>
<Header
  t={t}
  table={table}
  cartItemsCount={cartItemsCount}
  setLanguage={setLanguage}
  onOpenCart={() => setIsCartOpen(true)}
  onCallStaff={callStaff}
  staffCalled={staffCalled}
/>



    <div className="category-nav">
      {menu.map((category) => (
        <button
          key={category.category}
          className="category-nav-btn"
          onClick={() =>
            document
              .getElementById(category.category.replace(/\s+/g, "-"))
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
          }
        >
          {category.icon} {t[category.category] || category.category}
        </button>
      ))}
    </div>


<div className="menu-container">
  {menu.map((category) => (
    <section
      id={category.category.replace(/\s+/g, "-")}
      className="category-section"
      key={category.category}
    >
      <img
        src={category.image}
        alt={category.category}
        className="category-image"
      />

      <div className="category-nav category-nav-inside">
        {menu.map((cat) => (
          <button
            key={cat.category}
            className={`category-nav-btn ${
              cat.category === category.category ? "active" : ""
            }`}
            onClick={() =>
              document
                .getElementById(cat.category.replace(/\s+/g, "-"))
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
          >
            {cat.icon} {t[cat.category] || cat.category}
          </button>
        ))}
      </div>

      <h2 className="category-title">
        {category.icon} {t[category.category] || category.category}
      </h2>

      {category.description && (
        <div className="category-description">
          <p>
            {typeof category.description === "string"
              ? category.description
              : Array.isArray(category.description)
              ? category.description.join(" ")
              : category.description[language]}
          </p>
        </div>
      )}

      {category.notes && (
        <div className="category-notes">
          {(Array.isArray(category.notes)
            ? category.notes
            : category.notes[language] || []
          ).map((line, index) => (
            <p key={index}>* {line}</p>
          ))}
        </div>
      )}


<div className="menu-grid">
  {category.items.map((item) => {
    const itemKey = `${category.category}-${item.id}`;
    const selectedSize = selectedSizes[itemKey];
    const selectedExtras = selectedOptions[itemKey] || [];

    const currentCartItem = cart.find(
      (cartItem) =>
        cartItem.menuItemKey === itemKey &&
        cartItem.selectedSize?.id === selectedSize?.id &&
        JSON.stringify(cartItem.selectedExtras?.map((extra) => extra.id).sort() || []) ===
        JSON.stringify(selectedExtras.map((extra) => extra.id).sort())
    );

    return (
      <MenuCard
        key={itemKey}
        item={item}
        itemKey={itemKey}
        language={language}
        t={t}
        selectedSize={selectedSize}
        selectedExtras={selectedExtras}
        currentCartItem={currentCartItem}
        isOpen={openOptions[itemKey]}
        onSelectSize={selectSize}
        onSelectExtra={selectExtra}
        onAddToCart={addToCart}
        onOpenOptions={(key) =>
          setOpenOptions({
            ...openOptions,
            [key]: true,
          })
        }
        onCloseOptions={(key) =>
          setOpenOptions({
            ...openOptions,
            [key]: false,
          })
        }
        onDecrease={decreaseQuantity}
        onIncrease={increaseCartItem}
        getItemFinalPrice={getItemFinalPrice}
      />
    );
  })}
            </div>
          </section>
        ))}
      </div>

{isCartOpen && (
  <CartDrawer
    cart={cart}
    language={language}
    table={table}
    t={t}
    total={total}
    orderNote={orderNote}
    setOrderNote={setOrderNote}
    onClose={() => setIsCartOpen(false)}
    onSendOrder={sendOrder}
    onDecrease={decreaseQuantity}
    onIncrease={increaseCartItem}
  />
)}

{showSuccess && (
  <SuccessModal
    onClose={() => setShowSuccess(false)}
    language={language}
  />
)}

    </div>
  );
}

export default App;
