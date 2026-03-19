/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ChevronDown, MapPin, Phone, Mail, ArrowRight, Scale, Briefcase, FileText, Shield, Users, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto text-white relative z-50">
      <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-neutral-950">
          <Scale size={18} />
        </div>
        Advocacia.
      </div>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 text-sm font-medium items-center">
        <a href="#escritorio" className="hover:text-neutral-300 transition-colors">Escritório</a>
        <a href="#servicos" className="hover:text-neutral-300 transition-colors">Serviços</a>
        <a href="#fundadora" className="hover:text-neutral-300 transition-colors">Fundadora</a>
        <a href="#duvidas" className="hover:text-neutral-300 transition-colors">Dúvidas</a>
        <a href="#contato" className="bg-white text-neutral-950 px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-colors">
          Fale Conosco
        </a>
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-neutral-950 border-t border-neutral-800 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
          >
            <a href="#escritorio" onClick={() => setIsOpen(false)} className="text-lg font-medium">Escritório</a>
            <a href="#servicos" onClick={() => setIsOpen(false)} className="text-lg font-medium">Serviços</a>
            <a href="#fundadora" onClick={() => setIsOpen(false)} className="text-lg font-medium">Fundadora</a>
            <a href="#duvidas" onClick={() => setIsOpen(false)} className="text-lg font-medium">Dúvidas</a>
            <a href="#contato" onClick={() => setIsOpen(false)} className="bg-white text-neutral-950 px-5 py-3 rounded-xl text-center font-medium mt-4">
              Fale Conosco
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex justify-between items-center w-full text-left font-medium text-xl text-neutral-900 focus:outline-none"
      >
        {question}
        <ChevronDown className={`transform transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-neutral-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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

const faqs = [
  { q: "Como funciona a primeira consulta?", a: "A primeira consulta é uma reunião de alinhamento onde entenderemos a fundo o seu caso, analisaremos os documentos iniciais e traçaremos as possíveis estratégias jurídicas. Pode ser realizada presencialmente ou por videoconferência." },
  { q: "O escritório atende clientes de outras cidades?", a: "Sim. Com o processo eletrônico e as ferramentas de comunicação atuais, prestamos assessoria jurídica para clientes e empresas em todo o território nacional." },
  { q: "Qual o formato de cobrança dos honorários?", a: "Nossos honorários são estabelecidos de forma transparente após a análise da complexidade do caso. Trabalhamos com honorários contratuais fixos, por êxito ou modelos híbridos, sempre formalizados em contrato." },
  { q: "Vocês atendem pessoas físicas ou apenas empresas?", a: "Atendemos ambos. Embora tenhamos forte atuação empresarial (Societário, Contratos, M&A), também prestamos serviços de excelência para pessoas físicas, especialmente em Planejamento Sucessório e demandas estratégicas." }
];

export default function App() {
  return (
    <div className="bg-[#f8f7f5] min-h-screen font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Black Section */}
      <div className="bg-neutral-950 text-white pb-48 rounded-b-[3rem] md:rounded-b-[5rem]">
        <Navbar />
        
        <div className="pt-20 pb-10 px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-medium tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
          >
            Soluções Jurídicas <br className="hidden md:block" /> Estratégicas
          </motion.h1>
        </div>
      </div>
      
      {/* Overlapping Hero Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-neutral-950">
              Protegendo seus interesses com excelência.
            </h2>
            <p className="text-neutral-500 text-lg mb-8 leading-relaxed">
              Uma advocacia moderna, focada em resultados e no atendimento personalizado para empresas e indivíduos que buscam segurança jurídica.
            </p>
            <div className="flex gap-4">
              <a href="#contato" className="bg-neutral-950 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors">
                Agendar Reunião <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
              alt="Advogada no escritório" 
              className="w-full h-[400px] md:h-[500px] object-cover rounded-[2rem]"
            />
          </div>
        </motion.div>
      </div>

      {/* Escritório Section */}
      <section id="escritorio" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 w-full">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
              alt="Fachada do Escritório" 
              className="w-full h-[500px] object-cover rounded-[3rem] shadow-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-4">Nosso Espaço</h3>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-neutral-950">
              Um ambiente pensado para acolher e resolver.
            </h2>
            <p className="text-neutral-600 text-lg mb-6 leading-relaxed">
              Localizado no centro empresarial da cidade, nosso escritório reflete a essência de uma <strong>advocacia feminina</strong>: moderna, empática, detalhista e extremamente firme na defesa dos interesses de nossos clientes.
            </p>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Acreditamos que o ambiente jurídico não precisa ser frio ou intimidador. Criamos um espaço onde você se sente seguro e compreendido, com a certeza de que seu caso está sendo conduzido com a máxima excelência técnica e dedicação exclusiva.
            </p>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-4">Áreas de Atuação</h3>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-950">
            Nossos Serviços
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-neutral-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 text-neutral-900 group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300">
                <service.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-medium mb-4 text-neutral-900">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fundadora Section */}
      <section id="fundadora" className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-neutral-950 rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 text-white flex flex-col md:flex-row gap-16 items-center shadow-2xl">
          <div className="flex-1 order-2 md:order-1">
            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-400 mb-4">A Fundadora</h3>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Dra. Helena Albuquerque
            </h2>
            <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
              Com mais de uma década de atuação focada no direito empresarial e estratégico, fundei este escritório com um propósito claro: oferecer uma advocacia artesanal, onde cada cliente é único e cada estratégia é desenhada sob medida.
            </p>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Minha missão é desmistificar o direito, trazendo clareza, segurança e resultados efetivos, sempre com a sensibilidade e a força que a liderança feminina proporciona ao mercado jurídico.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2 w-full">
            <img 
              src="https://images.unsplash.com/photo-1580698543086-3114eb2be94b?auto=format&fit=crop&q=80&w=800" 
              alt="Dra. Helena Albuquerque" 
              className="w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[3rem]"
            />
          </div>
        </div>
      </section>

      {/* Dúvidas Section */}
      <section id="duvidas" className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-4">FAQ</h3>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-950">
            Dúvidas Frequentes
          </h2>
        </div>
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-16 shadow-xl flex flex-col lg:flex-row gap-16 border border-neutral-100">
          <div className="flex-1">
            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-500 mb-4">Fale Conosco</h3>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-neutral-950">
              Vamos conversar sobre o seu caso?
            </h2>
            <p className="text-neutral-500 text-lg mb-12 leading-relaxed">
              Preencha o formulário ao lado ou utilize nossos canais diretos de atendimento. Nossa equipe retornará o mais breve possível com total confidencialidade.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-neutral-700">
                <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-neutral-900" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Telefone / WhatsApp</p>
                  <p className="font-medium text-lg">+55 (11) 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-neutral-700">
                <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-neutral-900" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">E-mail</p>
                  <p className="font-medium text-lg">contato@advocacia.com.br</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-neutral-700">
                <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-neutral-900" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Endereço</p>
                  <p className="font-medium text-lg leading-snug">Av. Paulista, 1000 - Bela Vista<br/>São Paulo, SP - 01310-100</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 ml-1">Nome Completo</label>
                <input type="text" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white border focus:border-neutral-200 focus:outline-none focus:ring-4 focus:ring-neutral-950/5 transition-all" placeholder="Seu nome" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2 ml-1">E-mail</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white border focus:border-neutral-200 focus:outline-none focus:ring-4 focus:ring-neutral-950/5 transition-all" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2 ml-1">Telefone</label>
                  <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white border focus:border-neutral-200 focus:outline-none focus:ring-4 focus:ring-neutral-950/5 transition-all" placeholder="(11) 90000-0000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2 ml-1">Mensagem</label>
                <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border-transparent focus:bg-white border focus:border-neutral-200 focus:outline-none focus:ring-4 focus:ring-neutral-950/5 transition-all resize-none" placeholder="Como podemos ajudar?"></textarea>
              </div>
              <button className="w-full bg-neutral-950 text-white py-5 rounded-2xl font-medium hover:bg-neutral-800 transition-colors flex justify-center items-center gap-2 text-lg mt-4">
                Enviar Mensagem <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-white pt-24 pb-10 rounded-t-[3rem] md:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold tracking-tighter mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-neutral-950">
                <Scale size={18} />
              </div>
              Advocacia.
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Excelência jurídica com visão estratégica e atendimento personalizado. Uma advocacia feminina focada em resultados e na segurança dos seus negócios.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Navegação</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#escritorio" className="hover:text-white transition-colors">Escritório</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#fundadora" className="hover:text-white transition-colors">Fundadora</a></li>
              <li><a href="#duvidas" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contato</h4>
            <ul className="space-y-4 text-neutral-400">
              <li>contato@advocacia.com.br</li>
              <li>+55 (11) 99999-9999</li>
              <li className="leading-relaxed">Av. Paulista, 1000 - Bela Vista<br/>São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-800 text-neutral-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 Advocacia. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

