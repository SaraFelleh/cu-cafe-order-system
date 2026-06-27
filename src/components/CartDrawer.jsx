import QuantityControls from "./QuantityControls";

function CartDrawer({
  cart,
  language,
  table,
  t,
  total,
  orderNote,
  setOrderNote,
  onClose,
  onSendOrder,
  onDecrease,
  onIncrease,
}) {
  function getText(value) {
    if (!value) return "";
    if (typeof value === "object") {
      return value[language] || value.de || value.en || value.ar || "";
    }
    return value;
  }

  return (
    <div className="cart-drawer">
      <button onClick={onClose} className="close-cart-button">
        ×
      </button>

      <h2 className="cart-title">{t.yourOrder}</h2>

      <p className="cart-table">
        {t.table} {table}
      </p>

      {cart.length === 0 ? (
        <p>{t.noItems}</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.cartKey}>
              <p>
                {getText(item.name)} × {item.quantity}
              </p>

              {item.selectedSize && (
                <p className="cart-item-detail">
                  {t.size}: {getText(item.selectedSize.name)}
                </p>
              )}

              {item.selectedExtras?.length > 0 &&
                item.selectedExtras.map((extra) => (
                  <p className="cart-item-detail" key={extra.id}>
                    {t.extras}: {getText(extra.name)}
                    {extra.price > 0 && ` +${extra.price.toFixed(2)}€`}
                  </p>
                ))}

              <p>{(item.price * item.quantity).toFixed(2)}€</p>

              <div className="cart-quantity">
                <QuantityControls
                  quantity={item.quantity}
                  onDecrease={() => onDecrease(item.cartKey)}
                  onIncrease={() => onIncrease(item.cartKey)}
                />
              </div>

              <hr />
            </div>
          ))}

          <h3>
  {t.total}: {total.toFixed(2)}€
</h3>

      <textarea
        className="order-note"
        placeholder={t.orderNote}
        value={orderNote}
        onChange={(e) => setOrderNote(e.target.value)}
      />

      <button className="send-order-button" onClick={onSendOrder}>
        {t.sendOrder}
      </button>
        </>
      )}
    </div>
  );
}

export default CartDrawer;