"use client";

import { useSyncExternalStore } from "react";
import { diasSemana, formatarHora, funcionamento, nomeDia } from "@/data/restaurante";

// Selo "Aberto agora · fecha às 14h30", calculado no navegador pelo horário de Brasília
// (vale mesmo se o visitante estiver em outro fuso). No servidor não renderiza nada.

type Status = { aberto: boolean; texto: string };

export function calcularStatus(agora = new Date()): Status {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(agora);
  const pega = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const hoje = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(pega("weekday"));
  const h = Number(pega("hour")) + Number(pega("minute")) / 60;
  const turnosDe = (i: number) => funcionamento[diasSemana[i % 7]];

  const atual = turnosDe(hoje).find(([a, f]) => h >= a && h < f);
  if (atual) return { aberto: true, texto: `Aberto agora · fecha às ${formatarHora(atual[1])}` };

  const maisTarde = turnosDe(hoje).find(([a]) => a > h);
  if (maisTarde) return { aberto: false, texto: `Fechado agora · abre hoje às ${formatarHora(maisTarde[0])}` };

  for (let i = 1; i <= 7; i++) {
    const turnos = turnosDe(hoje + i);
    if (turnos.length) {
      const quando = i === 1 ? "amanhã" : nomeDia[diasSemana[(hoje + i) % 7]];
      return { aberto: false, texto: `Fechado agora · abre ${quando} às ${formatarHora(turnos[0][0])}` };
    }
  }
  return { aberto: false, texto: "Fechado" };
}

// Reavalia a cada minuto; devolve o mesmo objeto enquanto o texto não muda.
let cache: Status | null = null;
function ler() {
  const novo = calcularStatus();
  if (!cache || cache.texto !== novo.texto) cache = novo;
  return cache;
}
function assinar(avisar: () => void) {
  const id = setInterval(avisar, 60_000);
  return () => clearInterval(id);
}

export function StatusAgora() {
  const status = useSyncExternalStore(assinar, ler, () => null);
  return (
    <p className="flex min-h-6 items-center gap-2 text-sm" aria-live="polite">
      {status && (
        <>
          <span aria-hidden className={`size-2 rounded-full ${status.aberto ? "bg-[#3f8f55]" : "bg-basalto/40"}`} />
          <span className="surge">{status.texto}</span>
        </>
      )}
    </p>
  );
}
