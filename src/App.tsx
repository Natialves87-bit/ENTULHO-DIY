import React, { useState } from 'react';
import { Menu, X, MapPin, Clock, Instagram, Star, Hammer, Play, Copy, ExternalLink, ArrowRight, Newspaper, Users, Camera, ShoppingCart, Trash2, CheckCircle, Video, RotateCw } from 'lucide-react';
import { translations } from './translations';

const logoEntulhoOnly = '/logos/logo.png';
const logoFull = '/logos/logo.png';
const caveira = '/logos/caveira.png';
import { galleryImages } from './galleryImages';


const SkateboardIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="10" width="20" height="4" rx="2"/>
    <path d="M6 14v2"/>
    <path d="M18 14v2"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
  </svg>
);

const INSTAGRAM_URL = 'https://instagram.com/entulho.diy';

export default function App() {
  
  // Cart state
  const [cart, setCart] = useState<{title: string, size: string}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  
  const addToCart = (prod: any, idx: number) => {
    const size = selectedSizes[idx];
    if (!size) {
      alert("Por favor, selecione um tamanho.");
      return;
    }
    setCart(prev => [...prev, { title: prod.title, size }]);
    setIsCartOpen(true);
  };
  
  const checkout = () => {
    if (cart.length === 0) return;
    
    // Group by title and size to get quantities
    const grouped = cart.reduce((acc, item) => {
      const key = `${item.title} - ${item.size}`;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 0 };
      }
      acc[key].quantity += 1;
      return acc;
    }, {} as Record<string, any>);
    
    const itemsText = Object.values(grouped).map(item => `${item.quantity}x ${item.title} (Tamanho: ${item.size})`).join('\n');
    
    const text = `Olá! Gostaria de finalizar a compra dos seguintes itens:\n\n${itemsText}\n\nPor favor, me confirmem o valor total a ser pago via PIX.`;
    
    const url = `https://ig.me/m/entulho.diy`;
    
    try {
      navigator.clipboard.writeText(text);
      alert("O resumo do seu pedido foi copiado! Cole a mensagem no Direct do Instagram para finalizar a compra.");
    } catch (err) {
      alert("Não foi possível copiar automaticamente. Por favor, envie seu pedido por DM.");
    }
    
    setCart([]);
    setIsCartOpen(false);
    window.location.href = url;
  };
  const [sizeMangaLonga, setSizeMangaLonga] = useState("M");
  const [isPetitionOpen, setIsPetitionOpen] = useState(false);
  const [petitionStatus, setPetitionStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [lang, setLang] = useState<'PT' | 'EN' | 'ES'>('PT');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showIntlModal, setShowIntlModal] = useState(false);
  const t = translations[lang];

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-stone-500 selection:text-white">
      {/* BANNER TEMPORÁRIO PARA DOWNLOAD DO SITE */}
      <div className="w-full bg-green-600 shadow-xl border-b-4 border-green-800">
        <a 
          href="/entulho-site.zip" 
          download="entulho-site.zip"
          onClick={(e) => {
            // Failsafe for webviews
            const link = document.createElement('a');
            link.href = '/entulho-site.zip';
            link.download = 'entulho-site.zip';
            link.click();
          }}
          className="block w-full text-white p-6 text-center font-bold text-lg hover:bg-green-700 transition-colors"
        >
          ⬇️ CLIQUE AQUI PARA BAIXAR A VERSÃO NODE.JS (GITHUB) ⬇️
        </a>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-brand text-3xl tracking-wider cursor-pointer flex items-center flex-1" onClick={() => scrollTo('hero')}>
            <img src={logoFull} alt="Entulho D.I.Y." className="h-[80px] lg:h-[120px] max-w-full object-contain invert opacity-90" />
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-stone-400 hover:text-white transition-colors">
              <Play className="w-5 h-5 fill-current" />
            </button>
            <div className="flex gap-2 text-xs font-bold text-stone-500">
              <button className={`hover:text-white transition-colors ${lang === 'PT' ? 'text-white' : ''}`} onClick={() => setLang('PT')}>PT</button>
              <span>|</span>
              <button className={`hover:text-white transition-colors ${lang === 'EN' ? 'text-white' : ''}`} onClick={() => setLang('EN')}>EN</button>
              <span>|</span>
              <button className={`hover:text-white transition-colors ${lang === 'ES' ? 'text-white' : ''}`} onClick={() => setLang('ES')}>ES</button>
            </div>
            <a 
              href={INSTAGRAM_URL}
              target="_top"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white transition-colors p-2 -m-2 relative z-50 flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <div className="h-4 w-px bg-stone-800 mx-2"></div>
            <button onClick={() => scrollTo('historia')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.historia}</button>
            <button onClick={() => scrollTo('documentario')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.documentario}</button>
            <button onClick={() => scrollTo('galeria')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.galeria}</button>
            <button onClick={() => scrollTo('produtos')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.produtos}</button>
            <button onClick={() => scrollTo('apista')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.pista}</button>
            <button onClick={() => scrollTo('unico')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.unico}</button>
            <button onClick={() => scrollTo('feedbacks')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.feedbacks}</button>
            <button onClick={() => scrollTo('contato')} className="text-[10px] font-bold tracking-widest hover:text-stone-400 transition-colors uppercase">{t.nav.contato}</button>
            <button onClick={() => scrollTo('apoie')} className="bg-white text-black px-4 py-2 text-[10px] font-bold tracking-widest hover:bg-stone-200 transition-colors uppercase">{t.nav.apoie}</button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <div className="flex gap-2 text-xs font-bold text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-full">
              <button className={`hover:text-white transition-colors ${lang === 'PT' ? 'text-white' : ''}`} onClick={() => setLang('PT')}>PT</button>
              <span className="opacity-50">|</span>
              <button className={`hover:text-white transition-colors ${lang === 'EN' ? 'text-white' : ''}`} onClick={() => setLang('EN')}>EN</button>
              <span className="opacity-50">|</span>
              <button className={`hover:text-white transition-colors ${lang === 'ES' ? 'text-white' : ''}`} onClick={() => setLang('ES')}>ES</button>
            </div>
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-[100px] left-0 w-full bg-stone-950 border-b border-stone-800 p-6 flex flex-col gap-6">
            <div className="flex gap-4 mb-4 items-center justify-between border-b border-stone-800 pb-4">
              <a 
                href={INSTAGRAM_URL}
                target="_top"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors p-2"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <button onClick={() => scrollTo('historia')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.historia}</button>
            <button onClick={() => scrollTo('documentario')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.documentario}</button>
            <button onClick={() => scrollTo('galeria')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.galeria}</button>
            <button onClick={() => scrollTo('produtos')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.produtos}</button>
            <button onClick={() => scrollTo('apista')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.pista}</button>
            <button onClick={() => scrollTo('unico')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.unico}</button>
            <button onClick={() => scrollTo('feedbacks')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.feedbacks}</button>
            <button onClick={() => scrollTo('contato')} className="text-left text-sm font-bold tracking-widest uppercase">{t.nav.contato}</button>
            <button onClick={() => scrollTo('apoie')} className="bg-white text-black px-6 py-3 text-xs font-bold tracking-widest uppercase">{t.nav.apoie}</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 px-6 lg:px-8 max-w-[1400px] mx-auto min-h-[85vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <div className="inline-flex items-center justify-center border border-stone-800 px-3 py-2 sm:px-4 mb-8 bg-stone-900/50 max-w-full">
              <Hammer className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-stone-400 shrink-0" />
              <span className="text-[9px] sm:text-xs font-bold tracking-widest sm:tracking-widest text-stone-300 uppercase break-words text-left">
                {t.hero.badge}
              </span>
            </div>
            
            <h1 className="mb-8 flex flex-col">
              <span className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter">ENTULHO D.I.Y.</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-400 mb-8 font-light uppercase tracking-wide">
              {t.hero.title2}
            </p>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-10 max-w-xl">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="bg-white text-black px-8 py-4 font-bold text-xs tracking-widest flex items-center justify-center gap-3 hover:bg-stone-200 transition-colors uppercase">
                <Instagram className="w-4 h-4" /> {t.hero.btnInsta}
              </a>
              <button onClick={() => scrollTo('apista')} className="border border-stone-800 px-8 py-4 font-bold text-xs tracking-widest hover:bg-stone-900 transition-colors uppercase">
                {t.hero.btnPista}
              </button>
            </div>
            <div className="mt-12 flex items-center gap-6 text-stone-500 text-xs font-bold tracking-widest">
              <div className="flex items-center gap-2 uppercase"><MapPin className="w-4 h-4" /> {t.hero.tags[0]}</div>
              <div className="flex items-center gap-2 uppercase"><MapPin className="w-4 h-4" /> {t.hero.tags[1]}</div>
              <div className="flex items-center gap-2 uppercase"><Clock className="w-4 h-4" /> {t.hero.tags[2]}</div>
            </div>
          </div>
          <div className="relative hidden lg:flex items-center justify-center">
            <img src={caveira} alt="Logo Entulho" className="w-[300px] lg:w-[400px] object-contain invert opacity-90 " />
          </div>
        </div>
      </section>

      {/* Bottom Bar Stats */}
      <section className="border-y border-stone-800 bg-stone-950">
        <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-4">
            <Star className="w-8 h-8 text-stone-300" />
            <span className="text-xs font-bold tracking-widest uppercase">{t.stats.nota}</span>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <SkateboardIcon className="w-8 h-8 text-stone-300" />
            <span className="text-xs font-bold tracking-widest uppercase">{t.stats.loop}</span>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <Newspaper className="w-8 h-8 text-stone-300" />
            <span className="text-xs font-bold tracking-widest uppercase">{t.stats.mag}</span>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <Users className="w-8 h-8 text-stone-300" />
            <span className="text-xs font-bold tracking-widest uppercase">{t.stats.comunidade}</span>
          </div>
        </div>
      </section>

      {/* A História do ENTULHO */}
      <section id="historia" className="bg-stone-950 border-b border-stone-800 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-16 text-white text-center flex items-center justify-center gap-3">
            {t.historia.title}
          </h2>
          <div className="space-y-12 text-stone-300 leading-relaxed text-sm">
            {t.historia.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-white mb-4">{section.subtitle}</h3>
                <div className="space-y-4">
                  {section.text.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
            
            <p className="pt-8 text-stone-500 italic text-center text-xs">{t.historia.author}</p>
            
            <p className="pt-8 font-bold text-white text-base text-center max-w-2xl mx-auto">{t.historia.p6}</p>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setIsPetitionOpen(true)} className="bg-white text-black px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-stone-200 transition-colors text-center">
              {t.historia.btnAbaixo}
            </button>
            <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="border border-stone-700 text-white px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-stone-900 transition-colors text-center">
              {t.historia.btnFala}
            </a>
          </div>
        </div>
      </section>

      {/* Documentário */}
      <section id="documentario" className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-white">{t.doc.title}</h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-8">
          {t.doc.desc}
        </p>
        <div className="flex justify-center mb-12">
          <button 
            onClick={() => window.open('https://www.youtube.com/', '_blank')}
            className="w-24 h-24 bg-stone-900 border border-stone-800 rounded-full flex flex-col items-center justify-center group hover:bg-stone-800 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Video className="w-8 h-8 text-white mb-1 group-hover:text-stone-300" />
            <Play className="w-4 h-4 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity absolute" />
          </button>
        </div>
        <div>
          <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white border-b border-stone-800 pb-1 hover:border-white transition-colors">
            {t.doc.btn}
          </a>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section id="galeria" className="bg-stone-950 border-y border-stone-800 py-24 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-white">{t.galeria.title}</h2>
          <p className="text-stone-400 text-sm leading-relaxed mb-12 max-w-2xl mx-auto">
            {t.galeria.desc}
          </p>
          {galleryImages.length === 0 && (<div className="py-12 border border-stone-800 bg-stone-900/50"><p className="text-stone-500 font-bold uppercase tracking-widest text-sm">Novas fotos em breve</p></div>)}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(showAllGallery ? galleryImages : galleryImages.slice(0, 8)).map((img, idx) => (
              <div key={idx} className="aspect-square bg-stone-900 overflow-hidden group cursor-pointer" onClick={() => setSelectedImageIndex(idx)}>
                <img src={img} alt={`Galeria ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
            ))}
          </div>
          {galleryImages.length > 8 && !showAllGallery && (
            <div className="mt-8">
              <button onClick={() => setShowAllGallery(true)} className="bg-stone-900 border border-stone-800 text-white px-8 py-3 font-bold text-xs tracking-widest hover:bg-stone-800 transition-colors uppercase w-full sm:w-auto">
                VER MAIS FOTOS
              </button>
            </div>
          )}
          <div className="mt-8">
            <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors">
              VER MAIS NO INSTAGRAM
            </a>
          </div>
        </div>
      </section>

      {/* Produtos Oficiais */}
      <section id="produtos" className="bg-stone-950 border-b border-stone-800 py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">{t.produtos.title}</h2>
          <p className="text-stone-400 text-sm mb-12 max-w-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t.produtos.desc }}></p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.produtos.items.map((prod, idx) => (
              <div key={idx} className="bg-stone-900 border border-stone-800 p-4 md:p-6 flex flex-col items-center">
                <div className="w-full flex items-center justify-center mb-6 bg-transparent aspect-square rounded-sm overflow-hidden p-0 group">
                  <img src={prod.img} alt={prod.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="w-full mt-auto">
                  <div className="flex justify-center gap-3 mb-6">
                    {['P', 'M', 'G', 'GG'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes(prev => ({ ...prev, [idx]: size }))}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors border ${
                          selectedSizes[idx] === size 
                            ? 'bg-white text-black border-white' 
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-white hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => addToCart(prod, idx)}
                    className="w-full bg-stone-100 text-black py-3 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors text-center block"
                  >
                    {t.produtos.btnComprar}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

                  {/* O que rola no Entulho D.I.Y. */}
      <section id="apista" className="py-24 px-6 max-w-[1400px] mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter text-center mb-16 text-white">{t.apista.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.apista.cards.map((card, i) => (
            <button onClick={() => scrollTo(i === 0 ? "unico" : "feedbacks")} key={i} className="bg-stone-950 border border-stone-800 p-8 hover:bg-stone-900 transition-colors group cursor-pointer block text-left">
              <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-8">{card.desc}</p>
              <div className="flex items-center text-xs font-bold tracking-widest text-stone-500 group-hover:text-white uppercase">
                {card.link} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}

          {/* Card Especial */}
          <div onClick={() => setIsPetitionOpen(true)} className="bg-white p-8 group cursor-pointer flex flex-col justify-between decoration-transparent block">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">
                {t.apista.ajudeTitle}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-8">{t.apista.ajudeDesc}</p>
            </div>
            <span className="flex items-center text-xs font-bold tracking-widest text-black uppercase">
              {t.apista.btnBaixar} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

{/* Por que o Entulho D.I.Y. é um pico único no Brasil */}
      <section id="unico" className="bg-stone-950 border-y border-stone-800 py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-center mb-16 text-white leading-tight">
            {t.unico.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {t.unico.items.map((item, i) => (
              <div key={i}>
                <span className="text-stone-600 font-brand text-3xl mb-4 block">0{i + 1}.</span>
                <h3 className="text-lg font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}


      {/* Apoie o Entulho */}
      <section id="apoie" className="py-24 px-6 max-w-[1000px] mx-auto text-center border-b border-stone-800">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6 text-white">{t.apoie.title}</h2>
        <p className="text-stone-400 text-sm max-w-2xl mx-auto leading-relaxed mb-12">
          {t.apoie.desc}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-stone-950 border border-stone-800 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.apoie.pixTitle}</h3>
              <p className="text-stone-500 text-sm mb-8">{t.apoie.pixDesc}</p>
            </div>
            <div>
              <div className="bg-black p-4 flex items-center justify-between border border-stone-800">
                <span className="font-mono text-sm text-white truncate mr-4">entulho.diy@gmail.com</span>
                <button 
                  className="text-stone-500 hover:text-white transition-colors"
                  onClick={() => navigator.clipboard.writeText('entulho.diy@gmail.com')}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-stone-600 text-[10px] uppercase tracking-widest mt-4 font-bold">{t.apoie.chave}</p>
            </div>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.apoie.intlTitle || "Transferência Internacional"}</h3>
              <p className="text-stone-500 text-sm mb-6">{t.apoie.intlDesc || "Para doações de fora do Brasil, utilize os dados abaixo (SWIFT/ACH):"}</p>
            </div>
            <button 
              onClick={() => setShowIntlModal(true)}
              className="bg-white text-black px-6 py-3 font-bold text-xs tracking-widest hover:bg-stone-200 transition-colors uppercase w-full text-center mt-4"
            >
              Ver Dados Bancários
            </button>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{t.apoie.marcasTitle}</h3>
              <p className="text-stone-500 text-sm mb-8">{t.apoie.marcasDesc}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 font-bold text-xs tracking-widest hover:bg-stone-200 transition-colors uppercase w-full sm:w-auto text-center">
                {t.apoie.btnContato}
              </a>
            </div>
          </div>

          </div>
      </section>




      {/* Feedbacks no Google */}
      <section id="feedbacks" className="bg-stone-950 border-b border-stone-800 py-24 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4 text-white">{t.feedbacks.title}</h2>
        <div className="flex flex-col items-center gap-2 mb-12 text-sm">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-white text-white" />)}
          </div>
          <span className="font-bold uppercase tracking-widest text-xs text-stone-300">{t.stats.nota}</span>
          <a href="#" target="_top" rel="noopener noreferrer" className="text-stone-500 hover:text-white uppercase tracking-widest text-xs font-bold mt-2 flex items-center gap-1 transition-colors">
            Ver no Google Maps <ExternalLink className="w-3 h-3" />
          </a>
        </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1400px] mx-auto text-left mb-16">
          <a href="https://share.google/i2HBwkypIcdY5HLdu" target="_top" rel="noopener noreferrer" className="bg-stone-900 border border-stone-800 p-8 flex flex-col hover:bg-stone-800 transition-colors group">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold mr-4">NA</div>
              <div>
                <h4 className="text-white font-bold text-sm">Nat Alves</h4>
                <div className="flex text-yellow-500 text-xs mt-1">★★★★★</div>
              </div>
            </div>
            <p className="text-stone-300 text-sm italic mb-6 leading-relaxed">"DIY mais pesado que ja fui na vida. Alem da pista insana, o visual e a galera é fodaa demais"</p>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-auto group-hover:text-white transition-colors">Ver no Google Maps →</span>
          </a>
          <a href="https://share.google/cOV43m98twPNHoNQA" target="_top" rel="noopener noreferrer" className="bg-stone-900 border border-stone-800 p-8 flex flex-col hover:bg-stone-800 transition-colors group">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold mr-4">HS</div>
              <div>
                <h4 className="text-white font-bold text-sm">Henrique Schafer</h4>
                <div className="flex text-yellow-500 text-xs mt-1">★★★★★</div>
              </div>
            </div>
            <p className="text-stone-300 text-sm italic mb-6 leading-relaxed">"O melhor pico pra andar na ilha! Primeiro looping público construído por reais construtores da área de pistas de skate, criações orgânicas, sem projeto, vindo da fonte mais pura da vivência e sabedoria dos construtores!"</p>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-auto group-hover:text-white transition-colors">Ver no Google Maps →</span>
          </a>
          <a href="https://share.google/wGUJlsYTC77tdPYTd" target="_top" rel="noopener noreferrer" className="bg-stone-900 border border-stone-800 p-8 flex flex-col hover:bg-stone-800 transition-colors group">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white font-bold mr-4">LV</div>
              <div>
                <h4 className="text-white font-bold text-sm">Leonardo Vieira</h4>
                <div className="flex text-yellow-500 text-xs mt-1">★★★★★</div>
              </div>
            </div>
            <p className="text-stone-300 text-sm italic mb-6 leading-relaxed">"Um lugar único pra quem quer dar aquele rolê de skate, uma mistura de urbano com uma vista debaixo da ponte para o centro da ilha. Um lugar que parece ter saído das revistas de skate dos anos 80 direto pro mundo atual.. lugar irado pra fotografar."</p>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-auto group-hover:text-white transition-colors">Ver no Google Maps →</span>
          </a>
        </div>
        <p className="text-stone-500 text-xs max-w-3xl mx-auto leading-relaxed">
          
        </p>
      </section>




      {/* Pista de skate em Florianópolis */}
      <section id="contato" className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 text-white leading-tight">
              {t.contato.title}
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              {t.contato.p1}
            </p>
            <p className="text-stone-400 text-sm leading-relaxed mb-10">
              {t.contato.p2}
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-white shrink-0" />
                <p className="text-white font-bold text-sm">
                  {t.contato.address}<br/>
                  <span className="text-stone-500 font-normal mt-1 block">{t.contato.addressSub}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-white shrink-0" />
                <p className="text-white font-bold text-sm">{t.contato.hours} <span className="text-stone-500 font-normal">{t.contato.hoursSub}</span></p>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="w-6 h-6 text-white shrink-0" />
                <p className="text-white font-bold text-sm">@entulho.diy</p>
              </div>
            </div>
            <div className="flex gap-4 flex-col sm:flex-row">
              <a href="https://maps.google.com/?q=Entulho+D.I.Y.,+Florian%C3%B3polis" target="_top" rel="noopener noreferrer" className="bg-stone-100 text-black px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors text-center">
                {t.contato.btnMaps}
              </a>
              <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="border border-stone-700 text-white px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-stone-900 transition-colors text-center">
                {t.contato.btnInsta}
              </a>
            </div>
          </div>
          
          <div className="w-full h-[500px] bg-stone-900 rounded-sm overflow-hidden">
             <iframe 
               src="https://maps.google.com/maps?q=Entulho+D.I.Y.+Skate+Spot,+Florian%C3%B3polis&t=&z=17&ie=UTF8&iwloc=&output=embed" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer className="bg-black py-16 px-6 border-t border-stone-800">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-center lg:justify-center">
            <div className="mb-6">
              <img src={logoFull} alt="Entulho Logo" className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] inline-block object-contain invert opacity-90 " />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">{t.nav.contato}</h4>
            <ul className="text-stone-400 text-sm space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-stone-600" />
                <span>
                  {t.contato.address}<br/>
                  <span className="text-stone-500">{t.contato.addressSub}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-5 h-5 shrink-0 text-stone-600" />
                <a href={INSTAGRAM_URL} target="_top" rel="noopener noreferrer" className="hover:text-white transition-colors">@entulho.diy</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-6">Menu</h4>
            <ul className="text-stone-400 text-sm space-y-3">
              <li><button onClick={() => scrollTo('historia')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.historia}</button></li>
              <li><button onClick={() => scrollTo('documentario')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.documentario}</button></li>
              <li><button onClick={() => scrollTo('galeria')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.galeria}</button></li>
              <li><button onClick={() => scrollTo('produtos')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.produtos}</button></li>
              <li><button onClick={() => scrollTo('apista')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.pista}</button></li>
              <li><button onClick={() => scrollTo('unico')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.unico}</button></li>
              <li><button onClick={() => scrollTo('feedbacks')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.feedbacks}</button></li>
              <li><button onClick={() => scrollTo('contato')} className="hover:text-white transition-colors uppercase text-xs tracking-widest font-bold">{t.nav.contato}</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest text-stone-600 uppercase text-center">
          <span>2026 todos os direitos reservados. feito com amor, suor e cimento</span>
          <span>site produzido por OBN Creative</span>
        </div>
      </footer>

      {/* Petition Modal */}
      {isPetitionOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" style={{ zIndex: 9997 }}>
          <div className="bg-stone-900 border border-stone-800 p-8 max-w-md w-full relative">
            <button 
              onClick={() => { setIsPetitionOpen(false); setPetitionStatus("idle"); }}
              className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-brand font-black uppercase mb-2 text-white">Colabore no nosso abaixo assinado</h3>
            
            {petitionStatus === 'success' ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-widest">Obrigado pelo apoio!</h4>
                <p className="text-stone-400 text-sm">Sua assinatura foi registrada com sucesso.</p>
                <button 
                  onClick={() => setIsPetitionOpen(false)}
                  className="mt-8 bg-white text-black px-8 py-3 font-bold text-xs tracking-widest uppercase hover:bg-stone-200 transition-colors w-full"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <p className="text-stone-400 text-sm mb-6">{t.petition.desc}</p>
                <form 
                  action="https://formspree.io/f/xykrkpep"
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPetitionStatus("submitting");
                    const form = e.target;
                    const data = new FormData(form);
                    fetch(form.action, {
                      method: form.method,
                      body: data,
                      headers: { 'Accept': 'application/json' }
                    }).then(response => {
                      if (response.ok) {
                        setPetitionStatus("success");
                      } else {
                        alert(t.petition.error);
                        setPetitionStatus("idle");
                      }
                    }).catch(error => {
                      alert(t.petition.error);
                      setPetitionStatus("idle");
                    });
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-stone-500 uppercase mb-1">{t.petition.name}</label>
                    <input type="text" name="name" required className="w-full bg-black border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 transition-colors" placeholder={t.petition.namePlaceholder} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-stone-500 uppercase mb-1">{t.petition.email}</label>
                    <input type="email" name="email" required className="w-full bg-black border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 transition-colors" placeholder={t.petition.emailPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-stone-500 uppercase mb-1">{t.petition.doc}</label>
                    <input type="text" name="document" required className="w-full bg-black border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 transition-colors" placeholder={t.petition.docPlaceholder} />
                  </div>
                                    <div>
                    <label className="block text-xs font-bold tracking-widest text-stone-500 uppercase mb-1">{t.petition.city}</label>
                    <input type="text" name="city" required className="w-full bg-black border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 transition-colors" placeholder={t.petition.cityPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-stone-500 uppercase mb-1">{t.petition.country}</label>
                    <input type="text" name="country" required className="w-full bg-black border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-stone-500 transition-colors" placeholder={t.petition.countryPlaceholder} />
                  </div>
                  <button 
                    type="submit" 
                    disabled={petitionStatus === 'submitting'}
                    className="w-full bg-white text-black px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-stone-200 transition-colors mt-4 disabled:opacity-50"
                  >
                    {petitionStatus === 'submitting' ? t.petition.btnSubmitting : t.petition.btnSign}
                  </button>
                </form>
                <p className="text-stone-600 text-[10px] text-center mt-4 uppercase tracking-widest">{t.petition.footerInfo}</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-white text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          </div>
        </button>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" style={{ zIndex: 9997 }} onClick={() => setIsCartOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-950 border-l border-stone-800 flex flex-col p-6 shadow-2xl" style={{ zIndex: 9998 }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Carrinho
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-white p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center text-stone-500 py-12">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Seu carrinho está vazio</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item, i) => (
                    <li key={i} className="bg-stone-900 border border-stone-800 p-4 flex justify-between items-center">
                      <div>
                        <p className="text-white font-bold text-sm mb-1">{item.title}</p>
                        <p className="text-stone-400 text-xs">Tamanho: {item.size}</p>
                      </div>
                      <button 
                        onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-stone-600 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="pt-6 border-t border-stone-800 mt-6">
                <button 
                  onClick={checkout}
                  className="w-full bg-white text-black py-4 text-sm font-bold tracking-widest uppercase hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Finalizar Compra
                </button>
                <div className="text-[11px] text-stone-400 text-center mt-4 bg-stone-900 border border-stone-800 p-4">
                  <strong className="text-white block mb-1">⚠️ IMPORTANTE:</strong> 
                  Ao clicar em finalizar, o resumo do seu pedido será <strong>copiado automaticamente</strong>. 
                  Você será redirecionado para o Instagram, basta <strong>colar a mensagem</strong> no Direct para concluir o pedido via PIX.
                </div>
              </div>
            )}
          </div>
        </>
      )}

      
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImageIndex(null)}>
          <button 
            className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors z-10 bg-stone-900/50 p-3 rounded-full hover:bg-stone-800"
            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
          >
            <X className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute left-6 text-stone-400 hover:text-white transition-colors bg-stone-900/50 p-4 rounded-full z-10 hover:bg-stone-800"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedImageIndex(prev => prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1); 
            }}
          >
            <ArrowRight className="w-8 h-8 rotate-180" />
          </button>
          
          <button 
            className="absolute right-6 text-stone-400 hover:text-white transition-colors bg-stone-900/50 p-4 rounded-full z-10 top-1/2 -translate-y-1/2 hover:bg-stone-800"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedImageIndex(prev => prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0); 
            }}
          >
            <ArrowRight className="w-8 h-8" />
          </button>

          <img 
            src={galleryImages[selectedImageIndex]} 
            alt="Gallery fullscreen" 
            className="max-w-full max-h-[90vh] object-contain transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Intl Modal */}
      {showIntlModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-stone-950 border border-stone-800 p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowIntlModal(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">{t.apoie.intlTitle || "Transferência Internacional"}</h3>
            
            <div className="space-y-6 text-xs font-mono text-stone-400">
              <div className="flex justify-between items-center bg-black p-4 border border-stone-800">
                <div><strong className="text-stone-300 font-sans text-[10px] uppercase tracking-widest block mb-1">{t.apoie.intlTitular || "Titular"}</strong>Guilherme Camargo Sanz E Silva<br/>CPF: 026.690.750-45</div>
                <button className="text-stone-500 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText("Guilherme Camargo Sanz E Silva\nCPF: 026.690.750-45")}><Copy className="w-4 h-4" /></button>
              </div>
              
              <div className="flex justify-between items-center bg-black p-4 border border-stone-800">
                <div><strong className="text-stone-300 font-sans text-[10px] uppercase tracking-widest block mb-1">{t.apoie.intlBanco || "Banco"}</strong>Community Federal Savings Bank<br/>8916 Jamaica Ave, Woodhaven, NY 11421</div>
                <button className="text-stone-500 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText("Community Federal Savings Bank\n8916 Jamaica Ave, Woodhaven, NY 11421")}><Copy className="w-4 h-4" /></button>
              </div>
              
              <div className="flex justify-between items-center bg-black p-4 border border-stone-800">
                <div><strong className="text-stone-300 font-sans text-[10px] uppercase tracking-widest block mb-1">{t.apoie.intlConta || "Conta"}</strong>652133375780 (Checking)</div>
                <button className="text-stone-500 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText("652133375780")}><Copy className="w-4 h-4" /></button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center bg-black p-4 border border-stone-800">
                  <div><strong className="text-stone-300 font-sans text-[10px] uppercase tracking-widest block mb-1">{t.apoie.intlACH || "ACH Routing"}</strong>026073150</div>
                  <button className="text-stone-500 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText("026073150")}><Copy className="w-4 h-4" /></button>
                </div>
                <div className="flex justify-between items-center bg-black p-4 border border-stone-800">
                  <div><strong className="text-stone-300 font-sans text-[10px] uppercase tracking-widest block mb-1">{t.apoie.intlSwift || "Código SWIFT"}</strong>CMFGUS33</div>
                  <button className="text-stone-500 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText("CMFGUS33")}><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                const text = `Titular: Guilherme Camargo Sanz E Silva\nCPF: 026.690.750-45\nBanco: Community Federal Savings Bank\nEndereço do Banco: 8916 Jamaica Ave, Woodhaven, NY 11421\nConta: 652133375780 (Checking)\nACH Routing: 026073150\nCódigo SWIFT: CMFGUS33`;
                navigator.clipboard.writeText(text);
                alert("Todos os dados copiados!");
              }}
              className="bg-white text-black px-6 py-4 mt-8 font-bold text-xs tracking-widest hover:bg-stone-200 transition-colors uppercase w-full flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copiar Tudo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

