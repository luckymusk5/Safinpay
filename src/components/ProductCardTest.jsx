import AsyncProductImage from "./AsyncProductImage";

/**
 * Test component - shows colored placeholders to verify the system works
 */
export default function ProductCardTest() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>Test des Cartes Produits</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {colors.map((color, idx) => (
          <div key={idx} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '12px'
          }}>
            <div style={{
              width: '100%',
              height: '150px',
              backgroundColor: color,
              borderRadius: '4px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px'
            }}>
              Test Image {idx + 1}
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Produit de Test {idx + 1}
            </h3>
            <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px 0' }}>
              Description courte du produit
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#d5001c', margin: 0 }}>
              {(100 + idx * 10).toLocaleString()} FCFA
            </p>
          </div>
        ))}
      </div>

      <h2>Test avec données réelles du JSON</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {/* Ce composant montre les vraies images du JSON */}
        <TestRealImages />
      </div>
    </div>
  );
}

function TestRealImages() {
  const testImages = [
    {
      title: "Test TP-Link",
      url: "https://site.glotelho.cm/media/catalog/product/cache/3d5322e2293df1ca8e64a115bdb04917//t/l/tlneffosc5l4gnoir.jpg",
      price: 95800
    },
    {
      title: "Test Nestlé",
      url: "https://site.glotelho.cm/media/catalog/product/cache/3d5322e2293df1ca8e64a115bdb04917//g/l/glo00000180624cm.jpg",
      price: 6650
    }
  ];

  return testImages.map((product, idx) => (
    <div key={idx} style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '12px'
    }}>
      <div style={{
        width: '100%',
        height: '150px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        marginBottom: '12px',
        overflow: 'hidden'
      }}>
        <AsyncProductImage
          src={product.url}
          productId={product.id}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          wrapperStyle={{ width: '100%', height: '100%' }}
        />
      </div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
        {product.title}
      </h3>
      <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#d5001c', margin: 0 }}>
        {product.price.toLocaleString()} FCFA
      </p>
    </div>
  ));
}
