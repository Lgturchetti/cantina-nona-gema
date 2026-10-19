// Restaurante FICTÍCIO — projeto de demonstração/portfólio.
// Na etapa 2 estes dados passam a vir do Supabase (painel do dono).

export type Selo = "vegetariano" | "sem glúten";

export type Prato = {
  nome: string;
  descricao: string;
  preco: number;
  selos?: Selo[];
};

export type Categoria = {
  id: string;
  nome: string;
  pratos: Prato[];
};

export const restaurante = {
  nome: "Cantina Nona Gema",
  descricao:
    "Galeto al primo canto, massa feita à mão e polenta brustolada, do jeito da Quarta Colônia. No centro de Santa Maria.",
  endereco: "Rua Fictícia, 123 — Centro, Santa Maria/RS",
  whatsapp: "5555900000000", // número de exemplo
};

// Horário de funcionamento (horário de Brasília). Uma lista de turnos por dia da semana;
// horas em decimal: 11.5 = 11h30. Dia sem turnos = fechado.
// É daqui que saem a tabela do "Como chegar" e o selo "Aberto agora".
export type Turno = [abre: number, fecha: number];

// Ordem do Date.getDay(): 0 = domingo.
export const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"] as const;
export type DiaSemana = (typeof diasSemana)[number];

export const funcionamento: Record<DiaSemana, Turno[]> = {
  domingo: [[11.5, 15.5]],
  segunda: [],
  terca: [[11.5, 14.5], [19, 23]],
  quarta: [[11.5, 14.5], [19, 23]],
  quinta: [[11.5, 14.5], [19, 23]],
  sexta: [[11.5, 14.5], [19, 23]],
  sabado: [[11.5, 15], [19, 23.5]],
};

export const nomeDia: Record<DiaSemana, string> = {
  domingo: "domingo",
  segunda: "segunda",
  terca: "terça",
  quarta: "quarta",
  quinta: "quinta",
  sexta: "sexta",
  sabado: "sábado",
};

export function formatarHora(h: number) {
  const min = Math.round((h % 1) * 60);
  return `${Math.floor(h)}h${min ? String(min).padStart(2, "0") : ""}`;
}

// Tabela para exibir: junta dias seguidos com o mesmo horário ("Terça a sexta").
// Começa na terça porque a casa fecha na segunda.
export function horariosParaExibir() {
  const ordem: DiaSemana[] = ["terca", "quarta", "quinta", "sexta", "sabado", "domingo", "segunda"];
  const chave = (d: DiaSemana) => JSON.stringify(funcionamento[d]);
  const grupos: DiaSemana[][] = [];
  for (const dia of ordem) {
    const ultimo = grupos.at(-1);
    if (ultimo && chave(ultimo[0]) === chave(dia)) ultimo.push(dia);
    else grupos.push([dia]);
  }
  const maiuscula = (s: string) => s[0].toUpperCase() + s.slice(1);
  return grupos.map((g) => {
    const primeiro = nomeDia[g[0]];
    const ultimo = nomeDia[g[g.length - 1]];
    const turnos = funcionamento[g[0]];
    return {
      dias: maiuscula(g.length === 1 ? primeiro : `${primeiro} ${g.length === 2 ? "e" : "a"} ${ultimo}`),
      horas: turnos.length
        ? turnos.map(([a, f]) => `${formatarHora(a)} às ${formatarHora(f)}`).join(" · ")
        : "Fechado",
    };
  });
}

export const rodizio = {
  preco: 79.9,
  itens: [
    "Galeto al primo canto",
    "Sopa de agnolini",
    "Polenta frita e brustolada",
    "Massa caseira ao sugo",
    "Radicci com bacon",
    "Maionese da nona",
    "Salada de batata com ovos",
  ],
};

export const cardapio: Categoria[] = [
  {
    id: "entradas",
    nome: "Entradas",
    pratos: [
      { nome: "Sopa de agnolini", descricao: "Agnolini recheado de frango no caldo de galinha caipira.", preco: 24 },
      { nome: "Polenta brustolada", descricao: "Na chapa, com queijo colonial derretido.", preco: 28, selos: ["vegetariano", "sem glúten"] },
      { nome: "Tábua colonial", descricao: "Salame, copa e queijo colonial da Quarta Colônia, com pão de casa.", preco: 39 },
      { nome: "Radicci refogado", descricao: "Radicci murcho no bacon e alho.", preco: 22, selos: ["sem glúten"] },
    ],
  },
  {
    id: "massas",
    nome: "Massas",
    pratos: [
      { nome: "Tortéi de moranga", descricao: "Na manteiga com sálvia e parmesão.", preco: 58, selos: ["vegetariano"] },
      { nome: "Talharim ao ragu de costela", descricao: "Massa aberta na hora, ragu cozido por seis horas.", preco: 62 },
      { nome: "Capeletti in brodo", descricao: "Capeletti de carne no caldo, como no domingo da nona.", preco: 49 },
      { nome: "Nhoque de batata", descricao: "Ao sugo de tomate com manjericão.", preco: 52, selos: ["vegetariano"] },
    ],
  },
  {
    id: "carnes",
    nome: "Carnes",
    pratos: [
      { nome: "Galeto al primo canto", descricao: "Inteiro, marinado no vinho branco e sálvia, assado na brasa.", preco: 69, selos: ["sem glúten"] },
      { nome: "Costela fogo de chão", descricao: "Só aos sábados. Doze horas no fogo de chão.", preco: 89, selos: ["sem glúten"] },
      { nome: "Bife à milanesa", descricao: "Com polenta frita e salada de radicci.", preco: 64 },
    ],
  },
  {
    id: "sobremesas",
    nome: "Sobremesas",
    pratos: [
      { nome: "Sagu de vinho", descricao: "Com creme de baunilha.", preco: 18, selos: ["sem glúten"] },
      { nome: "Cuca de uva", descricao: "Fatia morna, farofa de manteiga.", preco: 16, selos: ["vegetariano"] },
      { nome: "Pudim de leite", descricao: "Receita da casa, sem furinhos.", preco: 17, selos: ["vegetariano", "sem glúten"] },
    ],
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    pratos: [
      { nome: "Vinho colonial tinto", descricao: "Taça R$ 16 · garrafa R$ 58.", preco: 16 },
      { nome: "Suco de uva integral", descricao: "Da serra, sem açúcar.", preco: 12 },
      { nome: "Graspa da casa", descricao: "Dose.", preco: 14 },
      { nome: "Refrigerante", descricao: "Lata.", preco: 8 },
    ],
  },
];

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${restaurante.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
