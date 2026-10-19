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
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain focus-visible:-outline-offset-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

      {/* Setas flutuando sobre as fotos, uma de cada lado. Só para quem tem mouse. */}
      <Seta lado="esquerda" rotulo="Fotos anteriores" escondida={inicio} onClick={() => rolar(-1)} />
      <Seta lado="direita" rotulo="Próximas fotos" escondida={fim} onClick={() => rolar(1)} />
    </div>
  );
}

function Seta({
  lado,
  rotulo,
  escondida,
  onClick,
}: {
  lado: "esquerda" | "direita";
  rotulo: string;
  escondida: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={rotulo}
      disabled={escondida}
      onClick={onClick}
      className={`pressable absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cal/90 text-basalto shadow-[0_2px_8px_rgb(38_37_35/0.25)] backdrop-blur-sm hover:bg-cal disabled:pointer-events-none disabled:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:grid ${
        lado === "esquerda" ? "left-4 md:left-6" : "right-4 md:right-6"
      }`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
        <path d={lado === "esquerda" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
