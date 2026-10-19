"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Foto } from "@/data/restaurante";

// Faixa de fotos com rolagem nativa + snap (a física do navegador é melhor que um carrossel feito à mão).
// Ocupa a tela toda, de borda a borda. Setas só aparecem em quem tem mouse; no celular é o dedo.

export function Galeria({ fotos }: { fotos: Foto[] }) {
  const trilho = useRef<HTMLUListElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  function atualizar() {
    const el = trilho.current;
    if (!el) return;
    setInicio(el.scrollLeft < 8);
    setFim(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }

  function rolar(direcao: 1 | -1) {
    const el = trilho.current;
    if (!el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direcao * el.clientWidth * 0.75, behavior: reduzir ? "auto" : "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={trilho}
        onScroll={atualizar}
        tabIndex={0}
        aria-label="Fotos da cantina (role para o lado)"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((foto) => (
          <li key={foto.legenda} className="shrink-0 snap-start">
            <figure className="relative">
              <Image
                src={foto.src}
                alt={foto.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 560px, 85vw"
                className="h-72 w-auto max-w-[85vw] object-cover md:h-[26rem]"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-basalto/65 px-3 py-1 text-xs text-cal backdrop-blur-sm">
                {foto.legenda}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-4 hidden max-w-6xl justify-end gap-2 px-4 [@media(hover:hover)_and_(pointer:fine)]:flex">
        <Seta rotulo="Fotos anteriores" desativada={inicio} onClick={() => rolar(-1)}>
          ←
        </Seta>
        <Seta rotulo="Próximas fotos" desativada={fim} onClick={() => rolar(1)}>
          →
        </Seta>
      </div>
    </div>
  );
}

function Seta({
  rotulo,
  desativada,
  onClick,
  children,
}: {
  rotulo: string;
  desativada: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={rotulo}
      disabled={desativada}
      onClick={onClick}
      className="pressable grid size-11 place-items-center rounded-full border border-basalto/20 text-lg transition-opacity hover:bg-basalto/5 disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
