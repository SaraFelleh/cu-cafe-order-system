import { useEffect, useRef, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Cashier() {
  const [orders, setOrders] = useState([]);
  const [staffCalls, setStaffCalls] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const previousNewOrdersCount = useRef(0);
  const previousStaffCallsCount = useRef(0);
  const firstOrdersLoad = useRef(true);
  const firstStaffCallsLoad = useRef(true);

  function getText(value) {
    if (!value) return "";
    if (typeof value === "object") return value.de || value.en || value.ar || "";
    return value;
  }

  function playNotificationSound() {
    if (!soundEnabled) return;

    const audio = new Audio("/notification.wav");
    audio.volume = 1;

    audio.play().catch((err) => {
      console.log("Sound blocked:", err);
    });
  }

  function playStaffCallSound() {
  if (!soundEnabled) return;

  const audio = new Audio("/staff-call.wav");
  audio.volume = 1;

  audio.play().catch((err) => {
    console.log("Staff sound blocked:", err);
  });
}

  function renderOrderItems(items) {
    return items?.map((item, index) => (
      <div key={index} className="cashier-order-item">
        <p>
          {item.quantity ? `${item.quantity}× ` : ""}
          {getText(item.name)} - {Number(item.price || 0).toFixed(2)}€
        </p>

        {item.selectedSize && (
          <p className="cart-item-detail">
            Größe: {getText(item.selectedSize.name)}
          </p>
        )}

        {item.selectedExtras?.length > 0 &&
          item.selectedExtras.map((extra) => (
            <p className="cart-item-detail" key={extra.id}>
              Auswahl: {getText(extra.name)}
              {extra.price > 0 && ` +${extra.price.toFixed(2)}€`}
            </p>
          ))}
      </div>
    ));
  }

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

      if (
        !firstOrdersLoad.current &&
        newOrdersCount > previousNewOrdersCount.current
      ) {
        playNotificationSound();
      }

      firstOrdersLoad.current = false;
      previousNewOrdersCount.current = newOrdersCount;
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [soundEnabled]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "staffCalls"), (snapshot) => {
      const callsData = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      const activeCalls = callsData.filter((call) => call.status !== "done");

      activeCalls.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

if (
  !firstStaffCallsLoad.current &&
  activeCalls.length > previousStaffCallsCount.current
) {
  playStaffCallSound();
}

      firstStaffCallsLoad.current = false;
      previousStaffCallsCount.current = activeCalls.length;
      setStaffCalls(activeCalls);
    });

    return () => unsubscribe();
  }, [soundEnabled]);

  async function updateStatus(orderId, status) {
    await updateDoc(doc(db, "orders", orderId), {
      status: status,
    });
  }

  async function updateStaffCallStatus(callId, status) {
    await updateDoc(doc(db, "staffCalls", callId), {
      status: status,
    });
  }

  const visibleOrders = orders.filter((order) => order.status !== "done");
  const doneOrders = orders.filter((order) => order.status === "done");

  return (
    <div className="cashier-page">
      <h1>Cu Café - Cashier</h1>

      <button onClick={() => signOut(auth)}>Logout</button>

<button
  onClick={async () => {
    try {
      const orderAudio = new Audio("/notification.wav");
      orderAudio.volume = 1;
      await orderAudio.play();

      const staffAudio = new Audio("/staff-call.wav");
      staffAudio.volume = 1;
      await staffAudio.play();

      setSoundEnabled(true);
      alert("Sound enabled");
    } catch (err) {
      console.log(err);
      alert("Sound could not be enabled");
    }
  }}
  style={{ marginLeft: "10px" }}
>
  🔔 Enable Sound
</button>

      {staffCalls.length > 0 && (
        <>
          <h2 style={{ marginTop: "30px", color: "#E0BE6D" }}>
            🛎️ Staff Calls
          </h2>

          <div className="orders-grid">
            {staffCalls.map((call) => (
              <div className="order-card" key={call.id}>
                <div className="order-header">
                  <div>
                    <h2>Table {call.table}</h2>
                    <p>Needs staff</p>
                  </div>

                  <span className="status new">NEW</span>
                </div>

                <p className="order-time">
                  {call.createdAt?.toDate
                    ? call.createdAt.toDate().toLocaleString()
                    : "Loading..."}
                </p>

                <div className="order-actions">
                  <button onClick={() => updateStaffCallStatus(call.id, "done")}>
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 style={{ marginTop: "30px" }}>Orders</h2>

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

              <p className="order-time">
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : order.createdAt || "Loading..."}
              </p>

              <div className="order-items">{renderOrderItems(order.items)}</div>
              {order.note && (
                 <div className="order-note-box">
                 <strong>📝 Note</strong>
                 <p>{order.note}</p>
                 </div>
              )}

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

                  <p className="order-time">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleString()
                      : order.createdAt || "Loading..."}
                  </p>

                  <div className="order-items">
                    {renderOrderItems(order.items)}
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