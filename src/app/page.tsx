import {
  cardapio,
  formatarPreco,
  linkWhatsApp,
  restaurante,
  rodizio,
} from "@/data/restaurante";

// Esqueleto da página. A capa (hero) será escolhida via /prototype.
// Fotos: blocos de cor até escolhermos as imagens do Unsplash/Pexels.

const reservar = linkWhatsApp(
  `Olá! Quero reservar uma mesa na ${restaurante.nome}.`,
);

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-basalto/10 bg-cal/90 backdrop-blur pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#inicio" className="whitespace-nowrap font-display text-lg text-vinho sm:text-xl">
            {restaurante.nome}
          </a>
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="#rodizio">Rodízio</a>
            <a href="#cardapio">Cardápio</a>
            <a href="#visite">Como chegar</a>
          </nav>
          <a
            href={reservar}
            className="pressable whitespace-nowrap rounded-full bg-vinho px-4 py-2 text-sm font-medium text-cal"
          >
            Reservar
          </a>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* HERO — provisório */}
        <section className="bg-polenta">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
            <div className="flex flex-col justify-end">
              <p className="text-vinho">Cozinha da Quarta Colônia em Santa Maria</p>
              <h1 className="mt-3 font-display text-6xl leading-[0.95] text-vinho md:text-8xl">
                Vien magnar!
              </h1>
              <p className="mt-5 max-w-md text-lg text-basalto">
                Galeto na brasa, massa aberta à mão e polenta na chapa. Pode chegar, tem lugar na mesa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cardapio" className="pressable rounded-full bg-vinho px-6 py-3 font-medium text-cal">
                  Ver cardápio
                </a>
                <a href={reservar} className="pressable rounded-full border border-vinho px-6 py-3 font-medium text-vinho">
                  Reservar pelo WhatsApp
                </a>
              </div>
            </div>
            <div aria-hidden className="aspect-[4/5] rounded-sm bg-vinho/15" />
          </div>
        </section>

        {/* RODÍZIO */}
        <section id="rodizio" className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-4xl text-vinho md:text-5xl">Rodízio de galeto</h2>
          <p className="mt-2 text-basalto-suave">
            {formatarPreco(rodizio.preco)} por pessoa. Vem tudo à mesa, até você pedir para parar.
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {rodizio.itens.map((item) => (
              <li key={item} className="border-b border-basalto/10 pb-3 text-lg">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CARDÁPIO */}
        <section id="cardapio" className="bg-cal-escura py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="font-display text-4xl text-vinho md:text-5xl">Cardápio</h2>
            <nav aria-label="Categorias do cardápio" className="mt-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
              {cardapio.map((c) => (
                <a key={c.id} href={`#${c.id}`} className="pressable shrink-0 rounded-full border border-basalto/20 px-4 py-2 text-sm">
                  {c.nome}
                </a>
              ))}
            </nav>
            <div className="mt-10 grid gap-14 md:grid-cols-2">
              {cardapio.map((categoria) => (
                <div key={categoria.id} id={categoria.id} className="scroll-mt-24">
                  <h3 className="font-display text-2xl text-araucaria">{categoria.nome}</h3>
                  <ul className="mt-4 space-y-5">
                    {categoria.pratos.map((prato) => (
                      <li key={prato.nome}>
                        <div className="flex items-baseline gap-3">
                          <span className="font-medium">{prato.nome}</span>
                          <span aria-hidden className="flex-1 border-b border-dotted border-basalto/30" />
                          <span className="tabular-nums">{formatarPreco(prato.preco)}</span>
                        </div>
                        <p className="mt-1 text-sm text-basalto-suave">{prato.descricao}</p>
                        {prato.selos && (
                          <p className="mt-1 text-xs text-araucaria">{prato.selos.join(" e ")}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VISITE */}
        <section id="visite" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-vinho md:text-5xl">Como chegar</h2>
            <p className="mt-4 text-lg">{restaurante.endereco}</p>
            <dl className="mt-8 space-y-3">
              {restaurante.horarios.map((h) => (
                <div key={h.dias} className="flex justify-between gap-4 border-b border-basalto/10 pb-3">
                  <dt>{h.dias}</dt>
                  <dd className="text-right text-basalto-suave">{h.horas}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div aria-hidden className="min-h-64 rounded-sm bg-araucaria/15" />
        </section>
      </main>

      <footer className="bg-vinho px-4 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-cal/80">
        <div className="mx-auto max-w-6xl text-sm">
          <p className="font-display text-xl text-cal">{restaurante.nome}</p>
          <p className="mt-2">Restaurante fictício, criado como projeto de demonstração.</p>
        </div>
      </footer>
    </>
  );
}
