function SuccessModal({ onClose }) {
  return (
    <div className="success-overlay">
      <div className="success-box">
        <div className="success-icon">✓</div>

        <h2 className="success-title">Vielen Dank!</h2>

        <p className="success-text">
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

        <button onClick={onClose} className="send-order-button success-button">
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;