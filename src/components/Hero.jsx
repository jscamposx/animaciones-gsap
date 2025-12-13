import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Check } from 'lucide-react'; 

// --- IMPORTA TUS VIDEOS AQUÍ ---
import defaultVideo from '../assets/1359_CoreWebAmbient_POS_Edit_9_16x9.webm';

gsap.registerPlugin(ScrollTrigger);

const contentData = {
  food: {
    label: "Comida",
    title: "Alimentos y bebidas",
    desc: "Administra tu restaurante con las mejores funciones para servicio completo o rápido.",
    features: ["Pedidos rápidos", "Mesas y platos", "Cuentas de bar"],
    video: defaultVideo 
  },
  retail: {
    label: "Tienda",
    title: "Tiendas Minoristas",
    desc: "Todo lo que necesitas para vender en tienda y en línea. Sincroniza tu inventario.",
    features: ["Inventario real", "Perfiles clientes", "Ventas omnicanal"],
    video: "https://videos.pexels.com/video-files/3196057/3196057-uhd_2560_1440_25fps.mp4" 
  },
  beauty: {
    label: "Belleza",
    title: "Belleza y Estética",
    desc: "Agenda citas y envía recordatorios automáticos. Diseñado para salones y spas.",
    features: ["Reservas 24/7", "Recordatorios", "Gestión personal"],
    video: defaultVideo 
  },
  services: {
    label: "Servicios",
    title: "Servicios Pro",
    desc: "Facturación profesional y contratos digitales para consultores.",
    features: ["Facturas", "Pagos recurrentes", "Contratos"],
    video: defaultVideo
  }
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState('food');
  
  // Refs
  const containerRef = useRef(null);
  const rightSideWrapperRef = useRef(null);
  const videoInnerRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const leftContentRef = useRef(null);
  const leftContentInnerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // =========================================================
    // 🖥️ DESKTOP (> 1024px): Split Horizontal
    // =========================================================
    mm.add("(min-width: 1024px)", () => {
        // 1. SETUP INICIAL DESKTOP: 
        // El panel izquierdo empieza con ancho 0 pero ALTURA COMPLETA (aquí estaba el error)
        gsap.set(leftContentRef.current, { width: "0%", height: "100%", opacity: 0 });
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=250%", 
                scrub: 1, 
                pin: true,
                pinSpacing: true,
            }
        });

        // 1. Expandir Video
        tl.to(videoInnerRef.current, { width: "95vw", height: "95vh", borderRadius: "0px", duration: 1 });
        
        // 2. Blur y Texto
        tl.to(overlayRef.current, { opacity: 1, backdropFilter: "blur(16px)", backgroundColor: "rgba(0,0,0,0.4)", duration: 1 }, ">-0.5"); 
        tl.fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "<"); 

        // 3. Split Screen Horizontal
        tl.to(textRef.current, { y: -50, opacity: 0, duration: 0.5 }, "+=0.2");
        
        tl.addLabel("splitMove");
        // Abrir panel izquierdo (Ancho 0% -> 50%)
        tl.to(leftContentRef.current, { width: "50%", opacity: 1, duration: 2 }, "splitMove");
        tl.fromTo(leftContentInnerRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "splitMove+=0.5");
        
        // Ajustar panel derecho
        tl.to(rightSideWrapperRef.current, { width: "50%", padding: "2rem", duration: 2 }, "splitMove");
        tl.to(videoInnerRef.current, { width: "100%", height: "70vh", borderRadius: "32px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", duration: 2 }, "splitMove");
        tl.to(overlayRef.current, { opacity: 0, duration: 1 }, "splitMove+=1");
    });

    // =========================================================
    // 📱 MÓVIL (< 1024px): Split Vertical
    // =========================================================
    mm.add("(max-width: 1023px)", () => {
        // 1. SETUP INICIAL MÓVIL:
        // El panel izquierdo empieza con ANCHO COMPLETO pero altura 0
        gsap.set(leftContentRef.current, { width: "100%", height: "0%", opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%", 
                scrub: 1, 
                pin: true,
            }
        });

        // 1. Expandir Video (Full Screen)
        tl.to(videoInnerRef.current, { width: "100vw", height: "100vh", borderRadius: "0px", duration: 1 });

        // 2. Blur y Texto
        tl.to(overlayRef.current, { opacity: 1, backdropFilter: "blur(12px)", backgroundColor: "rgba(0,0,0,0.4)", duration: 1 }, ">-0.5");
        tl.fromTo(textRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "<");

        // 3. Split Screen VERTICAL
        tl.to(textRef.current, { opacity: 0, duration: 0.5 }, "+=0.2");
        
        tl.addLabel("mobileSplit");
        
        // Video sube (Height 100% -> 40%)
        tl.to(rightSideWrapperRef.current, { height: "40%", width: "100%", padding: "1rem", duration: 2 }, "mobileSplit");
        tl.to(videoInnerRef.current, { width: "100%", height: "100%", borderRadius: "20px", duration: 2 }, "mobileSplit");
        
        // Contenido crece desde abajo (Height 0% -> 60%)
        tl.to(leftContentRef.current, { height: "60%", width: "100%", opacity: 1, duration: 2 }, "mobileSplit");
        tl.fromTo(leftContentInnerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "mobileSplit+=0.5");
        
        tl.to(overlayRef.current, { opacity: 0, duration: 1 }, "mobileSplit+=1");
    });

  }, { scope: containerRef });

  const currentContent = contentData[activeTab];

  return (
    <div className="bg-white w-full overflow-x-hidden">
      
      {/* HEADER HERO */}
      <section className="flex flex-col items-center justify-center pt-20  px-4 relative">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Punto de venta Square</span>
        <h1 className="text-5xl lg:text-8xl font-serif text-center text-gray-900 mb-8 leading-tight font-medium">
          Un PDV preparado <br /> para lo que tienes
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 rounded-full border-2 border-gray-900 font-bold text-gray-900 hover:bg-gray-100 transition-colors text-lg">Comenzar</button>
          <button className="px-8 py-4 rounded-full bg-black text-white font-bold border-2 border-black hover:bg-gray-800 transition-colors text-lg">Contactar ventas</button>
        </div>
      </section>

      {/* CONTENEDOR ANIMADO (PINNED) */}
      <div 
        ref={containerRef} 
        className="w-full h-screen flex flex-col lg:flex-row items-stretch overflow-hidden relative bg-white"
      >
        
        {/* --- LADO IZQUIERDO (CONTENIDO) --- */}
        <div 
            ref={leftContentRef}
            // ¡IMPORTANTE! He quitado el 'style' inline que causaba el conflicto.
            // Ahora GSAP controla el width/height inicial según el dispositivo.
            className="bg-white z-30 flex flex-col justify-center relative border-r border-gray-100 order-2 lg:order-1 overflow-hidden"
        >
            <div ref={leftContentInnerRef} className="w-full max-w-xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full ">
                
                {/* Tabs Responsive */}
                <div className="flex overflow-x-auto pb-4 lg:pb-0 lg:flex-wrap gap-2 mb-4 lg:mb-8 no-scrollbar">
                    {Object.keys(contentData).map((key) => (
                        <button 
                            key={key} 
                            onClick={() => setActiveTab(key)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300
                                ${activeTab === key 
                                    ? 'bg-black text-white border-black' 
                                    : 'bg-white text-gray-600 border-gray-200'
                                }`}
                        >
                            {contentData[key].label}
                        </button>
                    ))}
                </div>

                <div className="w-full h-px bg-gray-200 mb-4 lg:mb-8 hidden lg:block"></div>

                {/* Texto Dinámico */}
                <div className="space-y-4 lg:space-y-6">
                    <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 font-serif leading-tight">
                        {currentContent.title}
                    </h2>
                    <p className="text-sm lg:text-lg text-gray-600 leading-relaxed line-clamp-3 lg:line-clamp-none">
                        {currentContent.desc}
                    </p>

                    <div className="hidden lg:block">
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-wide pt-2 mb-2">
                            Accede rápidamente a:
                        </p>
                        <ul className="space-y-2">
                            {currentContent.features.map((item, index) => (
                                <li key={index} className="flex items-start text-base text-gray-700 font-medium">
                                    <div className="mt-1 mr-3 p-0.5 bg-black rounded-full flex-shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-2">
                        <a href="#" className="inline-flex items-center text-base lg:text-lg font-bold text-black hover:underline group">
                            Obtén más información
                            <ArrowUpRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* --- LADO DERECHO (VIDEO) --- */}
        <div 
            ref={rightSideWrapperRef} 
            className="h-full flex items-center justify-center relative z-20 order-1 lg:order-2"
        >
            <div 
                ref={videoInnerRef}
                className="relative overflow-hidden shadow-2xl bg-black"
                style={{ width: '85%', height: '70vh', borderRadius: '24px' }} 
            >
                <video 
                    key={activeTab} 
                    autoPlay muted loop playsInline 
                    className="w-full h-full object-cover absolute inset-0 z-0 transition-opacity duration-500"
                >
                    <source src={currentContent.video} type="video/webm" />
                    <source src={currentContent.video} type="video/mp4" />
                </video>

                <div ref={overlayRef} className="absolute inset-0 z-10 pointer-events-none opacity-0" style={{ backdropFilter: 'blur(0px)' }}></div>
                
                <div ref={textRef} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none opacity-0">
                    <h2 className="text-white text-2xl lg:text-6xl font-bold leading-tight drop-shadow-lg font-serif">
                    Ponte en marcha con un <br /> PDV personalizado.
                    </h2>
                </div>
            </div>
        </div>

      </div>

      <div className="h-[50vh] bg-gray-50 flex items-center justify-center relative z-10">
        <p className="text-gray-400">Continúa haciendo scroll...</p>
      </div>
    </div>
  );
};

export default Hero;