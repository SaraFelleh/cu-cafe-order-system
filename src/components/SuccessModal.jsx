import { translations } from "../data/translations";

function SuccessModal({ onClose, language }) {
  const t = translations[language];

  return (
    <div className="success-overlay">
      <div className="success-box">
        <div className="success-icon">✓</div>

        <h2 className="success-title">{t.thankYou}</h2>

        <p className="success-text">
          {t.orderSent}
          <br />
          <br />
          {t.payAtCashier}
          <br />
          <br />
          {t.thanksVisit} <b>Cu Café</b>.
          <br />
          {t.haveNiceStay} ☕
        </p>

        <button onClick={onClose} className="send-order-button success-button">
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;