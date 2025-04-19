import { addProduct } from '../db.js';

const sampleProducts = [
  {
    name: "Blusa Floral",
    category: "Tops & Tees",
    style: "Casual",
    price: 17.99,
    image: 'C:\Users\valer\tienda\src\assets\placeholder.jpg'
  }
];

export default function ProductImporter() {
  const handleImport = async () => {
    for (const product of sampleProducts) {
      await addProduct(product);
    }
    alert("Productos importados");
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleImport}>Importar productos</button>
    </div>
  );
}
