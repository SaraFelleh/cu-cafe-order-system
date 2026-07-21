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

  const notificationAudioRef = useRef(null);
  const staffCallAudioRef = useRef(null);

  useEffect(() => {
    const notificationAudio = new Audio("/notification.mp3");
    notificationAudio.preload = "auto";
    notificationAudio.volume = 1;
    notificationAudio.playsInline = true;

    const staffCallAudio = new Audio("/staff-call.mp3");
    staffCallAudio.preload = "auto";
    staffCallAudio.volume = 1;
    staffCallAudio.playsInline = true;

    notificationAudioRef.current = notificationAudio;
    staffCallAudioRef.current = staffCallAudio;

    notificationAudio.load();
    staffCallAudio.load();

    return () => {
      [notificationAudioRef.current, staffCallAudioRef.current].forEach(
        (audio) => {
          if (!audio) return;

          audio.pause();
          audio.removeAttribute("src");
          audio.load();
        }
      );

      notificationAudioRef.current = null;
      staffCallAudioRef.current = null;
    };
  }, []);

  function getText(value) {
    if (!value) return "";

    if (typeof value === "object") {
      return value.de || value.en || value.ar || "";
    }

    return value;
  }

  async function playAudio(audio) {
    if (!audio || !soundEnabledRef.current) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;

      await audio.play();
    } catch (error) {
      console.error("Notification sound failed:", error);

      const message = `${error?.name || "AudioError"}: ${
        error?.message || "Sound playback failed"
      }`;

      setSoundError(message);
    }
  }

  function playNotificationSound() {
    void playAudio(notificationAudioRef.current);
  }

  function playStaffCallSound() {
    void playAudio(staffCallAudioRef.current);
  }

  async function enableSound() {
    setSoundError("");

    const notificationAudio = notificationAudioRef.current;
    const staffCallAudio = staffCallAudioRef.current;

    if (!notificationAudio || !staffCallAudio) {
      const message = "Audio player is not ready yet. Please try again.";
      setSoundError(message);
      alert(message);
      return;
    }

    try {
      /*
       * يجب تشغيل الصوت مباشرة داخل حدث الضغط.
       * لا نغيّر src عند وصول الطلب، لأن بعض أجهزة iPhone
       * تعتبر تغيير المصدر تشغيلًا جديدًا وتمنعه.
       */
      notificationAudio.pause();
      notificationAudio.currentTime = 0;
      notificationAudio.volume = 1;

      await notificationAudio.play();

      /*
       * نترك الصوت يعمل مدة قصيرة بدل إيقافه فورًا،
       * حتى يسجل المتصفح تفاعل المستخدم بشكل صحيح.
       */
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      notificationAudio.pause();
      notificationAudio.currentTime = 0;

      /*
       * نحاول تجهيز صوت طلب الموظف خلال نفس تفاعل المستخدم.
       * فشل هذا الجزء لا يلغي تفعيل صوت الطلبات.
       */
      try {
        staffCallAudio.muted = true;
        staffCallAudio.currentTime = 0;

        await staffCallAudio.play();

        staffCallAudio.pause();
        staffCallAudio.currentTime = 0;
        staffCallAudio.muted = false;
      } catch (staffAudioError) {
        staffCallAudio.muted = false;
        console.warn(
          "Staff-call sound could not be pre-unlocked:",
          staffAudioError
        );
      }

      soundEnabledRef.current = true;
      setSoundEnabled(true);
      setSoundError("");

      console.log("Notification sounds enabled successfully.");
    } catch (error) {
      console.error("Sound activation failed:", error);

      soundEnabledRef.current = false;
      setSoundEnabled(false);

      const message = `${error?.name || "AudioError"}: ${
        error?.message || "Sound could not be enabled"
      }`;

      setSoundError(message);
      alert(
        `${message}\n\nPlease make sure the phone is not on silent mode and press Enable Sound again.`
      );
    }
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
        <button
          onClick={enableSound}
          style={{
            marginLeft: "10px",
            padding: "10px 14px",
            cursor: "pointer",
          }}
        >
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

      {!soundEnabled && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          Press “Enable Sound” once after opening the cashier page.
        </p>
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