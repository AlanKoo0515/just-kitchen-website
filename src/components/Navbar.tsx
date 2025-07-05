import Image from "next/image";

const navLinks = [
  { name: "Bathroom Accessories", href: "#" },
  { name: "Kitchen Accessories", href: "#" },
  { name: "Smart Home", href: "#" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-center px-4 py-3">
        <div className="flex items-center gap-3 pr-10">
          <Image
            src="/logo.jpg"
            alt="Just Kitchen & Bath Logo"
            width={48}
            height={48}
            className="rounded"
          />
          <span className="font-bold text-lg tracking-tight text-[#811200]">
            Just Kitchen & Bath
          </span>
        </div>
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-[#a52a2a] transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
