import { FiShoppingCart } from "react-icons/fi";
import { translations } from "./data/translations";
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [user, setUser] = useState(null);
  const [openOptions, setOpenOptions] = useState({});
  const [authLoading, setAuthLoading] = useState(true);
  const [language, setLanguage] = useState("de");

  const t = translations[language];

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

  function selectExtra(itemKey, extra) {
    setSelectedOptions({
      ...selectedOptions,
      [itemKey]: extra,
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
    const selectedExtra = selectedOptions[itemKey];

    const basePrice = selectedSize ? selectedSize.price : item.price;
    const extraPrice = selectedExtra ? selectedExtra.price : 0;

    return basePrice + extraPrice;
  }

  function addToCart(item, itemKey) {
    const selectedSize = selectedSizes[itemKey];
    const selectedExtra = selectedOptions[itemKey];
    const finalPrice = getItemFinalPrice(item, itemKey);

    const cartKey = `${itemKey}-${selectedSize?.id || "no-size"}-${
      selectedExtra?.id || "no-extra"
    }`;

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
          selectedExtra: selectedExtra || null,
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

      setShowSuccess(true);
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error sending order");
    }
  }

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <header
        style={{
          position: "sticky",
          top: 0,
          background: "#15161d",
          padding: "18px 20px 18px",
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
          <h1 className="logo-title">Cu Café</h1>

          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              lineHeight: "1",
              color: "#ffffff",
            }}
          >
            {t.table} {table}
          </h2>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <button onClick={() => setLanguage("de")} className="lang-btn">
              🇩🇪
            </button>

            <button onClick={() => setLanguage("en")} className="lang-btn">
              EN
            </button>

            <button onClick={() => setLanguage("ar")} className="lang-btn">
              AR
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: "fixed",
            top: "25px",
            right: "18px",
            width: "48px",
            height: "48px",
            borderRadius: "18px",
            border: "2px solid #E0BE6D",
            background: "#1f212b",
            color: "#E0BE6D",
            fontSize: "20px",
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
          <FiShoppingCart size={20} />
          <span>{cartItemsCount}</span>
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
                const selectedExtra = selectedOptions[itemKey];
                const currentCartItem = cart.find(
                  (cartItem) =>
                    cartItem.menuItemKey === itemKey &&
                    cartItem.selectedSize?.id === selectedSize?.id &&
                    cartItem.selectedExtra?.id === selectedExtra?.id
                );

                return (
                  <div className="menu-card" key={itemKey}>
                    <h3>{item.name?.[language] || item.name}</h3>

                    {item.subtitle && (
                      <p className="subtitle">
                        {item.subtitle?.[language] || item.subtitle}
                      </p>
                    )}

                    <div className="item-top">
                      <span className="item-base-price">
                        {item.priceText
                          ? item.priceText
                          : item.price != null
                          ? `${item.price.toFixed(2)}€`
                          : t.askStaff}
                      </span>
                    </div>

                    {openOptions[itemKey] && (
                      <>
                        {item.sizes && (
                          <div className="option-section">
                            <p className="option-title">Größe</p>

                            <div className="option-buttons">
                              {item.sizes.map((size) => (
                                <button
                                  key={size.id}
                                  className={`option-btn ${
                                    selectedSizes[itemKey]?.id === size.id
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() => selectSize(itemKey, size)}
                                >
                                  {size.name}
                                  <span>{size.price.toFixed(2)}€</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.extras && (
                          <div className="option-section">
                            <p className="option-title">Extras</p>

                            <div className="option-buttons">
                              {item.extras.map((extra) => (
                                <button
                                  key={extra.id}
                                  className={`option-btn ${
                                    selectedOptions[itemKey]?.id === extra.id
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() => selectExtra(itemKey, extra)}
                                >
                                  {extra.name?.[language] || extra.name}
                                  {extra.price > 0 && (
                                    <span>+{extra.price.toFixed(2)}€</span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {(item.sizes || item.extras) && (
                          <p className="final-price">
                            {t.total}:{" "}
                            {getItemFinalPrice(item, itemKey).toFixed(2)}€
                          </p>
                        )}
                      </>
                    )}

                    {currentCartItem ? (
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            decreaseQuantity(currentCartItem.cartKey)
                          }
                        >
                          -
                        </button>

                        <span>{currentCartItem.quantity}</span>

                        <button
                          onClick={() =>
                            increaseCartItem(currentCartItem.cartKey)
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : item.sizes || item.extras ? (
                      openOptions[itemKey] ? (
                        <>
                          <button
                            className="add-button"
                            onClick={() => addToCart(item, itemKey)}
                          >
                            In den Warenkorb
                          </button>

                          <button
                            className="hide-options-button"
                            onClick={() =>
                              setOpenOptions({
                                ...openOptions,
                                [itemKey]: false,
                              })
                            }
                          >
                            ▲ Ausblenden
                          </button>
                        </>
                      ) : (
                        <button
                          className="add-button"
                          onClick={() =>
                            setOpenOptions({
                              ...openOptions,
                              [itemKey]: true,
                            })
                          }
                        >
                          Optionen auswählen ▼
                        </button>
                      )
                    ) : (
                      <button
                        className="add-button"
                        onClick={() => addToCart(item, itemKey)}
                      >
                        {t.add}
                      </button>
                    )}
                  </div>
                );
              })}
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
            {t.yourOrder}
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
            {t.table} {table}
          </p>

          {cart.length === 0 ? (
            <p>{t.noItems}</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.cartKey}>
                  <p>
                    {item.name?.[language] || item.name} × {item.quantity}
                  </p>

                  {item.selectedSize && (
                    <p style={{ color: "#aaa", fontSize: "14px" }}>
                      Größe: {item.selectedSize.name}
                    </p>
                  )}

                  {item.selectedExtra && (
                    <p style={{ color: "#aaa", fontSize: "14px" }}>
                      Extra:{" "}
                      {item.selectedExtra.name?.[language] ||
                        item.selectedExtra.name}
                      {item.selectedExtra.price > 0 &&
                        ` +${item.selectedExtra.price.toFixed(2)}€`}
                    </p>
                  )}

                  <p>{(item.price * item.quantity).toFixed(2)}€</p>

                  <button onClick={() => decreaseQuantity(item.cartKey)}>
                    -
                  </button>
                  <button onClick={() => increaseCartItem(item.cartKey)}>
                    +
                  </button>

                  <hr />
                </div>
              ))}

              <h3>
                {t.total}: {total.toFixed(2)}€
              </h3>

              <button className="send-order-button" onClick={sendOrder}>
                {t.sendOrder}
              </button>
            </>
          )}
        </div>
      )}

      {showSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#20212b",
              border: "2px solid #E0BE6D",
              borderRadius: "22px",
              padding: "35px",
              width: "390px",
              maxWidth: "90%",
              textAlign: "center",
              color: "white",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                background: "#E0BE6D",
                color: "#15161d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>

            <h2 style={{ color: "#E0BE6D", marginBottom: "20px" }}>
              Vielen Dank!
            </h2>

            <p style={{ lineHeight: "1.8", fontSize: "17px" }}>
              Ihre Bestellung wurde erfolgreich übermittelt.
              <br />
              <br />
              Bitte bezahlen Sie an der Kasse.
              <br />
              <br />
              Vielen Dank für Ihren Besuch im <b>Cu Café</b>.
              <br />
              Wir wünschen Ihnen einen schönen Aufenthalt! ☕
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="send-order-button"
              style={{ marginTop: "25px" }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
