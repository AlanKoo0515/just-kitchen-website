import Image from "next/image";
import { FaPhoneAlt, FaAt, FaClock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

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
      <Image
        src="/socialMedia/google.svg"
        alt="Gmail"
        width={24}
        height={24}
        className="text-white"
      />
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
      <div className="bg-[#811200] mx-auto px-[150px] py-10">
        <div className="grid md:grid-cols-2 gap-[550px] items-start mb-8">
          <div className="flex flex-col pl-[150px] items-center md:items-start">
            <Image
              src="/logo.jpg"
              alt="Just Kitchen & Bath Logo"
              width={200}
              height={200}
              className="mb-4"
            />
          </div>
          <div className="text-center md:text-left text-sm text-gray-700">
            <div className="mb-4 flex gap-2">
              <MdLocationPin className="text-2xl mr-3 mt-1 justify-start text-white" />
              <span className="text-white">
                3, Jalan Perniagaan Santuari, <br />
                Pusat Perniagaan Santuari, <br />
                14000 Bukit Mertajam, Pulau Pinang
              </span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <FaPhoneAlt className={iconClass} size={iconSize} />
              <span>+60 12-441 4202</span>
              <FaAt className={iconClass + " ml-4"} size={iconSize} />
              <span>admin@justkitchenbath.com</span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-white">
              <FaClock className={iconClass} size={iconSize} />
              <span>Open every day: 10am - 7pm</span>
            </div>
            <div className="flex gap-4 justify-center md:justify-start mt-4 items-center">
              <span className="text-sm text-white">Social Media</span>
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
        <div className="flex flex-wrap justify-between items-center gap-6 pl-[150px]">
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-white hover:cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="text-xs text-white pr-[150px]">
            Copyright © 2023 - Just Kitchen & Bath (202401031387)
          </div>
        </div>
      </div>
    </footer>
  );
}
