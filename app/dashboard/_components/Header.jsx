"use client";
import { UserButton } from "@clerk/nextjs";
import { HelpCircle, Home, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    // { href: "/dashboard/questions", label: "Questions", icon: <ListTodo size={20} /> },
    { href: "/dashboard/upgrade", label: "Upgrade", icon: <Rocket size={20} /> },
    { href: "/dashboard/how", label: "How it Works?", icon: <HelpCircle size={20} /> },
  ];

  return (
    <>
      {/* Top Header */}
      <div className="flex px-4 py-2 items-center justify-between bg-secondary shadow-sm min-h-[66px]">
        <Link href="/">
          <Image src={"/logo.png"} width={160} height={40} alt="AI-MockMate Logo" className="cursor-pointer max-h-[66px] w-auto object-contain" />
        </Link>

        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-primary hover:font-bold transition-all ${
                  path === link.href ? "text-primary font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <UserButton />
      </div>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 flex justify-around py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-xs ${
              path === link.href ? "text-primary font-bold" : "text-gray-500"
            }`}
          >
            {link.icon}
            <span>{link.label.split(" ")[0]}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Header;
