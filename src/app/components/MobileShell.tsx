"use client";

import {useSyncExternalStore, type ReactNode} from "react";

/**
 * useIsMobile
 * true pe ecrane mai înguste de `breakpoint` (implicit 768px, ca md: din Tailwind).
 * Pe server returnează false, apoi se corectează imediat în browser.
 *
 *   const isMobile = useIsMobile();
 *   return isMobile ? <VersiuneTelefon /> : <VersiuneDesktop />;
 */
export function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint - 1}px)`;
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * MobileShell
 * Învelește aplicația și repară problemele frecvente pe telefon:
 *  - înălțimea ecranului (100vh taie conținutul sub bara browserului → 100dvh)
 *  - scroll orizontal accidental
 *  - zoom automat pe iPhone când atingi un câmp de text
 *  - butoane prea mici pentru deget (minim 44px, doar pe ecrane tactile)
 *  - întârzierea la atingere și evidențierea gri la tap
 *  - imagini/video care ies din ecran
 *
 * Regulile sunt scrise cu :where(...) (prioritate zero), deci clasele tale
 * Tailwind le înlocuiesc oricând unde ai nevoie de altceva.
 *
 * Utilizare în src/app/layout.tsx:
 *
 *   import MobileShell from "./components/MobileShell";
 *   ...
 *   <body>
 *     <MobileShell>{children}</MobileShell>
 *   </body>
 *
 * și, în același fișier, adaugă (fără să blochezi zoom-ul, e important pentru accesibilitate):
 *
 *   import type { Viewport } from "next";
 *   export const viewport: Viewport = {
 *     width: "device-width",
 *     initialScale: 1,
 *   };
 */
export default function MobileShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mshell ${className ?? ""}`}>
      <style>{css}</style>
      {children}
    </div>
  );
}

const css = `
.mshell {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: clip;
  overflow-wrap: break-word;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Tailwind h-screen / min-h-screen folosesc 100vh; pe telefon trebuie 100dvh */
.mshell .h-screen { height: 100vh; height: 100dvh; }
.mshell .min-h-screen { min-height: 100vh; min-height: 100dvh; }
.mshell .max-h-screen { max-height: 100vh; max-height: 100dvh; }

:where(.mshell) :where(img, video) { max-width: 100%; }

/* Doar pe dispozitive tactile (telefon/tabletă) */
@media (pointer: coarse) {
  /* sub 16px, iPhone mărește singur pagina la focus pe un câmp */
  .mshell input, .mshell select, .mshell textarea { font-size: 16px !important; }

  /* ținte tactile de minim 44px */
  :where(.mshell) :where(button, [role="button"], select, summary) { min-height: 44px; }
  :where(.mshell) :where(input[type="range"]) { min-height: 44px; }
  :where(.mshell) :where(input[type="checkbox"], input[type="radio"]) { min-width: 22px; min-height: 22px; }
}
`;