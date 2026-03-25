import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { storeEndpoints } from "../services/Apis";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(storeEndpoints.GET_PRODUCTS);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      // Ignore if backend isn't ready
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (productId, price) => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      if (!token) {
        toast.error("Please login to place an order.");
        return;
      }
      
      const res = await fetch(storeEndpoints.STORE_CHECKOUT, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ items: [{ id: productId, price, quantity: 1 }], totalAmount: price })
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Stripe Error: Verify your Stripe Secret Key is active.");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center bg-white font-raleway text-[#4b4b4b]">
     
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 z-10"
      >
        <span className="inline-block bg-[#FFDE79] text-[#4b4b4b] font-black px-6 py-2 rounded-full mb-4 shadow-sm">Quality Goods</span>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Premium Pet Store</h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">Shop the highest quality food, toys, and accessories to keep your pet happy and healthy.</p>
      </motion.div>

      {loading ? (
        <div className="text-center z-10"><p className="text-lg font-bold animate-pulse text-[#FF8B4D]">Loading products...</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl z-10">
          {products.map((product, i) => (
            <motion.div
              key={product._id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-gray-100 hover:border-[#FFDE79] transition-colors flex flex-col relative overflow-hidden group"
            >
              <div className="absolute top-4 left-4 bg-[#FF4DBB] px-3 py-1 rounded-full text-xs font-black text-white shadow-sm z-20 uppercase tracking-widest">
                {product.category}
              </div>
              <div className="relative w-full h-48 mb-6 overflow-hidden rounded-3xl bg-gray-50 p-4 border-2 border-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h2 className="text-xl font-bold mb-2 leading-tight">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow font-medium">{product.description}</p>
              
              <div className="flex items-end justify-between w-full mt-auto">
                <div className="flex flex-col">
                  <span className={`text-xs font-bold mb-1 ${product.stock > 0 ? 'text-[#FF8B4D]' : 'text-gray-400'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  <span className="font-black text-3xl text-[#4b4b4b]">${product.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => handleBuy(product._id, product.price)}
                  disabled={product.stock === 0}
                  className={`px-8 py-4 font-bold rounded-2xl shadow-md transition-all text-lg ${product.stock > 0 ? 'bg-[#FF8B4D] text-white hover:shadow-xl hover:scale-[1.05]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Buy
                </button>
              </div>
            </motion.div>
          ))}
          {products.length === 0 && (
             <div className="col-span-full text-center py-12 bg-gray-50 rounded-[3rem] p-8 border-4 border-dashed border-[#FF8B4D]">
              <p className="text-2xl font-bold text-gray-400">Our store shelves are being stocked right now.</p>
              <p className="mt-2 text-lg text-gray-400">Check back soon for premium pet products!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Store;
