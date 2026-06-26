function QuantityControls({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="quantity-controls">
      <button onClick={onDecrease}>-</button>

      <span>{quantity}</span>

      <button onClick={onIncrease}>+</button>
    </div>
  );
}

export default QuantityControls;