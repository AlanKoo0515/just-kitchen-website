import Image from "next/image";

const socialLinks = [
  { name: "Facebook", icon: "/social/facebook.svg", href: "#" },
  { name: "Instagram", icon: "/social/instagram.svg", href: "#" },
  { name: "WhatsApp", icon: "/social/whatsapp.svg", href: "#" },
  { name: "Gmail", icon: "/social/gmail.svg", href: "#" },
];

const footerLinks = [
  "ABOUT US",
  "CONTACT US",
  "HELP",
  "PRIVACY POLICY",
  "DISCLAIMER",
];

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logo.svg"
            alt="Just Kitchen & Bath Logo"
            width={80}
            height={80}
            className="mb-4"
          />
        </div>
        <div className="text-center md:text-left text-sm text-gray-700">
          <div className="mb-2">
            <span className="font-semibold">
              3, Jalan Perniagaan Santuari, Pusat Perniagaan Santuari, 14000
              Bukit Mertajam, Pulau Pinang
            </span>
          </div>
          <div className="mb-2">
            +60 12-441 4202 &nbsp; | &nbsp; admin@justkitchenbath.com
          </div>
          <div className="mb-2">Open every day: 10am - 7pm</div>
          <div className="flex gap-3 justify-center md:justify-start mt-2">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={s.icon} alt={s.name} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
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
      </div>
      <div className="text-center text-xs text-gray-400 py-4 border-t">
        Copyright © 2023 - Just Kitchen & Bath (202401031387)
      </div>
    </footer>
  );
}
