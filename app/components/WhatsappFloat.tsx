// components/SocialFloat.tsx

"use client";

import React from "react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { waLink, WA_MESSAGES } from "../lib/constants";

const SocialFloat = () => {
  return (
    <div className="fixed top-1/2 right-6 z-50 flex flex-col gap-4">

      {/* WhatsApp */}
      <a
        href={waLink(WA_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="group text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <FaWhatsapp
          size={28}
          className="group-hover:rotate-6 transition-transform duration-300"
        />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/c3v_solutions/"
        target="_blank"
        rel="noopener noreferrer"
        className="group  text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <FaInstagram
          size={28}
          className="group-hover:rotate-6 transition-transform duration-300"
        />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/c3v-solutions-04a359411/"
        target="_blank"
        rel="noopener noreferrer"
        className="group  text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <FaLinkedinIn
          size={28}
          className="group-hover:rotate-6 transition-transform duration-300"
        />
      </a>
    </div>
  );
};

export default SocialFloat;