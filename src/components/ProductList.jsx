
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

// Liste des produits
const PRODUCTS = [
  {
    id: 1,
    name: 'Ecran UltraWide 4K 34"',
    price: 850,
    category: 'Affichage',
    icon: '[ Ecran ]'
  },
  {
    id: 2,
    name: 'Clavier Mecanique RGB',
    price: 180,
    category: 'Peripherique',
    icon: '[ Clavier ]'
  },
  {
    id: 3,
    name: 'Souris Sans Fil Ergonomique',
    price: 95,
    category: 'Accessoire',
    icon: '[ Souris ]'
  },
  {
    id: 4,
    name: 'Casque Haute Fidelite ANC',
    price: 320,
    category: 'Audio',
    icon: '[ Audio ]'
  }
];

export default function ProductList() {

  const dispatch = useDispatch();

  return (
    <div className="product-section">

      <div className="section-title-box">
        <h3>Catalogue Produits</h3>

        <p className="subtitle-hint">
          Chaque clic déclenche une action via dispatch(addItem(p)).
        </p>
      </div>

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

            <h4 className="product-title">
              {product.name}
            </h4>

            <div className="card-bottom">

              <span className="product-price">
                {product.price} DT
              </span>

              <button
                className="btn btn-add"
                onClick={() => dispatch(addItem(product))}
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
