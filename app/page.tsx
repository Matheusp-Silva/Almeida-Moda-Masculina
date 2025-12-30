import { client } from "@/sanity/lib/client";
import { Product } from "@/interface";

async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    price,
    category,
    sizes,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query);
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-red-600">
      {/* NAVBAR MODERNA */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none">
              ALMEIDA <span className="text-red-600">MM</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
              Streetwear & Lifestyle
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#catalogo" className="hover:text-red-600 transition">Coleção</a>
            <a href="#contato" className="hover:text-red-600 transition">Contato</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-red-600/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550998416-b549361338a8?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
            DROP <span className="text-red-600">2025</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
            O melhor do estilo casual e esportivo para quem não aceita o comum.
          </p>
          <a
            href="#catalogo"
            className="mt-8 inline-block bg-white text-black font-black px-10 py-4 uppercase text-sm hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Explorar Catálogo
          </a>
        </div>
      </section>

      {/* CATÁLOGO */}
      <main id="catalogo" className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h3 className="text-4xl font-black uppercase italic">Os mais brabos</h3>
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mt-2 italic">
              Novidades exclusivas
            </p>
          </div>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div key={product._id} className="group flex flex-col h-full">
              {/* Moldura da Imagem */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#111] border border-white/5">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Info do Produto */}
              <div className="mt-5 flex flex-col flex-grow">
                <h4 className="text-lg font-bold uppercase leading-tight min-h-[3rem]">
                  {product.name}
                </h4>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                {/* EXIBIÇÃO DOS TAMANHOS */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="flex items-center justify-center w-8 h-8 border border-white/20 text-[10px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}

                {/* BOTÃO WHATSAPP ESTILIZADO */}
                <a
                  href={`https://wa.me/5517996234182?text=Fala Almeida! Tenho interesse na: ${product.name}`}
                  target="_blank"
                  className="mt-6 flex items-center justify-center bg-transparent border border-white/20 text-white font-bold py-4 uppercase text-xs tracking-[0.2em] hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  Consultar Disponibilidade
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* SEÇÃO INFORMATIVA */}
      <section id="contato" className="bg-[#0f0f0f] py-20 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-black uppercase mb-6 italic">
              100% On-line, <br />
              <span className="text-red-600">Envio para todo Brasil</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              A Almeida MM nasceu para facilitar seu acesso à moda masculina de
              qualidade. Escolha suas peças, nos chame no WhatsApp e pronto!
              Enviamos via Correios/Transportadora ou combinamos a entrega.
            </p>
            <div className="flex gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-red-600 font-bold uppercase text-[10px] mb-1">Dúvidas?</p>
                <p className="text-sm font-bold uppercase">WhatsApp: (17) 99623-4182</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-red-600 font-bold uppercase text-[10px] mb-1">Siga-nos</p>
                <p className="text-sm font-bold uppercase">@almeida.mm</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 bg-white/5 border border-white/5 flex items-center justify-center p-6 text-center italic font-bold uppercase text-xs">Qualidade Garatida</div>
            <div className="h-40 bg-red-600 flex items-center justify-center p-6 text-center italic font-bold text-white uppercase text-xs">Entrega Rápida</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-[10px] text-gray-600 uppercase tracking-[0.5em]">
        © {new Date().getFullYear()} Almeida MM — Crafted for the Bold.
      </footer>
    </div>
  );
}