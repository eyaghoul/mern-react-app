
import './App.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useTheme } from './context/ThemeContext';
import NotificationToast from './components/NotificationToast';
function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>

      {/* Barre de navigation */}
      <Navbar />
      <NotificationToast />
      {/* Titre de la page */}
      <Header
        titre="État Global : useContext & Redux Toolkit"
        sousTitre="Séance 6 : Coexistence d'un état applicatif léger (Thème géré par Context) et d'un état métier transactionnel (Panier géré par Redux Toolkit)."
      />

      {/* Contenu principal */}
      <main className="main-content">

        {/* Catalogue des produits */}
        <section className="panel">
          <h2 className="panel-title">
            📦 Catalogue Produits
          </h2>

          <ProductList />
        </section>

        {/* Panier Redux */}
        <section className="panel cart-panel">
          <h2 className="panel-title">
            🛒 Mon Panier Redux
          </h2>

          <Cart />
        </section>

      </main>

    </div>
  );
}

export default App;
