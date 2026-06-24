import { useEffect, useRef, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Cashier() {
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const previousNewOrdersCount = useRef(0);
  const firstLoad = useRef(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      const statusOrder = {
        new: 1,
        accepted: 2,
        done: 3,
      };

      ordersData.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

      const newOrdersCount = ordersData.filter(
        (order) => order.status === "new"
      ).length;

      if (!firstLoad.current && newOrdersCount > previousNewOrdersCount.current) {
        const audio = new Audio("/notification.wav");
        audio.play().catch((err) => console.log(err));
      }

      firstLoad.current = false;
      previousNewOrdersCount.current = newOrdersCount;

      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  async function updateStatus(orderId, status) {
    await updateDoc(doc(db, "orders", orderId), {
      status: status,
    });
  }

  const visibleOrders = orders.filter((order) => order.status !== "done");
  const doneOrders = orders.filter((order) => order.status === "done");

  return (
    <div className="cashier-page">
      <h1>Cu Café - Cashier</h1>

      <button onClick={() => signOut(auth)}>Logout</button>

      <div className="orders-grid">
        {visibleOrders.length === 0 ? (
          <p>No active orders</p>
        ) : (
          visibleOrders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h2>Order #{order.orderNumber || "---"}</h2>
                  <p>Table {order.table}</p>
                </div>

                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

              <p className="order-time">{order.createdAt}</p>

              <div className="order-items">
                {order.items?.map((item, index) => (
                  <p key={index}>
                    {item.quantity ? `${item.quantity}× ` : ""}
                    {item.name} - {item.price}€
                  </p>
                ))}
              </div>

              <h3>Total: {Number(order.total || 0).toFixed(2)}€</h3>

              <div className="order-actions">
                {order.status === "new" && (
                  <button onClick={() => updateStatus(order.id, "accepted")}>
                    Accept
                  </button>
                )}

                {order.status === "accepted" && (
                  <button onClick={() => updateStatus(order.id, "done")}>
                    Done
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setShowHistory(!showHistory)}
        style={{ marginTop: "40px" }}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {showHistory && (
        <>
          <h2 style={{ marginTop: "30px" }}>History</h2>

          <div className="orders-grid">
            {doneOrders.length === 0 ? (
              <p>No completed orders yet</p>
            ) : (
              doneOrders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-header">
                    <div>
                      <h2>Order #{order.orderNumber || "---"}</h2>
                      <p>Table {order.table}</p>
                    </div>

                    <span className={`status ${order.status}`}>
                      {order.status}
                    </span>
                  </div>

                  <p className="order-time">{order.createdAt}</p>

                  <div className="order-items">
                    {order.items?.map((item, index) => (
                      <p key={index}>
                        {item.quantity ? `${item.quantity}× ` : ""}
                        {item.name} - {item.price}€
                      </p>
                    ))}
                  </div>

                  <h3>Total: {Number(order.total || 0).toFixed(2)}€</h3>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cashier;