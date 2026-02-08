"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/interface";
import { Menu, MessageCircle, ArrowRight, ChevronDown, X, ChevronRight } from "lucide-react"; // Adicionei X e ChevronRight
import Link from "next/link";

// --- DADOS DO MENU ---
const megaMenuData = {
  "Calçados": [
    { label: "Tênis", slug: "calcados-tenis" },
    { label: "Casual", slug: "calcados-casual" },
    { label: "Skateboarding", slug: "calcados-skateboarding" },
  ],
  "Roupas": [
    { label: "Casual", slug: "roupas-casual" },
    { label: "Camisetas", slug: "roupas-camisetas" },
    { label: "Shorts", slug: "roupas-shorts" },
    { label: "Times", slug: "roupas-times" },
    { label: "Jaquetas", slug: "roupas-jaquetas" },
    { label: "Calças", slug: "roupas-calcas" },
    { label: "Polos", slug: "roupas-polos" },
    { label: "Oversize", slug: "roupas-oversize" },
  ],
  "Acessórios": [
    { label: "Bonés", slug: "acessorios-bones" },
    { label: "Meias", slug: "acessorios-meias" },
    { label: "Relógios", slug: "acessorios-relogios" },
    { label: "Carteiras", slug: "acessorios-carteiras" },
  ],
  "Íntimo": [
    { label: "Cuecas", slug: "intimo-cuecas" },
  ]
};

interface HomeData {
  bannerTitle: string;
  titleColor: string;
  bannerSubtitle: string;
  subtitleColor: string;
  buttonText: string;
  bannerImage: any;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ESTADO PARA O MENU MOBILE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ESTADO PARA OS SUBMENUS NO MOBILE (Qual categoria está aberta?)
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const WHATSAPP_NUMBER = "5517996234182"; 

  useEffect(() => {
    async function fetchData() {
      const query = `{
        "latest": *[_type == "product"] | order(_createdAt desc)[0...5] {
          _id,
          name,
          price,
          category,
          "imageUrl": image.asset->url
        },
        "home": *[_type == "homeSettings"][0] {
          bannerTitle,
          titleColor,
          bannerSubtitle,
          subtitleColor,
          buttonText,
          bannerImage
        }
      }`;

      try {
        const data = await client.fetch(query);
        setProducts(data.latest || []);
        setHomeData(data.home || null);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getWhatsAppLink = (productName: string, price: number) => {
    const message = `Olá! Vi o *${productName}* (R$ ${price.toFixed(2)}) no site da Almeida MM e tenho interesse.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const formatCategoryName = (slug: string) => {
    if (!slug) return "";
    const parts = slug.split('-');
    const name = parts.length > 1 ? parts[1] : parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Função para alternar categorias no mobile
  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
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
      
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-[#f5f5f5] py-2 text-center text-[10px] font-black tracking-[0.2em] uppercase text-gray-500">
        Frete Grátis para compras acima de R$ 299 • Almeida MM
      </div>

      {/* 2. NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-12 h-20 bg-almeida-branco/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        
        {/* ESQUERDA: Logo */}
        <div className="flex-1 z-50">
          <h1 className="text-2xl md:text-3xl font-[900] tracking-tighter uppercase italic leading-none cursor-pointer">
            Almeida <span className="text-almeida-vermelho">MM</span>
          </h1>
        </div>

        {/* CENTRO: Menu Desktop (Hidden no Mobile) */}
        <ul className="hidden md:flex h-full items-center gap-8 font-bold text-[13px] uppercase tracking-tight">
          <li className="cursor-pointer hover:text-almeida-vermelho transition-colors duration-300">Lançamentos</li>
          
          {/* Mega Menu Desktop */}
          <li className="group h-full flex items-center cursor-pointer border-b-2 border-transparent hover:border-almeida-vermelho transition-all duration-300">
            <span className="flex items-center gap-1 group-hover:text-almeida-vermelho">
              Masculino <ChevronDown size={14} />
            </span>
            <div className="absolute left-0 top-full w-full bg-almeida-branco border-t border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-8">
                {Object.entries(megaMenuData).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-black text-sm mb-4 text-almeida-preto tracking-widest border-b-2 border-almeida-vermelho inline-block pb-1">
                      {category.toUpperCase()}
                    </h4>
                    <ul className="space-y-3">
                      {items.map(item => (
                        <li key={item.slug} className="text-gray-500 hover:text-almeida-vermelho hover:translate-x-1 transition-all text-xs font-bold cursor-pointer">
                          <Link href={`/categoria/${item.slug}`}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li className="cursor-pointer hover:text-almeida-vermelho transition-colors duration-300">Ofertas</li>
        </ul>

        {/* DIREITA: Mobile Menu Button (REMOVIDO O CARRINHO) */}
        <div className="flex-1 flex justify-end md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="w-8 h-8 text-almeida-preto" />
            </button>
        </div>
        
        {/* DIREITA: Espaço Vazio para Desktop */}
        <div className="hidden md:flex flex-1"></div>
      </nav>

      {/* --- MENU MOBILE (OVERLAY) --- */}
      {/* Este bloco só aparece quando isMobileMenuOpen é true */}
      <div className={`fixed inset-0 bg-white z-[60] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden overflow-y-auto`}>
        
        {/* Header do Menu Mobile */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-2xl font-[900] italic uppercase tracking-tighter">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-almeida-preto" />
            </button>
        </div>

        {/* Lista de Links Mobile */}
        <div className="p-6 flex flex-col gap-6">
            <a href="#" className="text-xl font-[900] uppercase italic tracking-tight hover:text-almeida-vermelho">Lançamentos</a>
            <a href="#" className="text-xl font-[900] uppercase italic tracking-tight text-almeida-vermelho">Ofertas</a>
            
            <div className="w-full h-px bg-gray-100 my-2"></div>

            {/* Categorias Expansíveis (Acordeão) */}
            <div className="flex flex-col gap-4">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Categorias</p>
                
                {Object.entries(megaMenuData).map(([category, items]) => (
                    <div key={category} className="border-b border-gray-50 pb-2">
                        <button 
                            onClick={() => toggleCategory(category)}
                            className="w-full flex justify-between items-center py-2"
                        >
                            <span className="text-lg font-bold uppercase tracking-tight">{category}</span>
                            <ChevronDown 
                                size={20} 
                                className={`transition-transform duration-300 ${openCategory === category ? 'rotate-180 text-almeida-vermelho' : 'text-gray-400'}`} 
                            />
                        </button>
                        
                        {/* Submenu */}
                        <div className={`overflow-hidden transition-all duration-300 ${openCategory === category ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            <ul className="flex flex-col gap-3 pl-4 border-l-2 border-almeida-vermelho/20 ml-1">
                                {items.map((item) => (
                                    <li key={item.slug}>
                                        <Link 
                                            href={`/categoria/${item.slug}`}
                                            onClick={() => setIsMobileMenuOpen(false)} // Fecha o menu ao clicar
                                            className="text-gray-600 font-bold text-sm uppercase flex items-center gap-2"
                                        >
                                            {item.label} <ChevronRight size={12} className="text-almeida-vermelho" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. HERO BANNER */}
      <section className="w-full">
        <div className="relative w-full">
          {homeData?.bannerImage && (
            <img
              src={urlFor(homeData.bannerImage).quality(100).url()}
              className="w-full h-auto block" 
              alt="Destaque Almeida MM"
            />
          )}

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
            <div className="max-w-4xl pointer-events-auto">
              <h2
                className="text-4xl md:text-[80px] font-[900] uppercase italic leading-[0.9] tracking-tighter mb-4 drop-shadow-lg"
                style={{ color: homeData?.titleColor || "#FFFFFF" }}
              >
                {homeData?.bannerTitle}
              </h2>
              <p
                className="text-sm md:text-xl font-bold uppercase tracking-widest mb-6 text-gray-200"
                style={{ color: homeData?.subtitleColor }}
              >
                {homeData?.bannerSubtitle}
              </p>
              {homeData?.buttonText && (
                <button className="bg-almeida-branco text-almeida-preto px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-almeida-vermelho hover:text-white transition-all duration-300 inline-flex items-center gap-2">
                  {homeData.buttonText} <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ÚLTIMOS LANÇAMENTOS */}
      <section className="px-6 md:px-12 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-almeida-vermelho font-black text-xs uppercase tracking-[0.3em] mb-2">
              New Arrivals
            </p>
            <h3 className="text-3xl md:text-4xl font-[900] uppercase italic tracking-tighter">
              Últimas Novidades
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="group cursor-pointer flex flex-col h-full">
                <div className="relative w-full aspect-[4/5] bg-[#f6f6f6] mb-4 overflow-hidden rounded-sm">
                  <span className="absolute top-3 left-3 z-10 text-[9px] font-black uppercase bg-white/90 backdrop-blur px-2 py-1 tracking-widest">
                    {formatCategoryName(product.category)}
                  </span>

                  <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    alt={product.name}
                  />

                  <div className="absolute inset-x-3 bottom-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block">
                    <a
                      href={getWhatsAppLink(product.name, product.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-almeida-preto text-white py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-almeida-vermelho transition-colors shadow-xl"
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="font-bold text-sm leading-tight uppercase tracking-tight group-hover:text-almeida-vermelho transition-colors mb-1">
                      {product.name}
                    </h4>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                      Lançamento
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="font-[900] text-lg text-almeida-preto">
                      R$ {product.price?.toFixed(2)}
                    </span>
                    
                    <a 
                      href={getWhatsAppLink(product.name, product.price)}
                      className="md:hidden w-full border border-almeida-preto text-almeida-preto py-2 text-center font-bold uppercase text-[10px] tracking-widest rounded-sm hover:bg-almeida-preto hover:text-white transition-colors"
                    >
                      Ver Detalhes
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 font-bold uppercase">
              Nenhum produto cadastrado ainda.
            </div>
          )}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-almeida-preto text-white pt-20 pb-10 px-6 md:px-12 border-t-4 border-almeida-vermelho">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div>
            <h2 className="text-3xl font-[900] italic tracking-tighter uppercase mb-4">
              Almeida <span className="text-almeida-vermelho">MM</span>
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest max-w-xs">
              Estilo, conforto e atitude.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest mb-4 text-white">Loja</h4>
              <ul className="space-y-2 text-xs font-bold text-gray-500 uppercase">
                <li>Lançamentos</li>
                <li>Masculino</li>
                <li>Ofertas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-widest mb-4 text-white">Suporte</h4>
              <ul className="space-y-2 text-xs font-bold text-gray-500 uppercase">
                <li>WhatsApp</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center md:text-left">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} Almeida MM.
            </p>
        </div>
      </footer>
    </div>
  );
}