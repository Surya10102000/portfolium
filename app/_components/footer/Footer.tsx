"use client";

import { motion } from "framer-motion";
import React from "react";

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  return (
    <div className="relative mt-32">
      <footer className="bg-[#0f172a] text-white py-20 px-6 z-10 relative shadow-inner">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.h1
            custom={0}
            variants={footerVariants}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            Portfolium
          </motion.h1>

          <motion.p
            custom={1}
            variants={footerVariants}
            initial="hidden"
            animate="show"
            className="text-gray-400 text-lg"
          >
            Show the world what you’re made of.
          </motion.p>

          <motion.div
            custom={2}
            variants={footerVariants}
            initial="hidden"
            animate="show"
            className="flex justify-center flex-wrap gap-6 text-sm"
          >
            {["About", "Blogs", "Templates", "Pricing", "Terms", "Contact"].map(
              (item, i) => (
                <motion.a
                  whileHover={{ scale: 1.1, color: "#fff" }}
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  {item}
                </motion.a>
              )
            )}
          </motion.div>

          <motion.div
            custom={3}
            variants={footerVariants}
            initial="hidden"
            animate="show"
            className="flex justify-center gap-6 text-xl"
          >
            {["facebook-f", "x-twitter", "instagram", "linkedin-in"].map(
              (icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-500 hover:text-white transition duration-300"
                >
                  <i className={`fab fa-${icon}`}></i>
                </motion.a>
              )
            )}
          </motion.div>

          <motion.p
            custom={4}
            variants={footerVariants}
            initial="hidden"
            animate="show"
            className="text-xs text-gray-500"
          >
            &copy; 2025 Portfolium. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
