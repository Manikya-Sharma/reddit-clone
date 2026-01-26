import Image from "next/image";
import Link from "next/link";
import SearchBar from "./search-bar";
import WithTooltip from "./with-tooltip";

export default function Navbar() {
  return (
    <nav className="bg-inherit h-14 border-b border-neutral-700 text-neutral-200 flex items-center px-4 isolate">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={76}
          height={22}
          alt="Reddit Logo"
          className="text-white"
        />
      </Link>
      <div role="presentation" className="grow shrink"></div>
      <SearchBar />
      <div role="presentation" className="grow shrink"></div>
      <div className="flex items-center">
        <NavButton tooltipText="Advertise on Reddit">
          <Image src="/icons/ads-icon.svg" width={20} height={20} alt="" />
        </NavButton>
        <NavButton tooltipText="Open chat">
          <Image src="/icons/chat-icon.svg" width={20} height={20} alt="" />
        </NavButton>
        <NavButton tooltipText="Create post">
          <div className="flex gap-2">
            <Image src="/icons/chat-icon.svg" width={20} height={20} alt="" />
            <span className="text-sm">Create</span>
          </div>
        </NavButton>
        <NavButton tooltipText="Open inbox">
          <Image src="/icons/inbox-icon.svg" width={20} height={20} alt="" />
        </NavButton>
        <NavButton tooltipText="Open profile menu">
          <div className="size-6 flex items-center justify-center rounded-full">
            M
          </div>
        </NavButton>
      </div>
    </nav>
  );
}

function NavButton({
  children,
  tooltipText,
}: {
  children: React.ReactNode;
  tooltipText: string;
}) {
  return (
    <WithTooltip tooltipText={tooltipText}>
      <div className="px-3 py-2.5 hover:bg-neutral-700 rounded-full transition-colors cursor-pointer">
        {children}
      </div>
    </WithTooltip>
  );
}
