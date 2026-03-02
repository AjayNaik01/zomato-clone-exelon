// components/Footer.jsx
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa6";

function Footer() {
  const links = {
    Eternal: ["Zomato", "Blinkit", "District", "Hyperpure", "Feeding India", "Investor Relations"],
    "For Restaurants": ["Partner With Us", "Apps For You", "Restaurant Consulting"],
    "For Delivery Partners": ["Partner With Us", "Apps For You"],
    "Learn More": ["Privacy", "Security", "Terms of Service", "Help & Support", "Report a Fraud", "Blog"],
  };

  const socials = [
    { icon: <FaLinkedinIn size={14} />, bg: "bg-blue-700", href: "#" },
    { icon: <FaInstagram size={14} />, bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600", href: "#" },
    { icon: <FaYoutube size={14} />, bg: "bg-red-600", href: "#" },
    { icon: <FaFacebookF size={14} />, bg: "bg-blue-600", href: "#" },
    { icon: <FaXTwitter size={14} />, bg: "bg-gray-900", href: "#" },
  ];

  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-white mb-10 italic">zomato</h1>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="text-white font-semibold text-[14px] mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 text-[13px] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social + App */}
          <div>
            <h3 className="text-white font-semibold text-[14px] mb-4">Social Links</h3>

            {/* Social Icons */}
            <div className="flex gap-2 mb-5">
              {socials.map(({ icon, bg, href }, i) => (
                <a key={i} href={href}
                  className={`w-8 h-8 rounded-full ${bg} text-white flex items-center justify-center hover:opacity-80 transition-opacity`}>
                  {icon}
                </a>
              ))}
            </div>

            {/* App Store */}
            <a href="#"
              className="flex items-center gap-2.5 border border-gray-600 rounded-xl px-3 py-2 mb-2 hover:border-gray-400 transition-colors">
              <FaApple size={22} className="text-white shrink-0" />
              <div>
                <p className="text-gray-400 text-[9px] leading-tight">Download on the</p>
                <p className="text-white text-[12px] font-semibold leading-tight">App Store</p>
              </div>
            </a>

            {/* Google Play */}
            <a href="#"
              className="flex items-center gap-2.5 border border-gray-600 rounded-xl px-3 py-2 hover:border-gray-400 transition-colors">
              <FaGooglePlay size={18} className="text-white shrink-0" />
              <div>
                <p className="text-gray-400 text-[9px] leading-tight">GET IT ON</p>
                <p className="text-white text-[12px] font-semibold leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-[12px] leading-relaxed">
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content
            Policies. All trademarks are properties of their respective owners 2008-2026 © Zomato™ Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;