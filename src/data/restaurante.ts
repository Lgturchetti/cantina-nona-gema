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
  horarios: [
    { dias: "Terça a sexta", horas: "11h30 às 14h30 · 19h às 23h" },
    { dias: "Sábado", horas: "11h30 às 15h · 19h às 23h30" },
    { dias: "Domingo", horas: "11h30 às 15h30" },
    { dias: "Segunda", horas: "Fechado" },
  ],
};

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
