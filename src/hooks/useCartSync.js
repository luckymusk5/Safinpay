import { useEffect, useRef } from 'react';

/**
 * Hook pour synchroniser le panier toutes les secondes
 * Recalcule les totaux et force la mise à jour de l'UI
 */
export function useCartSync(cartItems, onUpdate) {
  const lastItemsRef = useRef(null);

  useEffect(() => {
    // Polling toutes les secondes
    const interval = setInterval(() => {
      const itemsString = JSON.stringify(cartItems);
      
      // Vérifier si les items ont changé
      if (lastItemsRef.current !== itemsString) {
        console.log("🔄 SYNC: Panier détecté changé!");
        lastItemsRef.current = itemsString;
        
        // Calculer les nouveaux totaux
        const subtotal = Math.round(cartItems.reduce((sum, item) => {
          const price = parseFloat(item?.price) || 0;
          const qty = parseInt(item?.quantity) || 1;
          return sum + (price * qty);
        }, 0));

        const shipping = subtotal > 500000 ? 0 : 5000;
        const tax = Math.round(subtotal * 0.18);
        const total = Math.round(subtotal + shipping + tax);

        // Notifier l'UI
        onUpdate?.({
          subtotal,
          shipping,
          tax,
          total,
          itemCount: cartItems.length,
          timestamp: new Date().toISOString()
        });

        console.log(`SYNC UPDATE: Sub=${subtotal} | Ship=${shipping} | Tax=${tax} | Total=${total}`);
      }
    }, 1000); // Toutes les secondes

    return () => clearInterval(interval);
  }, [cartItems, onUpdate]);
}
