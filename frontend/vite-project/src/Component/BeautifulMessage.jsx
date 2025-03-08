import React, {useState,useEffect } from "react";
import { motion } from "framer-motion";

const BeautifulMessage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://rahul-tracker.onrender.com/")
      .then((response) => response.text())
      .then((data) => {
        console.log("API called successfully", data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error calling API", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">ERROR</h1>
          <p className="text-lg text-gray-600 italic">Server busy, please try agian later.</p>
        </motion.div>
      )}
    </div>
  );
};

export default BeautifulMessage;
