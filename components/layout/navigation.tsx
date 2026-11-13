"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#capabilities", label: "Expertise" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  function close() {
    dialog.current?.close();
    setOpen(false);
    toggle.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 900px)");
    const resize = () => {
      if (media.matches) {
        dialog.current?.close();
        setOpen(false);
      }
    };
    media.addEventListener("change", resize);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header container">
      <nav className="nav-bar" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Benita Idachaba home">
          bi<span aria-hidden="true">.</span>
        </Link>
        <div className="desktop-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <Link
            className="nav-resume"
            href="/resume"
            aria-current={pathname === "/resume" ? "page" : undefined}
          >
            View Resume <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            className="icon-button menu-toggle"
            type="button"
            ref={toggle}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu aria-hidden="true" size={22} />
          </button>
        </div>
      </nav>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Navigation"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <span className="wordmark">bi.</span>
          <button
            autoFocus
            className="icon-button"
            aria-label="Close navigation"
            onClick={close}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <p className="eyebrow">Explore the portfolio</p>
        <div className="mobile-links">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={close}>
              {link.label}
              <ArrowUpRight aria-hidden="true" size={24} />
            </Link>
          ))}
          <Link href="/resume" onClick={close}>
            View Resume
            <ArrowUpRight aria-hidden="true" size={24} />
          </Link>
        </div>
        <p className="mobile-menu-note">
          Benita Idachaba · Data Analyst
          <br />
          Abuja, Nigeria
        </p>
      </dialog>
    </header>
  );
}
