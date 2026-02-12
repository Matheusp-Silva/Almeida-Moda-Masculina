// app/ofertas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/interface";
import { MessageCircle, ArrowLeft, ShoppingBag, Menu, Tag } from "lucide-react";
import Link from "next/link";

// Interface estendida para incluir oldPrice e sizes
interface ProductWithDetails extends Omit<Product, 'sizes'> {
  oldPrice?: number;
  sizes?: string[];
}

export default function OffersPage() {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  const WHATSAPP_NUMBER = "5517996234182";

  useEffect(() => {
    async function fetchData() {
      // Query: Busca produtos que têm oldPrice definido E o oldPrice é maior que o preço atual
      const query = `*[_type == "product" && defined(oldPrice) && oldPrice > price] | order(_createdAt desc) {
        _id,
        name,
        price,
        oldPrice,
        sizes,
        category,
        "imageUrl": image.asset->url
      }`;

      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar ofertas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getWhatsAppLink = (productName: string, price: number) => {
    const message = `Olá! Vi a oferta do *${productName}* (por R$ ${price.toFixed(2)}) no site e tenho interesse.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const calculateDiscount = (price: number, oldPrice: number) => {
    return Math.round(((oldPrice - price) / oldPrice) * 100);
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
             <li className="text-almeida-vermelho cursor-default border-b-2 border-almeida-vermelho">Ofertas</li>
        </ul>

        <div className="flex-1 flex justify-end gap-4 md:hidden">
            <ShoppingBag className="w-6 h-6" />
            <Menu className="w-6 h-6" />
        </div>
        <div className="hidden md:flex flex-1"></div>
      </nav>

      {/* CABEÇALHO */}
      <header className="bg-almeida-vermelho py-16 px-6 md:px-12 mb-12 text-white">
        <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/70 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={14} /> Voltar para Home
            </Link>
            <div className="flex items-center gap-4">
                <Tag className="w-10 h-10 md:w-16 md:h-16" />
                <h1 className="text-5xl md:text-7xl font-[900] uppercase italic tracking-tighter">
                    Ofertas
                </h1>
            </div>
            <p className="text-white/80 font-bold uppercase tracking-widest text-xs mt-2 pl-2">
                Preços especiais por tempo limitado
            </p>
        </div>
      </header>

      {/* GRID DE PRODUTOS */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <div key={product._id} className="group cursor-pointer flex flex-col">
                {/* Imagem */}
                <div className="relative w-full aspect-[4/5] bg-[#f6f6f6] mb-4 overflow-hidden rounded-sm">
                  {/* Badge de Desconto */}
                  {product.oldPrice && (
                    <span className="absolute top-2 right-2 z-10 text-[10px] font-black uppercase bg-almeida-vermelho text-white px-3 py-1 rounded-full tracking-wider shadow-md">
                      -{calculateDiscount(product.price, product.oldPrice)}%
                    </span>
                  )}
                  
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
                      Aproveitar
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg leading-tight uppercase tracking-tight group-hover:text-almeida-vermelho transition-colors">
                      {product.name}
                      </h4>
                      <div className="text-right">
                        {product.oldPrice && (
                            <span className="block text-xs font-bold text-gray-400 line-through">
                                R$ {product.oldPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="font-bold text-lg text-almeida-vermelho">
                            R$ {product.price?.toFixed(2)}
                        </span>
                      </div>
                  </div>

                  {/* LISTAGEM DE TAMANHOS */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                        {product.sizes.map(size => (
                            <span key={size} className="text-[9px] font-bold border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 uppercase">
                                {size}
                            </span>
                        ))}
                    </div>
                  )}
                  
                  <a 
                      href={getWhatsAppLink(product.name, product.price)}
                      className="md:hidden mt-3 w-full border border-almeida-vermelho text-almeida-vermelho py-3 text-center font-bold uppercase text-xs tracking-widest rounded-sm"
                  >
                      Eu Quero
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-xl font-black uppercase italic text-gray-300 mb-2">Sem ofertas hoje</h3>
            <p className="text-gray-400 text-sm">Volte em breve para conferir novos descontos.</p>
          </div>
        )}
      </section>

      <footer className="bg-almeida-preto text-white py-10 text-center border-t-4 border-almeida-vermelho">
        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Almeida MM.
        </p>
      </footer>
    </div>
  );
}