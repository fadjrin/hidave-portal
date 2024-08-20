"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkNav({ href, icon, children }) {
  const path = usePathname();
  return (
    <Link
      className={path.startsWith(href) ? "nav-link active" : "nav-link"}
      href={href}
    >
      <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
        <img className="mx-auto" src={icon} width="32" />
      </div>
      <span className="nav-link-text ms-1">{children}</span>
    </Link>
  );
}
