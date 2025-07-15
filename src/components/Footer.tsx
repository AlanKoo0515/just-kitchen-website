import Image from "next/image";
import { FaMapPin, FaPhoneAlt, FaAt, FaRegClock } from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    icon: (
      <Image
        src="/socialMedia/facebook.svg"
        alt="Facebook"
        width={24}
        height={24}
      />
    ),
    href: "#",
  },
  {
    name: "Instagram",
    icon: (
      <Image
        src="/socialMedia/instagram.svg"
        alt="Instagram"
        width={24}
        height={24}
      />
    ),
    href: "#",
  },
  {
    name: "WhatsApp",
    icon: (
      <Image
        src="/socialMedia/whatsapp.svg"
        alt="WhatsApp"
        width={24}
        height={24}
      />
    ),
    href: "#",
  },
  {
    name: "Gmail",
    icon: (
      <Image src="/socialMedia/google.svg" alt="Gmail" width={24} height={24} />
    ),
    href: "#",
  },
];

const footerLinks = [
  "ABOUT US",
  "CONTACT US",
  "HELP",
  "PRIVACY POLICY",
  "DISCLAIMER",
];

const iconClass = "mr-2";
const iconSize = 20;

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-300 h-[1px]"></div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-[160px] items-start mb-8">
          <div className="flex flex-col pl-[150px] items-center md:items-start">
            <Image
              src="/logo.jpg"
              alt="Just Kitchen & Bath Logo"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
          <div className="text-center md:text-left text-sm text-gray-700 pr-[150px]">
            <div className="mb-4 flex items-center gap-2">
              <FaMapPin className="text-2xl mr-3" />
              <span>
                3, Jalan Perniagaan Santuari, <br />
                Pusat Perniagaan Santuari, <br />
                14000 Bukit Mertajam, Pulau Pinang
              </span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <FaPhoneAlt className={iconClass} size={iconSize} />
              <span>+60 12-441 4202</span>
              <FaAt className={iconClass + " ml-4"} size={iconSize} />
              <span>admin@justkitchenbath.com</span>
            </div>
            <div className="mb-6 flex items-center gap-2">
              <FaRegClock className={iconClass} size={iconSize} />
              <span>Open every day: 10am - 7pm</span>
            </div>
            <div className="flex gap-4 justify-center md:justify-start mt-4 items-center">
              <span className="text-sm text-gray-500">Social Media</span>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl transition-transform hover:scale-125"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between items-center gap-6 pt-6 pl-[150px]">
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-gray-500 hover:text-[#a52a2a]"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="text-xs text-gray-400 pr-[150px]">
            Copyright © 2023 - Just Kitchen & Bath (202401031387)
          </div>
        </div>
      </div>
    </footer>
  );
}
