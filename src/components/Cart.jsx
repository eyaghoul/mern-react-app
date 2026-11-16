
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/cartSlice';

export default function Cart() {
  const { items, totalCount, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

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

          <div className="cart-total-box">
            <div className="total-row">
              <span>Nombre total d’articles :</span>
              <strong>{totalCount}</strong>
            </div>

            <div className="total-row total-highlight">
              <span>Montant Total :</span>
              <strong className="total-amount">
                {totalPrice} DT
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
