import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdEmail, MdPhone } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="relative z-50 w-full bg-linear-to-t from-[#03605a] via-[#000726] to-[#000726] text-white px-8 sm:px-8 md:px-12 lg:px-14 pb-4 sm:pb-1 md:pb-2 lg:pb-4 pt-8 sm:pt-18 md:pt-22 lg:pt-24 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm sm:text-base">
      
      {/* Social Media Icons */}
      <div className="flex gap-4 sm:gap-6">
        <a 
          href="https://github.com/coolkidwrik" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="GitHub"
          className="text-[#02a5c5] hover:text-[#7b00ff] transition-colors"
        >
          <FaGithub className="text-2xl sm:text-3xl" />
        </a>
        <a 
          href="https://www.linkedin.com/in/wrik-sen/" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="LinkedIn"
          className="text-[#02a5c5] hover:text-[#7b00ff] transition-colors"
        >
          <FaLinkedin className="text-2xl sm:text-3xl" />
        </a>
        <a 
          href="https://ckwrik.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="Portfolio"
          className="text-[#02a5c5] hover:text-[#7b00ff] transition-colors"
        >
          <BsFillPersonLinesFill className="text-2xl sm:text-3xl" />
        </a>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6 text-center sm:text-left">
        <a 
          href="mailto:wriksen2003@gmail.com" 
          className="flex items-center gap-2 hover:text-[#02a5c5] transition-colors"
        >
          <MdEmail className="text-xl sm:text-2xl text-[#02a5c5]" /> 
          wriksen2003@gmail.com
        </a>
        <a 
          href="tel:+16044172072" 
          className="flex items-center gap-2 hover:text-[#02a5c5] transition-colors"
        >
          <MdPhone className="text-xl sm:text-2xl text-[#02a5c5]" /> 
          +1 (604) 417-2072
        </a>
      </div>
    </footer>
  );
}