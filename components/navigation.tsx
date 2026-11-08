"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X, LockKeyhole } from "lucide-react";

const links = [
  { href: "/", label: "Conheça Arthur" },
  { href: "/projetos", label: "Projetos" },
  { href: "/academia", label: "Academia" },
  { href: "/laboratorio", label: "Laboratório" },
];
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link
          className="brand"
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Arthur Guedes, página inicial"
        >
          <span className="brand-symbol" aria-hidden="true">
            a<span>.</span>
          </span>
          <span>
            <strong>arthur guedes</strong>
            <small>AI BUILDER JOURNEY</small>
          </span>
        </Link>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          aria-label="Navegação principal"
          className={open ? "main-nav is-open" : "main-nav"}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={
                (link.href === "/" ? path === "/" : path.startsWith(link.href))
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/evolucao"
            className="journey-link"
            onClick={() => setOpen(false)}
          >
            <LockKeyhole size={14} /> Minha jornada <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
