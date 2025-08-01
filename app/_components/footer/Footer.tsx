"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="relative">
      <footer className="bg-[#0f172a] text-white py-20 px-6 z-10 relative shadow-inner">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-primary text-transparent bg-clip-text">
            Portfolium
          </h1>

          <p className="text-gray-400 text-lg">
            Show the world what you’re made of.
          </p>

          <div className="flex justify-center flex-wrap gap-6 text-sm">
            {["About", "Blogs", "Templates", "Pricing", "Terms", "Contact"].map(
              (item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  {item}
                </a>
              )
            )}
          </div>

          <div className="flex justify-center gap-6 text-xl">
            {["facebook-f", "x-twitter", "instagram", "linkedin-in"].map(
              (icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-500 hover:text-white transition duration-300 hover:scale-110"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              )
            )}
          </div>

          <p className="text-xs text-gray-500">
            &copy; 2025 Portfolium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
