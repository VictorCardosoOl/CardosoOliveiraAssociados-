import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Menu, X, ChevronDown, MapPin, Phone, Mail, ArrowRight, Scale, Briefcase, FileText, Shield, Users, Building2, Plus } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// 1. Smooth Wrapper (Lenis + GSAP Sync)
function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Damping for heavy, luxurious feel (0.05 - 0.1)
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}

// 2. Magnetic Button (Microinteração)
function MagneticButton({ children, className, href, onClick }: { children: React.ReactNode, className?: string, href?: string, onClick?: () => void }) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.2); // Intensidade da atração magnética
      yTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (href) {
    return <a ref={buttonRef as any} href={href} onClick={onClick} className={className}>{children}</a>;
  }
  return <button ref={buttonRef as any} onClick={onClick} className={className}>{children}</button>;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    
    const showAnim = gsap.from(navRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.8,
      ease: "power3.out"
    }).progress(1);
    
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
        } else if (self.direction === 1 && window.scrollY > 100) {
          showAnim.reverse();
          setIsOpen(false); // Close mobile menu on scroll down
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);
  
  return (
    <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#111111]/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 text-[#F7F5F0]">
        <div className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#F7F5F0] rounded-full flex items-center justify-center text-[#111111] group-hover:scale-110 transition-transform duration-500">
            <Scale size={20} strokeWidth={1.5} />
          </div>
          Advocacia.
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 text-sm font-medium items-center tracking-wide">
          <a href="#escritorio" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Escritório</a>
          <a href="#servicos" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Serviços</a>
          <a href="#fundadora" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Fundadora</a>
          <a href="#duvidas" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">Dúvidas</a>
          <MagneticButton href="#contato" className="bg-[#F7F5F0] text-[#111111] px-6 py-3 rounded-full hover:bg-white transition-colors inline-block uppercase text-xs font-bold tracking-widest">
            Fale Conosco
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#F7F5F0]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>

        {/* Mobile Nav */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="absolute top-full left-0 right-0 bg-[#111111]/95 backdrop-blur-md border-t border-neutral-800 p-6 flex flex-col gap-6 md:hidden shadow-2xl text-[#F7F5F0] font-light tracking-wide"
          >
            <a href="#escritorio" onClick={() => setIsOpen(false)} className="text-lg hover:text-white transition-colors inline-block">Escritório</a>
            <a href="#servicos" onClick={() => setIsOpen(false)} className="text-lg hover:text-white transition-colors inline-block">Serviços</a>
            <a href="#fundadora" onClick={() => setIsOpen(false)} className="text-lg hover:text-white transition-colors inline-block">Fundadora</a>
            <a href="#duvidas" onClick={() => setIsOpen(false)} className="text-lg hover:text-white transition-colors inline-block">Dúvidas</a>
            <a href="#contato" onClick={() => setIsOpen(false)} className="bg-[#F7F5F0] text-[#111111] px-6 py-4 rounded-full text-center uppercase text-xs font-bold tracking-widest mt-4 hover:bg-white transition-colors">
              Fale Conosco
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

const services = [
  { icon: Building2, title: "Direito Societário", desc: "Estruturação, governança e resolução de conflitos societários com visão estratégica." },
  { icon: Briefcase, title: "Fusões e Aquisições", desc: "Assessoria completa em operações de M&A, due diligence e negociações complexas." },
  { icon: Users, title: "Planejamento Sucessório", desc: "Proteção patrimonial e organização sucessória para famílias e empresas." },
  { icon: FileText, title: "Contratos Complexos", desc: "Elaboração e revisão de instrumentos jurídicos para garantir segurança nas operações." },
  { icon: Scale, title: "Contencioso Estratégico", desc: "Atuação em litígios de alta complexidade, buscando os melhores resultados." },
  { icon: Shield, title: "Consultoria Preventiva", desc: "Mitigação de riscos legais e adequação à legislação vigente para o seu negócio." },
];

const FAQ_ITEMS = [
  { id: 1, question: "Como funciona a primeira consulta?", answer: "A primeira consulta é uma reunião de alinhamento onde entenderemos a fundo o seu caso, analisaremos os documentos iniciais e traçaremos as possíveis estratégias jurídicas. Pode ser realizada presencialmente ou por videoconferência." },
  { id: 2, question: "O escritório atende clientes de outras cidades?", answer: "Sim. Com o processo eletrônico e as ferramentas de comunicação atuais, prestamos assessoria jurídica para clientes e empresas em todo o território nacional." },
  { id: 3, question: "Qual o formato de cobrança dos honorários?", answer: "Nossos honorários são estabelecidos de forma transparente após a análise da complexidade do caso. Trabalhamos com honorários contratuais fixos, por êxito ou modelos híbridos, sempre formalizados em contrato." },
  { id: 4, question: "Vocês atendem pessoas físicas ou apenas empresas?", answer: "Atendemos ambos. Embora tenhamos forte atuação empresarial (Societário, Contratos, M&A), também prestamos serviços de excelência para pessoas físicas, especialmente em Planejamento Sucessório e demandas estratégicas." }
];

function FAQItem({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power4.out"
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut"
      });
    }
  }, [isOpen]);

  return (
    <div className="faq-item border-b border-neutral-300/50">
      <button 
        onClick={onClick}
        className="w-full py-10 flex justify-between items-center text-left group focus:outline-none"
      >
        <h3 className={`text-2xl md:text-3xl font-serif transition-all duration-500 ${isOpen ? 'translate-x-4 text-[#111111]' : 'text-neutral-500 group-hover:text-[#111111] group-hover:translate-x-2'}`}>
          {item.question}
        </h3>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-[#111111] text-[#F7F5F0] rotate-45' : 'bg-[#F7F5F0] text-neutral-400 group-hover:bg-[#111111] group-hover:text-[#F7F5F0] group-hover:scale-110 group-hover:rotate-90'}`}>
          <Plus size={20} strokeWidth={1.5} />
        </div>
      </button>
      
      <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
        <p className="text-lg text-neutral-500 max-w-2xl pb-10 leading-relaxed font-light">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        gsap.fromTo('.sticky-content', 
          { y: 80, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.4, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            }
          }
        );

        gsap.fromTo('.faq-item',
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
            }
          }
        );
      } else {
         gsap.fromTo(['.sticky-content', '.faq-item'], 
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="duvidas" ref={containerRef} className="py-40 px-6 bg-[#F7F5F0] text-[#111111]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* COLUNA ESQUERDA (Sticky) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky-content lg:sticky lg:top-40">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-6 block text-neutral-400">Suporte</span>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] tracking-tight">
              Dúvidas <br/> <span className="italic font-light text-neutral-400">Frequentes</span>
            </h2>
            <div className="w-12 h-[1px] bg-neutral-300 mb-8"></div>
            <p className="text-neutral-500 text-lg mb-12 leading-relaxed font-light">
              Reunimos as principais dúvidas de nossos clientes para oferecer transparência e segurança antes mesmo do nosso primeiro contato.
            </p>
            <MagneticButton href="#contato" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity group">
              Fale Conosco <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* COLUNA DIREITA (Lista) */}
        <div className="lg:col-span-7 lg:col-start-6">
          {FAQ_ITEMS.map((item, idx) => (
            <FAQItem 
              key={item.id} 
              item={item} 
              isOpen={openIndex === idx} 
              onClick={() => toggleItem(idx)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const escritorioRef = useRef<HTMLDivElement>(null);
  const escritorioImgRef = useRef<HTMLImageElement>(null);
  const escritorioTextRef = useRef<HTMLDivElement>(null);

  const fundadoraRef = useRef<HTMLDivElement>(null);
  const fundadoraImgRef = useRef<HTMLImageElement>(null);
  const fundadoraTextRef = useRef<HTMLDivElement>(null);

  const contatoRef = useRef<HTMLDivElement>(null);
  const contatoInfoRef = useRef<HTMLDivElement>(null);
  const contatoFormRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. Text Reveal (SplitType)
      if (heroTitleRef.current) {
        const split = new SplitType(heroTitleRef.current, { types: 'words,chars' });
        gsap.fromTo(split.chars, 
          { opacity: 0, y: 120, rotateX: -90, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0, 
            scale: 1,
            duration: 1.8, 
            stagger: 0.05, 
            ease: "power4.out",
            delay: 0.2
          }
        );
      }

      // 2. Hero Card Entrance (Inércia)
      if (heroCardRef.current) {
        gsap.fromTo(heroCardRef.current,
          { opacity: 0, y: 120, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power4.out", delay: 0.4 }
        );
      }

      // 3. Parallax Image (Profundidade)
      if (heroImageRef.current && heroCardRef.current) {
        gsap.fromTo(heroImageRef.current,
          { yPercent: -25, scale: 1.1 },
          {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
              trigger: heroCardRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5, // Add slight smoothing to scrub
            }
          }
        );
      }

      // 4. Services Stagger (Ritmo)
      if (servicesRef.current) {
        gsap.fromTo('.service-card',
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 75%",
            }
          }
        );
      }

      // 5. Escritório Section
      if (escritorioRef.current && escritorioImgRef.current && escritorioTextRef.current) {
        gsap.fromTo(escritorioImgRef.current,
          { yPercent: -25, scale: 1.1 },
          {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
              trigger: escritorioRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
        
        gsap.fromTo(escritorioTextRef.current.children,
          { opacity: 0, y: 60, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: escritorioRef.current,
              start: "top 70%",
            }
          }
        );
      }

      // 6. Fundadora Section
      if (fundadoraRef.current && fundadoraImgRef.current && fundadoraTextRef.current) {
        gsap.fromTo(fundadoraImgRef.current,
          { yPercent: -25, scale: 1.1 },
          {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
              trigger: fundadoraRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
        
        gsap.fromTo(fundadoraTextRef.current.children,
          { opacity: 0, y: 60, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: fundadoraRef.current,
              start: "top 70%",
            }
          }
        );
      }

      // 7. Contato Section
      if (contatoRef.current && contatoInfoRef.current && contatoFormRef.current) {
        gsap.fromTo(contatoInfoRef.current.children,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contatoRef.current,
              start: "top 75%",
            }
          }
        );

        gsap.fromTo(contatoFormRef.current.children,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contatoRef.current,
              start: "top 75%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div className="noise-overlay"></div>
      <div className="bg-[#F7F5F0] min-h-screen font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
        {/* Top Black Section */}
        <div ref={heroRef} className="bg-[#111111] text-[#F7F5F0] pb-48 rounded-b-[2rem] md:rounded-b-[4rem] pt-32 relative overflow-hidden">
          {/* Subtle gradient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
          
          <Navbar />
          
          <div className="pb-16 px-6 text-center relative z-10 mt-10 md:mt-20">
            <h1 
              ref={heroTitleRef}
              className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight mb-8 max-w-5xl mx-auto leading-[0.9] [perspective:1000px]"
            >
              Soluções Jurídicas <br className="hidden md:block" /> <span className="italic font-light text-white/80">Estratégicas</span>
            </h1>
          </div>
        </div>
        
        {/* Overlapping Hero Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-40 relative z-10">
          <div 
            ref={heroCardRef}
            className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-16 items-center border border-black/[0.03] group"
          >
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight mb-6 text-neutral-950 leading-snug">
                Protegendo seus interesses com excelência e visão de negócios.
              </h2>
              <p className="text-neutral-500 text-lg mb-10 leading-relaxed font-light">
                Uma advocacia moderna, focada em resultados e no atendimento personalizado para empresas e indivíduos que buscam segurança jurídica absoluta.
              </p>
              <div className="flex gap-4">
                <MagneticButton href="#contato" className="bg-[#111111] text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 hover:bg-neutral-800 transition-colors inline-flex text-sm tracking-wide uppercase group/btn">
                  Agendar Reunião <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
              </div>
            </div>
            <div className="flex-1 w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
              <img 
                ref={heroImageRef}
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                alt="Advogada no escritório" 
                className="w-full h-[450px] md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
        </div>

        {/* Escritório Section */}
        <section id="escritorio" ref={escritorioRef} className="max-w-7xl mx-auto px-6 py-40">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="flex-1 w-full overflow-hidden rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group">
              <img 
                ref={escritorioImgRef}
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                alt="Fachada do Escritório" 
                className="w-full h-[600px] object-cover scale-110 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div ref={escritorioTextRef} className="flex-1">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">Nosso Espaço</h3>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8 text-neutral-950 leading-[1.1]">
                Um ambiente pensado para <br/><span className="italic font-light">acolher e resolver.</span>
              </h2>
              <div className="w-12 h-[1px] bg-neutral-300 mb-8"></div>
              <p className="text-neutral-600 text-lg mb-6 leading-relaxed font-light">
                Localizado no centro empresarial da cidade, nosso escritório reflete a essência de uma <strong className="font-medium text-neutral-900">advocacia feminina</strong>: moderna, empática, detalhista e extremamente firme na defesa dos interesses de nossos clientes.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed font-light">
                Acreditamos que o ambiente jurídico não precisa ser frio ou intimidador. Criamos um espaço onde você se sente seguro e compreendido, com a certeza de que seu caso está sendo conduzido com a máxima excelência técnica e dedicação exclusiva.
              </p>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section id="servicos" ref={servicesRef} className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">Áreas de Atuação</h3>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tight text-neutral-950">
              Nossos Serviços
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="service-card bg-white p-12 rounded-[2rem] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-neutral-200/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7F5F0] rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150 ease-out opacity-50"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#F7F5F0] rounded-full flex items-center justify-center mb-8 text-neutral-900 group-hover:bg-[#111111] group-hover:text-[#F7F5F0] transition-colors duration-500 group-hover:scale-110">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-neutral-950 group-hover:text-neutral-700 transition-colors">{service.title}</h3>
                  <p className="text-neutral-500 leading-relaxed font-light">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fundadora Section */}
        <section id="fundadora" ref={fundadoraRef} className="max-w-7xl mx-auto px-6 py-40">
          <div className="bg-[#111111] rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-[#F7F5F0] flex flex-col md:flex-row gap-20 items-center shadow-2xl relative overflow-hidden">
             {/* Subtle gradient glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"></div>

            <div ref={fundadoraTextRef} className="flex-1 order-2 md:order-1 relative z-10">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6">A Fundadora</h3>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8 leading-[1.1]">
                Dra. Helena <br/><span className="italic font-light text-white/80">Albuquerque</span>
              </h2>
              <div className="w-12 h-[1px] bg-neutral-700 mb-8"></div>
              <p className="text-neutral-400 text-lg mb-6 leading-relaxed font-light">
                Com mais de uma década de atuação focada no direito empresarial e estratégico, fundei este escritório com um propósito claro: oferecer uma advocacia artesanal, onde cada cliente é único e cada estratégia é desenhada sob medida.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed font-light">
                Minha missão é desmistificar o direito, trazendo clareza, segurança e resultados efetivos, sempre com a sensibilidade e a força que a liderança feminina proporciona ao mercado jurídico.
              </p>
            </div>
            <div className="flex-1 order-1 md:order-2 w-full overflow-hidden rounded-[1.5rem] md:rounded-[2rem] relative z-10 group">
              <img 
                ref={fundadoraImgRef}
                src="https://images.unsplash.com/photo-1580698543086-3114eb2be94b?auto=format&fit=crop&q=80&w=800" 
                alt="Dra. Helena Albuquerque" 
                className="w-full h-[500px] md:h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-105 ease-out"
              />
            </div>
          </div>
        </section>

        {/* Dúvidas Section Premium */}
        <FAQSection />

        {/* Contato Section */}
        <section id="contato" ref={contatoRef} className="max-w-7xl mx-auto px-6 py-40">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-20 border border-neutral-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F7F5F0]/50 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            
            <div ref={contatoInfoRef} className="flex-1 relative z-10">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 mb-6">Fale Conosco</h3>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8 text-neutral-950 leading-[1.1]">
                Vamos conversar sobre o <br/><span className="italic font-light">seu caso?</span>
              </h2>
              <div className="w-12 h-[1px] bg-neutral-300 mb-8"></div>
              <p className="text-neutral-500 text-lg mb-12 leading-relaxed font-light">
                Preencha o formulário ao lado ou utilize nossos canais diretos de atendimento. Nossa equipe retornará o mais breve possível com total confidencialidade.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-start gap-6 text-neutral-700 group cursor-pointer">
                  <div className="w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-[#F7F5F0] transition-colors duration-500 group-hover:scale-110">
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">Telefone / WhatsApp</p>
                    <p className="font-serif text-xl text-neutral-900 group-hover:text-neutral-600 transition-colors">+55 (11) 99999-9999</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 text-neutral-700 group cursor-pointer">
                  <div className="w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-[#F7F5F0] transition-colors duration-500 group-hover:scale-110">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">E-mail</p>
                    <p className="font-serif text-xl text-neutral-900 group-hover:text-neutral-600 transition-colors">contato@advocacia.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 text-neutral-700 group cursor-pointer">
                  <div className="w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#111111] group-hover:text-[#F7F5F0] transition-colors duration-500 group-hover:scale-110">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-neutral-400 mb-2">Endereço</p>
                    <p className="font-serif text-xl text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors">Av. Paulista, 1000 - Bela Vista<br/>São Paulo, SP - 01310-100</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative z-10">
              <form ref={contatoFormRef} className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3 ml-1">Nome Completo</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#F7F5F0] border-transparent focus:bg-white border focus:border-neutral-300 focus:outline-none transition-all font-light" placeholder="Seu nome" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3 ml-1">E-mail</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-[#F7F5F0] border-transparent focus:bg-white border focus:border-neutral-300 focus:outline-none transition-all font-light" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3 ml-1">Telefone</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-[#F7F5F0] border-transparent focus:bg-white border focus:border-neutral-300 focus:outline-none transition-all font-light" placeholder="(11) 90000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3 ml-1">Mensagem</label>
                  <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-[#F7F5F0] border-transparent focus:bg-white border focus:border-neutral-300 focus:outline-none transition-all resize-none font-light" placeholder="Como podemos ajudar?"></textarea>
                </div>
                <MagneticButton className="w-full bg-[#111111] text-[#F7F5F0] py-5 rounded-2xl font-bold tracking-widest uppercase text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 mt-4 group/btn">
                  Enviar Mensagem <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#111111] text-[#F7F5F0] pt-32 pb-10 rounded-t-[2rem] md:rounded-t-[4rem] relative overflow-hidden">
           {/* Subtle gradient glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
           
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 relative z-10">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-serif font-bold tracking-tighter mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#F7F5F0] rounded-full flex items-center justify-center text-[#111111] hover:scale-110 transition-transform duration-500 cursor-pointer">
                  <Scale size={24} strokeWidth={1.5} />
                </div>
                Advocacia.
              </div>
              <p className="text-neutral-400 max-w-sm leading-relaxed font-light">
                Excelência jurídica com visão estratégica e atendimento personalizado. Uma advocacia feminina focada em resultados e na segurança dos seus negócios.
              </p>
            </div>
            <div>
              <h4 className="font-bold tracking-widest uppercase text-xs mb-8 text-white">Navegação</h4>
              <ul className="space-y-4 text-neutral-400 font-light">
                <li><a href="#escritorio" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Escritório</a></li>
                <li><a href="#servicos" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Serviços</a></li>
                <li><a href="#fundadora" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Fundadora</a></li>
                <li><a href="#duvidas" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Dúvidas Frequentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold tracking-widest uppercase text-xs mb-8 text-white">Contato</h4>
              <ul className="space-y-4 text-neutral-400 font-light">
                <li className="hover:text-white transition-colors cursor-pointer">contato@advocacia.com.br</li>
                <li className="hover:text-white transition-colors cursor-pointer">+55 (11) 99999-9999</li>
                <li className="leading-relaxed hover:text-white transition-colors cursor-pointer">Av. Paulista, 1000 - Bela Vista<br/>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-800 text-neutral-500 text-sm flex flex-col md:flex-row justify-between items-center relative z-10 font-light">
            <p>© {new Date().getFullYear()} Advocacia. Todos os direitos reservados.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors hover:-translate-y-1 inline-block duration-300">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors hover:-translate-y-1 inline-block duration-300">Instagram</a>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
