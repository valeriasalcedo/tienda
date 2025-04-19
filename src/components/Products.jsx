import { useEffect, useState } from "react";
import { addToCartInDB, getProducts, getCartItems } from "../db.js";
import Navbar from "../components/Navbar";
import "../styles/Products.css";

const categories = [
  "Women Dresses",
  "Tops & Tees",
  "Bottoms",
  "Sweatshirts",
  "Denim",
  "Suits",
];
const styles = ["Casual", "Elegant", "Sexy", "Vintage"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
    });
    getCartItems().then((items) => setCartCount(items.length));
  }, []);

  const handleAddToCart = async (item) => {
    await addToCartInDB(item);
    const updated = await getCartItems();
    setCartCount(updated.length);
  };

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedStyles.length > 0) {
      result = result.filter((p) => selectedStyles.includes(p.style));
    }
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    setFiltered(result);
  }, [selectedCategories, selectedStyles, minPrice, maxPrice, products]);

  const toggleFilter = (value, current, setter) => {
    if (current.includes(value)) {
      setter(current.filter((c) => c !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="products-view">
        <aside className="products-sidebar">
          <div className="filter-group">
            <h3>Category</h3>
            <ul>
              {categories.map((c) => (
                <li key={c}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c)}
                    onChange={() =>
                      toggleFilter(c, selectedCategories, setSelectedCategories)
                    }
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Style</h3>
            <ul>
              {styles.map((s) => (
                <li key={s}>
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(s)}
                    onChange={() =>
                      toggleFilter(s, selectedStyles, setSelectedStyles)
                    }
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <label>
              Min:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </label>
            <label>
              Max:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </label>
          </div>
        </aside>

        <main className="products-main">
          <div className="products-grid">
            {filtered.map((product, index) => {
              const isFav = favorites.includes(product.id);
              return (
                <div key={product.id} className="product-card">
                  <div
                    className={`product-card-header color-${(index % 5) + 1}`}
                  >
                    <div
                      className={`bookmark ${isFav ? "active" : ""}`}
                      onClick={() =>
                        setFavorites((prev) =>
                          prev.includes(product.id)
                            ? prev.filter((id) => id !== product.id)
                            : [...prev, product.id]
                        )
                      }
                    >
                      {isFav ? "★" : "☆"}
                    </div>
                  </div>
                  <div className="product-card-body">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                      />
                    )}
                    <h4>{product.name}</h4>
                    <p>{product.style}</p>
                    <button onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
