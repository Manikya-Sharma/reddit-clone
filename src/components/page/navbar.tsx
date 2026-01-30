import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/client/routes";
import NavOptions from "./nav-options";
import SearchBar from "./search-bar";
import WithTooltip from "./with-tooltip";

export default function Navbar() {
  return (
    <nav className="bg-inherit fixed inset-x-0 h-14 border-b border-neutral-700 text-neutral-200 flex items-center px-4 isolate z-10">
      <WithTooltip tooltipText="Go to Reddit Home" side="right">
        <Link href={Routes.HOMEPAGE}>
          <Image
            src="/logo.svg"
            width={76}
            height={22}
            alt="Reddit Logo"
            className="text-white"
          />
        </Link>
      </WithTooltip>
      <div role="presentation" className="grow shrink"></div>
      <SearchBar />
      <div role="presentation" className="grow shrink"></div>
      <NavOptions />
    </nav>
  );
}
