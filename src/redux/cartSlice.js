
import { createSlice } from '@reduxjs/toolkit';

const savedItems = JSON.parse(
  localStorage.getItem('techstore_cart') || '[]'
);
const initialState = {
  items: savedItems, // Tableau d'articles
  totalCount: savedItems.reduce((sum, item) => sum + item.quantity, 0), // Nombre total d'articles
  totalPrice: savedItems.reduce((sum, item) => sum + item.price * item.quantity, 0), // Montant total en DT
  discountPercent: 0
};

// Fonction utilitaire de recalcul automatique
const recalculateTotals = (state) => {
  state.totalCount = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  localStorage.setItem(
    'techstore_cart',
    JSON.stringify(state.items)
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {

    // 1. Ajouter un article ou incrémenter sa quantité
    addItem: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }

      recalculateTotals(state);
    },

    // 2. Diminuer la quantité ou supprimer l'article
    removeItem: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload
      );

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }

      recalculateTotals(state);
    },

    // 3. Vider intégralement le panier
    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      state.discountPercent = 0;
      localStorage.setItem('techstore_cart', JSON.stringify([]));
    },
    applyPromoCode: (state, action) => {
  if (action.payload === 'POLY2027') {
    state.discountPercent = 20;
  } else {
    state.discountPercent = 0;
  }
},
  }
});

// Export des actions
export const {
  addItem,
  removeItem,
  clearCart,
  applyPromoCode
} = cartSlice.actions;

// Export du reducer
export default cartSlice.reducer;
