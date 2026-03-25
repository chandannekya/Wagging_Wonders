import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogEndpoints } from "../services/Apis";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(blogEndpoints.GET_ARTICLES);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (err) {
      // Ignore if backend isn't ready
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center bg-white font-raleway text-[#4b4b4b]">
     
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 z-10"
      >
        <span className="inline-block bg-[#FF8B4D] text-white font-black px-6 py-2 rounded-full mb-4 shadow-md">Wagging Words</span>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Pet Care Blog & Resources</h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">Discover expert tips, heartfelt stories, and essential guides to provide the best life for your furry friends.</p>
      </motion.div>

      {loading ? (
        <div className="text-center z-10"><p className="text-lg font-bold animate-pulse text-[#FF8B4D]">Loading articles...</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl z-10">
          {articles.map((article, i) => (
            <motion.div
              key={article._id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-[#FFDE79] flex flex-col overflow-hidden"
            >
              <img src={article.image} alt={article.title} className="w-full h-56 object-cover border-b-4 border-[#FFDE79]" />
              <div className="p-8 flex flex-col h-full w-full">
                <div className="flex gap-2 mb-4">
                  {article.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-[#FF8B4D] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">{tag}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-4 leading-snug">{article.title}</h2>
                <p className="text-gray-500 mb-6 line-clamp-3 font-medium">{article.content}</p>
                
                <div className="mt-auto flex items-center justify-between pt-5 border-t-2 border-dashed border-gray-200 w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF4DBB] flex items-center justify-center text-white font-black text-lg">{article.author.charAt(0)}</div>
                    <span className="text-base font-bold text-[#4b4b4b]">{article.author}</span>
                  </div>
                  <span className="text-sm text-gray-400 font-bold bg-gray-100 px-3 py-1 rounded-full">{article.readTime} min read</span>
                </div>
              </div>
            </motion.div>
          ))}
          {articles.length === 0 && (
             <div className="col-span-full text-center py-12 bg-gray-50 rounded-[3rem] p-8 border-4 border-dashed border-[#FFDE79]">
              <p className="text-2xl font-bold text-gray-400">No articles published yet.</p>
              <p className="mt-2 text-lg text-gray-400">Stay tuned for amazing content from our experts!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
