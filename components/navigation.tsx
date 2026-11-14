"use client";

import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }}>
    <div className="nav-shell">
      <a className="brand" href="/" onClick={() => setOpen(false)} aria-label="Arthur Alves, página inicial"><span className="brand-symbol" aria-hidden="true">a.</span><span><strong>arthur alves</strong><small>PORTFÓLIO</small></span></a>
      <button className="menu-button" ref={toggle} aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="main-nav" aria-label="Navegação principal" className={open ? "main-nav is-open" : "main-nav"}>
        <a href="/projetos" onClick={() => setOpen(false)} aria-current={path.startsWith("/projetos") ? "page" : undefined}>Projetos</a>
        <a href="/#sobre" onClick={() => setOpen(false)}>Sobre mim</a>
        <a href="/#curriculo" onClick={() => setOpen(false)}>Currículo</a>
        <a className="nav-contact" href="/#contato" onClick={() => setOpen(false)}>Contato <ArrowUpRight size={15} /></a>
      </nav>
    </div>
  </header>;
}
