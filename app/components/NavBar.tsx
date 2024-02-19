"use client";

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";

const links = [
  { title: "Home", link: "/" },
  { title: "Issues", link: "/issues"},
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row items-center space-x-10 h-20 border-b-2 border-zinc-200 mb-4">
      <Link href="/"><FaBug/></Link>
      {
        links.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            // className="text-zinc-500 hover:text-zinc-900 hover:font-medium transition-colors"
            className={`${pathname === item.link ? "text-zinc-900 font-medium" : "text-zinc-500"} hover:text-zinc-500 hover:font-medium transition-colors`}
          >
            {item.title}
          </Link>
        ))
      }
    </nav>
  )
}