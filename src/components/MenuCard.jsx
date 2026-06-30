import { useState } from "react";
import QuantityControls from "./QuantityControls";

function MenuCard({
  item,
  itemKey,
  language,
  t,
  selectedSize,
  selectedExtras,
  currentCartItem,
  isOpen,
  onSelectSize,
  onSelectExtra,
  onAddToCart,
  onOpenOptions,
  onCloseOptions,
  onDecrease,
  onIncrease,
  getItemFinalPrice,
}) {
  const [showDescription, setShowDescription] = useState(false);

  function isExtraSelected(extraId) {
    return selectedExtras.some((extra) => extra.id === extraId);
  }

  const description =
    item.description?.[language] || item.description || "";

  return (
    <div className="menu-card">
      <h3>{item.name?.[language] || item.name}</h3>

      {item.subtitle && (
        <p className="subtitle">
          {item.subtitle?.[language] || item.subtitle}
        </p>
      )}

      {description && (
        <>
          <p className={`product-description ${showDescription ? "open" : ""}`}>
            {description}
          </p>

          <button
            type="button"
            className="read-more-btn"
            onClick={() => setShowDescription(!showDescription)}
          >
            {showDescription ? "Weniger anzeigen ▲" : "Mehr anzeigen ▼"}
          </button>
        </>
      )}

      <div className="item-top">
        <span className="item-base-price">
          {item.priceText
            ? item.priceText
            : item.price != null
            ? `${item.price.toFixed(2).replace(".", ",")}€`
            : t.askStaff}
        </span>
      </div>

      {isOpen && (
        <>
          {item.sizes && (
            <div className="option-section">
              <p className="option-title">{t.size}</p>

              <div className="option-buttons">
                {item.sizes.map((size) => (
                  <button
                    key={size.id}
                    className={`option-btn ${
                      selectedSize?.id === size.id ? "selected" : ""
                    }`}
                    onClick={() => onSelectSize(itemKey, size)}
                  >
                    {size.name?.[language] || size.name}
                    <span>{size.price.toFixed(2).replace(".", ",")}€</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.extras && (
            <div className="option-section">
              <p className="option-title">
                {item.optionLabel?.[language] || t.extras}
              </p>

              <div className="option-buttons">
                {item.extras.map((extra) => (
                  <button
                    key={extra.id}
                    className={`option-btn ${
                      isExtraSelected(extra.id) ? "selected" : ""
                    }`}
                    onClick={() => onSelectExtra(itemKey, extra, item)}
                  >
                    {extra.name?.[language] || extra.name}
                    {extra.price > 0 && (
                      <span>+{extra.price.toFixed(2).replace(".", ",")}€</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(item.sizes || item.extras) && (
            <p className="final-price">
              {t.total}: {getItemFinalPrice(item, itemKey).toFixed(2).replace(".", ",")}€
            </p>
          )}
        </>
      )}

      {currentCartItem ? (
        <QuantityControls
          quantity={currentCartItem.quantity}
          onDecrease={() => onDecrease(currentCartItem.cartKey)}
          onIncrease={() => onIncrease(currentCartItem.cartKey)}
        />
      ) : item.sizes || item.extras ? (
        isOpen ? (
          <>
            <button
              className="add-button"
              onClick={() => onAddToCart(item, itemKey)}
            >
              {t.addToCart}
            </button>

            <button
              className="hide-options-button"
              onClick={() => onCloseOptions(itemKey)}
            >
              ▲ {t.hideOptions}
            </button>
          </>
        ) : (
          <button className="add-button" onClick={() => onOpenOptions(itemKey)}>
            {t.selectOptions} ▼
          </button>
        )
      ) : (
        <button className="add-button" onClick={() => onAddToCart(item, itemKey)}>
          {t.add}
        </button>
      )}
    </div>
  );
}

export default MenuCard;