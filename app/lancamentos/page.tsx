"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/interface";
import { MessageCircle, ArrowLeft, ShoppingBag, Menu, Sparkles } from "lucide-react";
import Link from "next/link";

// Interface estendida
interface ProductWithDetails extends Product {
  oldPrice?: number;
  sizes?: string[];
  _createdAt: string;
}

// Tipo para o agrupamento
type GroupedProducts = {
  [key: string]: ProductWithDetails[];
};

export default function NewArrivalsPage() {
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [loading, setLoading] = useState(true);

  const WHATSAPP_NUMBER = "5517996234182";

  useEffect(() => {
    async function fetchData() {
      // Busca os últimos 10 produtos ordenados por data de criação
      const query = `*[_type == "product"] | order(_createdAt desc)[0...10] {
        _id,
        name,
        price,
        oldPrice,
        sizes,
        category,
        "imageUrl": image.asset->url,
        _createdAt
      }`;

      try {
        const data: ProductWithDetails[] = await client.fetch(query);
        
        // Lógica para Agrupar por Categoria
        const groups: GroupedProducts = {};
        
        data.forEach(product => {
          // Limpa o nome da categoria (ex: "roupas-camisetas" -> "Camisetas")
          const rawCategory = product.category || "Outros";
          const parts = rawCategory.split('-');
          const cleanCategory = parts.length > 1 
            ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) 
            : parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

          if (!groups[cleanCategory]) {
            groups[cleanCategory] = [];
          }
          groups[cleanCategory].push(product);
        });

        setGroupedProducts(groups);
      } catch (error) {
        console.error("Erro ao carregar lançamentos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getWhatsAppLink = (productName: string, price: number) => {
    const message = `Olá! Vi o lançamento *${productName}* (R$ ${price.toFixed(2)}) no site e tenho interesse.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-almeida-branco flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-almeida-vermelho"></div>
      </div>
    );
  }

  return (
    <div className="bg-almeida-branco text-almeida-preto min-h-screen font-sans selection:bg-almeida-vermelho selection:text-white">
      
      {/* NAVBAR SIMPLIFICADA */}
      <nav className="flex items-center justify-between px-6 md:px-12 h-20 bg-almeida-branco/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="flex-1">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-[900] tracking-tighter uppercase italic leading-none cursor-pointer">
              Almeida <span className="text-almeida-vermelho">MM</span>
            </h1>
          </Link>
        </div>
        
        <ul className="hidden md:flex h-full items-center gap-8 font-bold text-[13px] uppercase tracking-tight">
             <Link href="/"><li className="hover:text-almeida-vermelho cursor-pointer">Início</li></Link>
             <li className="text-almeida-vermelho cursor-default border-b-2 border-almeida-vermelho">Lançamentos</li>
        </ul>

        <div className="flex-1 flex justify-end gap-4 md:hidden">
            <ShoppingBag className="w-6 h-6" />
            <Menu className="w-6 h-6" />
        </div>
        <div className="hidden md:flex flex-1"></div>
      </nav>

      {/* CABEÇALHO */}
      <header className="bg-almeida-preto py-16 px-6 md:px-12 mb-12 text-white border-b-4 border-almeida-vermelho">
        <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={14} /> Voltar para Home
            </Link>
            <div className="flex items-center gap-4">
                <Sparkles className="w-10 h-10 md:w-16 md:h-16 text-almeida-vermelho" />
                <h1 className="text-5xl md:text-7xl font-[900] uppercase italic tracking-tighter">
                    Lançamentos
                </h1>
            </div>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-2 pl-2">
                As últimas novidades que acabaram de chegar
            </p>
        </div>
      </header>

      {/* LISTAGEM AGRUPADA */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {Object.keys(groupedProducts).length > 0 ? (
          Object.entries(groupedProducts).map(([categoryName, products]) => (
            <section key={categoryName} className="mb-20 last:mb-0">
              {/* Título da Categoria */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-[900] uppercase italic tracking-tighter text-almeida-preto">
                  {categoryName}
                </h2>
                <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
              </div>

              {/* Grid de Produtos dessa Categoria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product) => (
                  <div key={product._id} className="group cursor-pointer flex flex-col">
                    <div className="relative w-full aspect-[4/5] bg-[#f6f6f6] mb-4 overflow-hidden rounded-sm">
                        {/* Tag de Novo */}
                        <span className="absolute top-2 left-2 z-10 text-[9px] font-black uppercase bg-almeida-preto text-white px-2 py-1 tracking-widest">
                            Novo
                        </span>

                        <img
                            src={product.imageUrl}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            alt={product.name}
                        />
                        
                        <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block">
                            <a
                            href={getWhatsAppLink(product.name, product.price)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-almeida-preto text-white py-4 font-bold uppercase text-xs tracking-widest hover:bg-almeida-vermelho transition-colors shadow-xl"
                            >
                            <MessageCircle size={16} />
                            Eu Quero
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                          <h4 className="font-bold text-lg leading-tight uppercase tracking-tight group-hover:text-almeida-vermelho transition-colors">
                          {product.name}
                          </h4>
                          <span className="font-bold text-lg">
                              R$ {product.price?.toFixed(2)}
                          </span>
                      </div>

                      {/* Tamanhos */}
                      {product.sizes && product.sizes.length > 0 ? (
                        <div className="flex gap-1 mt-1 flex-wrap">
                            {product.sizes.map(size => (
                                <span key={size} className="text-[9px] font-bold border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 uppercase">
                                    {size}
                                </span>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                            Almeida MM
                        </p>
                      )}

                      <a 
                          href={getWhatsAppLink(product.name, product.price)}
                          className="md:hidden mt-3 w-full border border-almeida-preto text-almeida-preto py-3 text-center font-bold uppercase text-xs tracking-widest rounded-sm"
                      >
                          Ver no WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase">Nenhum lançamento recente encontrado.</p>
          </div>
        )}
      </div>

      <footer className="bg-almeida-preto text-white py-10 text-center border-t-4 border-almeida-vermelho">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Almeida MM.
        </p>
      </footer>
    </div>
  );
}