
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { showToast } from '../redux/uiSlice';
// Liste des produits
const PRODUCTS = [
  {
    id: 1,
    name: 'Écran UltraWide 4K 34"',
    price: 850,
    category: 'AFFICHAGE',
    icon: '🖥️'
  },
  {
    id: 2,
    name: 'Clavier Mécanique RGB',
    price: 180,
    category: 'PÉRIPHÉRIQUE',
    icon: '⌨️'
  },
  {
    id: 3,
    name: 'Souris Sans Fil Ergonomique',
    price: 95,
    category: 'ACCESSOIRE',
    icon: '🖱️'
  },
  {
    id: 4,
    name: 'Casque Haute Fidélité ANC',
    price: 320,
    category: 'AUDIO',
    icon: '🎧'
  }
];

export default function ProductList() {

  const dispatch = useDispatch();

  return (
    <div className="product-section">

      <p className="subtitle-hint">
        Chaque clic sur le bouton déclenche une action via{' '}
        <strong>dispatch(addItem(produit)).</strong>
      </p>

      <div className="product-grid">

        {PRODUCTS.map((product) => (

          <div key={product.id} className="product-card">

            <div className="card-top">

              <span className="product-icon">
                {product.icon}
              </span>

              <span className="product-category">
                {product.category}
              </span>

            </div>

            <h3 className="product-title">
              {product.name}
            </h3>

            <div className="card-bottom">

              <span className="product-price">
                {product.price} DT
              </span>

              <button
                className="add-btn"
                onClick={() => {
                  dispatch(addItem(product));
                  dispatch(showToast(`${product.name} ajouté au panier !`));
                }}
              >
                + Ajouter
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}
