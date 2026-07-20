import { useEffect, useRef, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Cashier() {
  const [orders, setOrders] = useState([]);
  const [staffCalls, setStaffCalls] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundError, setSoundError] = useState("");

  const previousNewOrdersCount = useRef(0);
  const previousStaffCallsCount = useRef(0);
  const firstOrdersLoad = useRef(true);
  const firstStaffCallsLoad = useRef(true);

  const soundEnabledRef = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 1;
    audio.playsInline = true;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, []);

  function getText(value) {
    if (!value) return "";
    if (typeof value === "object") {
      return value.de || value.en || value.ar || "";
    }
    return value;
  }

  function getSupportedSoundSources(baseName) {
    const testAudio = document.createElement("audio");
    const sources = [];

    const supportsMp3 = testAudio.canPlayType("audio/mpeg");
    const supportsWav = testAudio.canPlayType("audio/wav");

    if (supportsMp3) {
      sources.push(`/${baseName}.mp3`);
    }

    if (supportsWav) {
      sources.push(`/${baseName}.wav`);
    }

    // Fallback: حتى لو أعاد المتصفح قيمة فارغة، نجرب الصيغتين.
    if (sources.length === 0) {
      sources.push(`/${baseName}.mp3`, `/${baseName}.wav`);
    }

    return sources;
  }

  async function tryPlaySources(baseName, preview = false) {
    const audio = audioRef.current;

    if (!audio) {
      throw new Error("Audio player is not ready");
    }

    const sources = getSupportedSoundSources(baseName);
    let lastError = null;

    for (const source of sources) {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.src = source;
        audio.volume = preview ? 0.25 : 1;
        audio.load();

        await audio.play();

        if (preview) {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 1;
        }

        return source;
      } catch (error) {
        lastError = error;
        console.warn(`Could not play ${source}`, error);
      }
    }

    throw lastError || new Error(`Could not play ${baseName}`);
  }

  async function playSound(baseName) {
    if (!soundEnabledRef.current) return;

    try {
      await tryPlaySources(baseName, false);
    } catch (error) {
      console.error("Notification sound failed:", error);

      soundEnabledRef.current = false;
      setSoundEnabled(false);

      const message = `${error?.name || "AudioError"}: ${
        error?.message || "Sound playback failed"
      }`;

      setSoundError(message);
    }
  }

  function playNotificationSound() {
    void playSound("notification");
  }

  function playStaffCallSound() {
    void playSound("staff-call");
  }

  function renderOrderItems(items) {
    return items?.map((item, index) => (
      <div
        key={`${item.id || item.menuItemKey}-${index}`}
        className="cashier-order-item"
      >
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
          item.selectedExtras.map((extra, extraIndex) => (
            <p
              className="cart-item-detail"
              key={`${extra.id || extraIndex}-${extraIndex}`}
            >
              Auswahl: {getText(extra.name)}
              {Number(extra.price || 0) > 0 &&
                ` +${Number(extra.price).toFixed(2)}€`}
            </p>
          ))}
      </div>
    ));
  }

  function renderOrderNote(note) {
    if (typeof note !== "string" || note.trim() === "") return null;

    return (
      <div
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          padding: "12px",
          background: "#fff3c4",
          color: "#111",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        📝 Note: {note}
      </div>
    );
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const ordersData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        const statusOrder = {
          new: 1,
          accepted: 2,
          done: 3,
        };

        ordersData.sort((a, b) => {
          const statusDiff =
            (statusOrder[a.status] || 99) -
            (statusOrder[b.status] || 99);

          if (statusDiff !== 0) return statusDiff;

          const timeA = a.createdAt?.toMillis
            ? a.createdAt.toMillis()
            : 0;
          const timeB = b.createdAt?.toMillis
            ? b.createdAt.toMillis()
            : 0;

          return timeA - timeB;
        });

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
      },
      (error) => {
        console.error("Orders listener error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "staffCalls"),
      (snapshot) => {
        const callsData = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        const activeCalls = callsData.filter(
          (call) => call.status !== "done"
        );

        activeCalls.sort((a, b) => {
          const timeA = a.createdAt?.toMillis
            ? a.createdAt.toMillis()
            : 0;
          const timeB = b.createdAt?.toMillis
            ? b.createdAt.toMillis()
            : 0;

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
      },
      (error) => {
        console.error("Staff calls listener error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  async function updateStatus(orderId, status) {
    try {
      const currentOrder = orders.find(
        (order) => order.id === orderId
      );

      await updateDoc(doc(db, "orders", orderId), {
        status,
        note: currentOrder?.note || "",
      });
    } catch (error) {
      console.error(error);
      alert("Could not update order status");
    }
  }

  async function updateStaffCallStatus(callId, status) {
    try {
      await updateDoc(doc(db, "staffCalls", callId), {
        status,
      });
    } catch (error) {
      console.error(error);
      alert("Could not update staff call");
    }
  }

  async function enableSound() {
    setSoundError("");

    try {
      // نشغّل صوتًا واحدًا فقط أثناء ضغطة المستخدم.
      // هذا أكثر توافقًا مع قيود iPhone وSafari.
      const usedSource = await tryPlaySources("notification", true);

      soundEnabledRef.current = true;
      setSoundEnabled(true);

      console.log(`Sound enabled using: ${usedSource}`);
    } catch (error) {
      console.error("Sound activation failed:", error);

      soundEnabledRef.current = false;
      setSoundEnabled(false);

      const message = `${error?.name || "AudioError"}: ${
        error?.message || "Sound could not be enabled"
      }`;

      setSoundError(message);
      alert(message);
    }
  }

  const visibleOrders = orders.filter(
    (order) => order.status !== "done"
  );
  const doneOrders = orders.filter(
    (order) => order.status === "done"
  );

  return (
    <div className="cashier-page">
      <h1>Cu Café - Cashier</h1>

      <button onClick={() => signOut(auth)}>Logout</button>

      {!soundEnabled ? (
        <button onClick={enableSound} style={{ marginLeft: "10px" }}>
          🔔 Enable Sound
        </button>
      ) : (
        <span
          style={{
            marginLeft: "10px",
            color: "#58c472",
            fontWeight: "bold",
          }}
        >
          🔔 Sound enabled
        </span>
      )}

      {soundError && (
        <p
          style={{
            marginTop: "12px",
            padding: "10px",
            background: "#ffe4e4",
            color: "#9b0000",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {soundError}
        </p>
      )}

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
                  <button
                    onClick={() =>
                      updateStaffCallStatus(call.id, "done")
                    }
                  >
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

              <div className="order-items">
                {renderOrderItems(order.items)}
              </div>

              {renderOrderNote(order.note)}

              <h3>Total: {Number(order.total || 0).toFixed(2)}€</h3>

              <div className="order-actions">
                {order.status === "new" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "accepted")
                    }
                  >
                    Accept
                  </button>
                )}

                {order.status === "accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "done")
                    }
                  >
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
                      <h2>
                        Order #{order.orderNumber || "---"}
                      </h2>
                      <p>Table {order.table}</p>
                    </div>

                    <span className={`status ${order.status}`}>
                      {order.status}
                    </span>
                  </div>

                  <p className="order-time">
                    {order.createdAt?.toDate
                      ? order.createdAt
                          .toDate()
                          .toLocaleString()
                      : order.createdAt || "Loading..."}
                  </p>

                  <div className="order-items">
                    {renderOrderItems(order.items)}
                  </div>

                  {renderOrderNote(order.note)}

                  <h3>
                    Total: {Number(order.total || 0).toFixed(2)}€
                  </h3>
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