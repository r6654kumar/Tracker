import React, { useEffect } from "react";
import { motion } from "framer-motion";

const BeautifulMessage = () => {
  useEffect(() => {
    fetch("https://rahul-tracker.onrender.com/")
      .then((response) => response.text())
      .then((data) => console.log("API called successfully", data))
      .catch((error) => console.error("Error calling API", error));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">A Beautiful Message for You</h1>
        <p className="text-lg text-gray-600 italic">Server busy, please try again later</p>
      </motion.div>
    </div>
  );
};

export default BeautifulMessage;