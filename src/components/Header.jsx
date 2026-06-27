import { FiShoppingCart } from "react-icons/fi";

function Header({
  t,
  table,
  cartItemsCount,
  setLanguage,
  onOpenCart,
  onCallStaff,
  staffCalled,
}) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="logo-title">Cu Café</h1>

        <h2 className="table-title">
          {t.table} {table}
        </h2>

<div className="language-switcher">
  <button onClick={() => setLanguage("de")} className="lang-btn">
    DE
  </button>

  <button onClick={() => setLanguage("en")} className="lang-btn">
    EN
  </button>

  <button onClick={() => setLanguage("ar")} className="lang-btn">
    AR
  </button>
</div>

<div className="staff-call-wrapper">
  <button className="staff-call-button" onClick={onCallStaff}>
    🛎️ {t.callStaff}
  </button>

  {staffCalled && (
    <p className="staff-call-message">
      {t.staffCalled}
    </p>
  )}
</div>
      </div>

      <button onClick={onOpenCart} className="cart-floating-button">
        <FiShoppingCart size={20} />
        <span>{cartItemsCount}</span>
      </button>
    </header>
  );
}

export default Header;