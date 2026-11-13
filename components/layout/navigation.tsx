"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { BrandMark } from "./brand";

const items = [
  { id: "projects", label: "Work" },
  { id: "resume", label: "Resume" },
  { id: "systems", label: "Systems" },
  { id: "capabilities", label: "Expertise" },
  { id: "contact", label: "Contact" },
] as const;

export function Navigation({
  pdfUrl,
  filename,
}: {
  pdfUrl: string;
  filename: string;
}) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const visible = new Set<string>();
    let observer: IntersectionObserver;
    let resizeFrame = 0;
    function observe() {
      observer?.disconnect();
      visible.clear();
      const top =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-offset",
          ),
        ) || 112;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const current = [...items]
            .reverse()
            .find((item) => visible.has(item.id));
          if (current)
            setSection((previous) =>
              previous === current.id ? previous : current.id,
            );
          else if (visible.has("hero")) setSection(null);
        },
        {
          rootMargin: `-${top}px 0px -${Math.round(window.innerHeight * 0.55)}px 0px`,
          threshold: 0,
        },
      );
      for (const id of ["hero", ...items.map((item) => item.id)]) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    }
    const resize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(observe);
    };
    observe();
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", resize);
    };
  }, [pathname]);

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = [
      ...event.currentTarget.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      ),
    ].filter((element) => element.getClientRects().length > 0);
    const first = controls[0],
      last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

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

  function link(item: (typeof items)[number], mobile = false) {
    const href =
      pathname !== "/" && item.id === "resume"
        ? "/resume"
        : pathname.startsWith("/projects") && item.id === "projects"
          ? "/projects"
          : `/#${item.id}`;
    const active =
      pathname === "/"
        ? section === item.id
        : item.id === "resume"
          ? pathname === "/resume"
          : item.id === "projects" && pathname.startsWith("/projects");
    return (
      <Link
        key={item.id}
        href={href}
        className="navigation-link"
        data-active={active || undefined}
        aria-current={
          active
            ? pathname === "/"
              ? "location"
              : pathname === href
                ? "page"
                : undefined
            : undefined
        }
        onClick={() => {
          if (pathname === "/") setSection(item.id);
          if (mobile) close();
        }}
      >
        {item.label}
        {mobile && <ArrowUpRight aria-hidden="true" size={24} />}
      </Link>
    );
  }

  return (
    <header className="site-header container">
      <nav className="nav-bar" aria-label="Main navigation">
        <Link
          className="wordmark"
          href="/"
          aria-label="BI — Benita Idachaba home"
        >
          <BrandMark />
        </Link>
        <div className="desktop-links">{items.map((item) => link(item))}</div>
        <div className="nav-actions">
          <a className="nav-resume" href={pdfUrl} download={filename}>
            Download Resume
            <Download size={16} aria-hidden="true" />
          </a>
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
        onKeyDown={trapFocus}
        onClose={() => {
          setOpen(false);
          toggle.current?.focus({ preventScroll: true });
        }}
      >
        <div className="mobile-menu-top">
          <Link
            href="/"
            onClick={close}
            className="wordmark"
            aria-label="BI — Benita Idachaba home"
          >
            <BrandMark />
          </Link>
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
          {items.map((item) => link(item, true))}
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
