import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaHome } from 'react-icons/fa'; // React Icons example
import FlipkartLogo from './assets/flipkart logo.png';
import './Header.css';
import { productData } from './CategoryItems.js'; // Import product data

const generateSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Header = ({ cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const allProducts = Object.values(productData).flat();
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (productName) => {
    const slug = generateSlug(productName);
    setSearchQuery('');
    setFilteredProducts([]);
    navigate(`/product/${slug}`);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src={FlipkartLogo} alt="Flipkart Logo" />
        <small>
          Explore <span className="plus">Plus ✨</span>
        </small>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button>
          <FaSearch />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">
          <button>
            <FaHome /> Home
          </button>
        </Link>
        <Link to="/login">
          <button>
            <FaUser /> Login
          </button>
        </Link>
        <Link to="/become-seller">
          <button>Become a Seller</button>
        </Link>
        <Link to="/cart">
          <button>
            <FaShoppingCart /> Cart <span id="cart-count">({cartCount})</span>
          </button>
        </Link>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((product) => (
                <li key={product.name} className="search-item">
                  <div
                    onClick={() => handleProductClick(product.name)}
                    className="search-link"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="product-img"
                    />
                    <div>
                      <h4>{product.name}</h4>
                      <p>₹{product.price}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

