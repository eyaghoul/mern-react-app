
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addItem,
  removeItem,
  clearCart,
  applyPromoCode
} from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice, discountPercent } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const handleApplyPromo = () => {
    dispatch(applyPromoCode(promoCode.trim()));

    if (promoCode.trim() === 'POLY2027') {
      setPromoMessage('Code promo appliqué ! -20%');
    } else {
      setPromoMessage('Code promo invalide.');
    }
  };

  const finalPrice = totalPrice * (1 - discountPercent / 100);

  return (
    <div className="cart-card">

      <div className="cart-header">
        <h3>Mon Panier Redux</h3>

        {items.length > 0 && (
          <button
            className="btn-clear"
            onClick={() => dispatch(clearCart())}
          >
            Vider
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Le panier est actuellement vide.</p>
          <span className="empty-subtext">
            Ajoutez un article pour observer la réactivité de Redux.
          </span>
        </div>
      ) : (
        <div className="cart-body">

          <div className="cart-items-container">
            {items.map((item) => (
              <div key={item.id} className="cart-row">

                <span className="cart-item-icon">
                  {item.icon}
                </span>

                <div className="cart-item-details">
                  <span className="cart-item-name">
                    {item.name}
                  </span>

                  <span className="cart-item-price">
                    {item.price} DT x {item.quantity} ={' '}
                    <strong>
                      {item.price * item.quantity} DT
                    </strong>
                  </span>
                </div>

                <div className="cart-item-qty">
                  <button
                    className="btn-qty"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    -
                  </button>

                  <span className="qty-number">
                    {item.quantity}
                  </span>

                  <button
                    className="btn-qty"
                    onClick={() => dispatch(addItem(item))}
                  >
                    +
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Promo code */}
          <div className="promo-section">
            <input
              type="text"
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />

            <button onClick={handleApplyPromo}>
              Appliquer
            </button>

            <p>{promoMessage}</p>
          </div>

          {/* Cart total */}
          <div className="cart-total-box">

            <div className="total-row">
              <span>Nombre total d’articles :</span>
              <strong>{totalCount}</strong>
            </div>

            <div className="total-row">
              <span>Sous-total :</span>
              <strong>{totalPrice.toFixed(2)} DT</strong>
            </div>

            {discountPercent > 0 && (
              <div className="total-row" style={{ color: 'green' }}>
                <span>Remise ({discountPercent}%) :</span>
                <strong>
                  -{(totalPrice - finalPrice).toFixed(2)} DT
                </strong>
              </div>
            )}

            <div className="total-row total-highlight">
              <span>Montant Total :</span>

              <strong className="total-amount">
                {finalPrice.toFixed(2)} DT
              </strong>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
