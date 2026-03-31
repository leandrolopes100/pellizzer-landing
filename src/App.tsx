import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Truck, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Package, 
  Clock, 
  Phone, 
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Globe,
  Lock,
  ArrowUpRight,
  UserCircle2
} from "lucide-react";

const MetricItem = ({ label, value, description }: { label: string, value: string, description: string }) => (
  <div className="border-l border-brand-orange/30 pl-6 py-2">
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">{label}</div>
    <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
  </div>
);

const SolutionCard = ({ icon: Icon, title, description, items }: { icon: any, title: string, description: string, items: string[] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-10 rounded-3xl hover:border-brand-orange/20 transition-all duration-500 group"
  >
    <div className="w-14 h-14 bg-brand-orange/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange/10 transition-colors">
      <Icon className="text-brand-orange w-7 h-7" />
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-zinc-400 mb-8 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
          <CheckCircle2 className="text-brand-orange w-4 h-4 mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function App() {
  const [userName, setUserName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tempName, setTempName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const whatsappNumber = "5551985147158"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá! Sou ${userName}, gostaria de agendar uma reunião estratégica com a Pellizzer Transportes.`;

  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setIsGenerating(true);
      
      // Simulate "generating" personalized content
      setTimeout(() => {
        setIsGenerating(false);
        setIsSubmitted(true);
        localStorage.setItem("pellizzer_user_name", tempName.trim());
      }, 2500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const savedName = localStorage.getItem("pellizzer_user_name");
    if (savedName) {
      setUserName(savedName);
      setIsSubmitted(true);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-orange selection:text-white bg-brand-black">
      {/* Scroll Progress Bar */}
      {isSubmitted && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-brand-orange z-[100] origin-left"
          style={{ scaleX }}
        />
      )}
      <AnimatePresence mode="wait">
        {!isSubmitted && !isGenerating && (
          <motion.div 
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black px-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange/10 via-transparent to-transparent opacity-50" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card p-12 rounded-[40px] max-w-lg w-full relative z-10 text-center border-white/10"
            >
              <div className="w-20 h-20 bg-brand-orange rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-orange/20">
                <UserCircle2 className="text-black w-10 h-10" />
              </div>
              <h2 className="text-4xl font-bold font-display text-white mb-4">Proposta Exclusiva.</h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                Preparamos uma apresentação estratégica **100% personalizada** para você e sua empresa. Como devemos chamá-lo(a)?
              </p>
              <form onSubmit={handleNameSubmit} className="space-y-6">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Seu nome ou cargo"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-orange/50 transition-colors text-lg text-center"
                />
                <button 
                  type="submit"
                  className="w-full bg-brand-orange text-black font-bold py-5 rounded-2xl text-xl hover:bg-white transition-all duration-300 shadow-lg shadow-brand-orange/10"
                >
                  Ver Minha Apresentação Personalizada
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {isGenerating && (
          <motion.div 
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-brand-black px-6 text-center"
          >
            <div className="w-24 h-24 relative mb-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-brand-orange/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-t-brand-orange rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="text-brand-orange w-8 h-8 animate-pulse" />
              </div>
            </div>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold font-display text-white mb-4"
            >
              Olá, {tempName}.
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-500 max-w-sm"
            >
              Estamos consolidando dados estratégicos e preparando sua apresentação personalizada...
            </motion.p>
            
            <div className="mt-12 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-brand-orange"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Navigation */}
          <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-brand-black/90 backdrop-blur-xl border-b border-white/5 h-20" : "bg-transparent h-24"}`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg shadow-brand-orange/20">
                  <Truck className="text-black w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tighter uppercase font-display leading-none">
                    Pellizzer<span className="text-brand-orange">Transportes</span>
                  </span>
                  <span className="text-[8px] font-bold text-zinc-500 tracking-[0.3em] uppercase mt-1">Excelência Operacional</span>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
                <a href="#proposta" className="hover:text-brand-orange transition-colors">Proposta</a>
                <a href="#frota" className="hover:text-brand-orange transition-colors">Frota</a>
                <a href="#solucoes" className="hover:text-brand-orange transition-colors">Soluções</a>
                <a href="#tecnologia" className="hover:text-brand-orange transition-colors">Tecnologia</a>
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 ${scrolled ? "bg-brand-orange text-black hover:bg-white" : "bg-white text-black hover:bg-brand-orange hover:text-white"}`}
                >
                  Agendar Reunião <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </nav>

          {/* Hero Section - Personalized */}
          <section id="proposta" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-brand-orange" />
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-[0.4em]">Apresentação Personalizada para {userName}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-6">
                  <TrendingUp className="w-4 h-4 text-brand-orange" />
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Consultoria Estratégica Logística</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-10 text-white">
                  {userName}, sua <br />
                  <span className="text-brand-orange">Logística</span> como <br />
                  <span className="italic">Ativo</span> de Valor.
                </h1>
                <p className="text-lg text-zinc-400 mb-12 max-w-xl leading-relaxed font-light">
                  {userName}, sabemos que no seu nível de gestão, transporte não é apenas entrega — é previsibilidade, governança e redução de custos. A Pellizzer Transportes é o parceiro que garante sua tranquilidade operacional.
                </p>
                
                <div className="grid grid-cols-2 gap-12 mb-12">
                  <MetricItem 
                    label="Agilidade Logística" 
                    value="99.8%" 
                    description="Processos otimizados para máxima velocidade."
                  />
                  <MetricItem 
                    label="Frota 100% Nova" 
                    value="9 anos" 
                    description="Veículos modernos com tecnologia de ponta."
                  />
                </div>

                <div className="flex flex-wrap gap-6">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-brand-orange text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all duration-300 flex items-center gap-3"
                  >
                    Falar com um Consultor <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative lg:h-[700px] flex items-center"
              >
                <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Logistics Management" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-black via-brand-black/20 to-transparent" />
                  
                  {/* Floating Dashboard Element */}
                  <div className="absolute bottom-10 left-10 right-10 glass-card p-8 rounded-3xl border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Monitoramento Ativo</span>
                      </div>
                      <BarChart3 className="text-brand-orange w-5 h-5" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-brand-orange"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <span>Eficiência de Rota e Otimização 100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Strategic Performance Dashboard Section */}
          <section className="py-24 bg-brand-orange relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/2" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex flex-col items-center mb-10">
                  <div className="bg-black p-3 rounded-2xl mb-6 shadow-xl">
                    <BarChart3 className="text-brand-orange w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-black uppercase tracking-[0.3em]">Performance em Tempo Real</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold font-display text-black leading-[0.9] mb-10">
                  Gestão Baseada em <br /> <span className="italic">Dados e Resultados</span>.
                </h2>
                <p className="text-black/80 text-xl font-medium leading-relaxed mb-16">
                  Nosso dashboard exclusivo permite que você acompanhe KPIs críticos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-6 bg-black/5 p-8 rounded-[32px] border border-black/10 backdrop-blur-sm"
                  >
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="text-brand-orange w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <div className="text-3xl font-bold text-black">99.8%</div>
                      <div className="text-xs font-bold text-black/60 uppercase tracking-widest">On-Time Delivery</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-6 bg-black/5 p-8 rounded-[32px] border border-black/10 backdrop-blur-sm"
                  >
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                      <ShieldCheck className="text-brand-orange w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <div className="text-3xl font-bold text-black">Zero</div>
                      <div className="text-xs font-bold text-black/60 uppercase tracking-widest">Avarias Críticas</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Fleet Section - New */}
          <section id="frota" className="py-32 bg-brand-black relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-sm font-bold text-brand-orange uppercase tracking-[0.4em] mb-6">Nossa Frota</h2>
                <p className="text-5xl md:text-6xl font-bold font-display text-white">
                  Tecnologia em <span className="text-brand-orange italic">Movimento</span>.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-[40px] overflow-hidden group border-white/5"
                >
                  <div className="h-[400px] relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200" 
                      alt="Carga Fechada" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-8">
                      <span className="bg-brand-orange text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">Carga Fechada</span>
                      <h3 className="text-3xl font-bold text-white">Operações Dedicadas</h3>
                    </div>
                  </div>
                  <div className="p-10">
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                      {userName}, trabalhamos com **Carga Fechada (FTL)** para garantir que sua mercadoria tenha exclusividade total, reduzindo manuseios e acelerando o tempo de trânsito.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 text-sm text-zinc-500">
                        <CheckCircle2 className="text-brand-orange w-4 h-4" /> Frota 100% Nova
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-500">
                        <CheckCircle2 className="text-brand-orange w-4 h-4" /> Telemetria de Ponta
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-[40px] overflow-hidden group border-white/5"
                >
                  <div className="h-[400px] relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=1200" 
                      alt="Carga Fracionada" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-8">
                      <span className="bg-brand-orange text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">Carga Fracionada</span>
                      <h3 className="text-3xl font-bold text-white">Distribuição Inteligente</h3>
                    </div>
                  </div>
                  <div className="p-10">
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                      Nossa solução de **Carga Fracionada (LTL)** oferece a agilidade que sua empresa precisa com custos otimizados, mantendo o padrão de excelência Pellizzer.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 text-sm text-zinc-500">
                        <CheckCircle2 className="text-brand-orange w-4 h-4" /> Rastreio em Tempo Real
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-500">
                        <CheckCircle2 className="text-brand-orange w-4 h-4" /> Agilidade Logística
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Why Pellizzer - Personalized for Manager */}
          <section className="py-32 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 text-white">
                    {userName}, por que a Pellizzer é a escolha certa para sua <span className="text-brand-orange italic">Gestão</span>?
                  </h2>
                  <div className="space-y-8">
                    {[
                      { 
                        title: "Previsibilidade Operacional", 
                        desc: "Eliminamos as incertezas da sua cadeia de suprimentos com processos padronizados e tecnologia de ponta." 
                      },
                      { 
                        title: "Redução de Custos Ocultos", 
                        desc: "Nossa frota nova e manutenção preventiva rigorosa evitam atrasos caros e multas contratuais para sua empresa." 
                      },
                      { 
                        title: "Compliance e Governança", 
                        desc: "Atuamos com total transparência e segurança jurídica, alinhados aos mais altos padrões de compliance do mercado." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-brand-orange w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                          <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="glass-card p-8 rounded-3xl border-brand-orange/20">
                      <BarChart3 className="text-brand-orange w-8 h-8 mb-4" />
                      <div className="text-3xl font-bold text-white mb-1">+25%</div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Eficiência Logística</div>
                    </div>
                    <div className="glass-card p-8 rounded-3xl">
                      <Lock className="text-brand-orange w-8 h-8 mb-4" />
                      <div className="text-3xl font-bold text-white mb-1">Zero</div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sinistros Graves</div>
                    </div>
                  </div>
                  <div className="space-y-6 pt-12">
                    <div className="glass-card p-8 rounded-3xl">
                      <Globe className="text-brand-orange w-8 h-8 mb-4" />
                      <div className="text-3xl font-bold text-white mb-1">100%</div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cobertura Nacional</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Pillars */}
          <section id="solucoes" className="py-32 bg-zinc-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-sm font-bold text-brand-orange uppercase tracking-[0.4em] mb-6">Excelência Corporativa</h2>
                  <p className="text-5xl md:text-6xl font-bold font-display text-white leading-tight">
                    Pilares de <br /> sua <span className="text-brand-orange italic">Segurança</span>.
                  </p>
                </div>
                <p className="text-zinc-500 max-w-sm font-light leading-relaxed">
                  {userName}, nossa estrutura foi desenhada para absorver a complexidade da sua logística, permitindo que você foque no que é essencial: o crescimento da sua empresa.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SolutionCard 
                  icon={TrendingUp}
                  title="Agilidade Estratégica"
                  description="Redução de lead time através de roteirização inteligente e processos cross-docking otimizados."
                  items={["Roteirização via IA", "Redução de custos fixos", "KPIs de performance mensal"]}
                />
                <SolutionCard 
                  icon={Truck}
                  title="Frota de Alta Disponibilidade"
                  description="Veículos de última geração com telemetria avançada, garantindo máxima disponibilidade operacional."
                  items={["Renovação trienal", "Manutenção preventiva 4.0", "Baixa emissão de carbono"]}
                />
                <SolutionCard 
                  icon={Users}
                  title="Capital Humano Especializado"
                  description="Equipe treinada em gestão de riscos e atendimento corporativo de alto nível."
                  items={["Treinamento comportamental", "Certificações de segurança", "Suporte 24/7 dedicado"]}
                />
                <SolutionCard 
                  icon={Globe}
                  title="Visibilidade Total"
                  description="Transparência absoluta em cada etapa do transporte com integração de dados em tempo real."
                  items={["Dashboard de acompanhamento", "Alertas automáticos", "Relatórios de conformidade"]}
                />
                <SolutionCard 
                  icon={Package}
                  title="Versatilidade de Carga"
                  description="Capacidade para operações complexas, desde cargas dedicadas até distribuição fracionada."
                  items={["Carga fechada (LTL/FTL)", "Logística reversa", "Armazenagem estratégica"]}
                />
                <SolutionCard 
                  icon={Lock}
                  title="Compliance & Segurança"
                  description="Rigorosos protocolos de segurança e gerenciamento de riscos para proteção do seu patrimônio."
                  items={["Gerenciamento de risco 24h", "Seguro RCF-DC e RCTR-C", "Auditorias periódicas"]}
                />
              </div>
            </div>
          </section>

          {/* Trained Staff Section - New */}
          <section className="py-32 bg-brand-black">
            <div className="max-w-7xl mx-auto px-6">
              <div className="glass-card rounded-[48px] p-12 md:p-20 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 blur-[100px] -z-10" />
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-10">
                      <Users className="text-brand-orange w-8 h-8" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
                      Funcionários <br /> <span className="text-brand-orange italic">Treinados</span> e Capacitados.
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
                      {userName}, na Pellizzer, acreditamos que a tecnologia só é eficaz quando operada por especialistas. Nossos motoristas e equipe operacional passam por treinamentos rigorosos de direção defensiva, gestão de riscos e atendimento corporativo.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">100%</div>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Equipe Qualificada</p>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">+500h</div>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Capacitação Anual</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000" 
                      alt="Trained Staff" 
                      className="rounded-3xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl border-brand-orange/20">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-brand-orange w-5 h-5" />
                        <span className="text-sm font-bold text-white">Capacitação Contínua</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section id="tecnologia" className="py-32 bg-brand-black">
            <div className="max-w-7xl mx-auto px-6">
              <div className="glass-card rounded-[48px] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16 border-white/5">
                <div className="lg:w-1/2">
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-10">
                    <MapPin className="text-brand-orange w-8 h-8" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
                    Telemetria de <span className="text-brand-orange italic">Ponta</span>.
                  </h2>
                  <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
                    Nossa plataforma de **Acompanhamento em Tempo Real** fornece visibilidade total da sua carga e frota. Utilizamos telemetria avançada para monitorar cada quilômetro, garantindo segurança e eficiência máxima.
                  </p>
                  <div className="space-y-6">
                    {[
                      { title: "Rastreio em Tempo Real", desc: "Visibilidade 24/7 de toda a frota e carga via satélite." },
                      { title: "Telemetria Avançada", desc: "Monitoramento de comportamento de condução e performance do veículo." },
                      { title: "Gestão de Riscos Integrada", desc: "Alertas automáticos e pronta resposta em qualquer intercorrência." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                          <p className="text-zinc-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-brand-orange/20 blur-[120px] rounded-full" />
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                    alt="Data Dashboard" 
                    className="relative z-10 rounded-3xl border border-white/10 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Process Section - New */}
          <section className="py-32 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-sm font-bold text-brand-orange uppercase tracking-[0.4em] mb-6">Metodologia Pellizzer</h2>
                <p className="text-5xl md:text-6xl font-bold font-display text-white">
                  Sua Jornada para a <span className="text-brand-orange italic">Eficiência</span>.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  { 
                    step: "01", 
                    title: "Diagnóstico Estratégico", 
                    desc: "Analisamos sua malha atual para identificar gargalos e oportunidades de redução de custos." 
                  },
                  { 
                    step: "02", 
                    title: "Implementação Tecnológica", 
                    desc: "Integramos nossa telemetria e sistemas de rastreio à sua operação para visibilidade total." 
                  },
                  { 
                    step: "03", 
                    title: "Otimização Contínua", 
                    desc: "Monitoramento em tempo real e ajustes constantes para garantir o melhor ROI logístico." 
                  }
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="text-8xl font-bold font-display text-white/5 absolute -top-10 -left-4 group-hover:text-brand-orange/10 transition-colors">
                      {item.step}
                    </div>
                    <div className="relative z-10 glass-card p-10 rounded-3xl border-white/5 h-full">
                      <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                      <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Corporate CTA */}
          <section id="contato" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-orange/5 -z-10" />
            <div className="max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-bold font-display mb-10 text-white leading-[0.9]">
                  {userName}, vamos elevar o nível da sua <span className="text-brand-orange italic">Logística</span>?
                </h2>
                <p className="text-zinc-400 text-xl mb-16 font-light leading-relaxed">
                  Agende uma conversa estratégica para entendermos seus desafios e apresentarmos uma solução sob medida para sua gestão.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl hover:bg-brand-orange hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-white/5"
                  >
                    <MessageCircle className="w-6 h-6" /> Agendar Reunião
                  </a>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Atendimento Direto</span>
                    <span className="text-white font-bold text-xl">(51) 98514-7158</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-20 border-t border-white/5 bg-brand-black">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-16 mb-20">
                <div className="col-span-2">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                      <Truck className="text-black w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter uppercase font-display text-white">
                      Pellizzer<span className="text-brand-orange">Transportes</span>
                    </span>
                  </div>
                  <p className="text-zinc-500 max-w-sm leading-relaxed font-light">
                    Referência em transporte rodoviário de alta performance, focada em entregar resultados estratégicos para o setor corporativo.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navegação</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li><a href="#proposta" className="hover:text-brand-orange transition-colors">Proposta</a></li>
                    <li><a href="#frota" className="hover:text-brand-orange transition-colors">Frota</a></li>
                    <li><a href="#solucoes" className="hover:text-brand-orange transition-colors">Soluções</a></li>
                    <li><a href="#tecnologia" className="hover:text-brand-orange transition-colors">Tecnologia</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Contato</h4>
                  <ul className="space-y-4 text-sm text-zinc-500">
                    <li>(51) 98514-7158</li>
                    <li>Matriz: Porto Alegre, RS</li>
                  </ul>
                </div>
              </div>
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
                  © 2026 Pellizzer Transportes. Excelência em Logística Rodoviária.
                </p>
                <div className="flex gap-8 text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                  <a href="#" className="hover:text-brand-orange transition-colors">Compliance</a>
                  <a href="#" className="hover:text-brand-orange transition-colors">LGPD</a>
                  <a href="#" className="hover:text-brand-orange transition-colors">ESG</a>
                </div>
              </div>
            </div>
          </footer>

          {/* Floating WhatsApp Button */}
          <motion.a 
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 z-50 glass-card text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 group"
          >
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Consultoria</span>
              <span className="text-sm font-bold">Falar com Especialista</span>
            </div>
          </motion.a>
        </motion.div>
      )}
    </div>
  );
}
