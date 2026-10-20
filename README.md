# Cantina Nona Gema

Site de um restaurante **fictício** de cozinha da Quarta Colônia, em Santa Maria/RS.
É um projeto de demonstração, feito para portfólio.

<p>
  <img src="prints/desktop-capa.png" alt="Capa do site no desktop" width="68%">
  &nbsp;
  <img src="prints/celular-capa.png" alt="Capa do site no celular" width="26%">
</p>

## O que tem no site

- **Capa** com o selo "Aberto agora / Fechado agora", calculado a partir dos horários
- **Rodízio de galeto** e **cardápio** por categoria, com marcações de vegetariano e sem glúten
- **A cozinha da Nona Gema**, a história da casa
- **Galeria** de fotos em faixa, com setas no desktop e arraste no celular
- **Como chegar**, com horários, mapa (OpenStreetMap) e botões para o Google Maps e o Waze
- Botão **Reservar** que abre o WhatsApp

Todo o conteúdo (cardápio, preços, horários, WhatsApp, endereço) fica num arquivo só:
`src/data/restaurante.ts`. Para trocar um prato ou um horário, basta editar esse arquivo.

## Feito com

- [Next.js](https://nextjs.org) 16, React 19 e TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- Fontes Young Serif e Instrument Sans
- Fotos do [Pexels](https://www.pexels.com), com os créditos em `src/fotos/CREDITOS.md`

Cuidados de acabamento:

- Pensado primeiro para o celular: respeita o notch (safe area) e corrige a altura da tela
- Animações curtas, que desligam quando o sistema pede menos movimento
- Testado com dados extremos (nomes longos, listas vazias, turno que passa da meia-noite)

## Rodar na sua máquina

Precisa do Node 20 ou mais novo.

```bash
npm install
npm run dev
```

Depois, abra http://localhost:3000.

## Prints

<details>
<summary>Página inteira no celular</summary>

<img src="prints/celular-inteira.png" alt="Página inteira no celular" width="390">
</details>

<details>
<summary>Página inteira no desktop</summary>

<img src="prints/desktop-inteira.png" alt="Página inteira no desktop">
</details>

<details>
<summary>Como chegar (com o mapa)</summary>

<img src="prints/desktop-como-chegar.png" alt="Seção Como chegar no desktop">
<img src="prints/celular-como-chegar.png" alt="Seção Como chegar no celular" width="390">
</details>

---

Desenvolvido por Lorenzo.
