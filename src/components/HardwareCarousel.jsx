import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ... (Tu array hardwareData se mantiene exactamente igual)
const hardwareData = [
  {
    id: 1,
    title: "Square Handheld",
    description: "El potente PDV repleto de funciones que cabe en tu bolsillo.",
    linkText: "Conoce Square Handheld",
    url: "/us/es/hardware/handheld",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/5zBAYsJC0Po4IqeRGLwJyq/14d2335fec9891dfb95357da33c7dcf3/PD07139-USES_payments-hardware-handheld.png?fm=webp&q=85&fit=fill&w=1460"
  },
  {
    id: 2,
    title: "Square Terminal",
    description: "Una terminal de PDV completa con pagos integrados e impresora de recibos.",
    linkText: "Explora Square Terminal",
    url: "https://squareup.com/us/es/hardware/terminal",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/2VK5tNky4MzzOtJlTSuKCx/984d71585c9ce32c730908ff1ea58f26/PD07328-USES-hardware-terminal.png?fm=webp&q=85&fit=fill&w=1460"
  },
  {
    id: 3,
    title: "Square Register",
    description: "Empieza a administrar todo tu negocio de inmediato con una solución totalmente integrada de dos pantallas.",
    linkText: "Explora Square Register",
    url: "https://squareup.com/us/es/hardware/register",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/5OCGg799pGuUQV7H9sedc9/7fec0224427a55d5a2b55d89102185cc/PD07328-USES-hardware-register.png?fm=webp&q=85&fit=fill&w=1460"
  },
  {
    id: 4,
    title: "Square Reader sin contacto y con chip",
    description: "Prepárate para cualquier venta, en cualquier lugar, con un diseño portátil que se conecta a tu dispositivo.",
    linkText: "Explora Square Reader sin contacto y con chip",
    url: "https://squareup.com/us/es/hardware/contactless-chip-reader",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/2h7BnoznkrXxESV1NWuW0E/0fe3e9f6e5dbf04a9f66ab0aea98140a/PD07328-hardware-reader.png?fm=webp&q=85&fit=fill&w=1460"
  },
  {
    id: 5,
    title: "Square Stand",
    description: "Dale un giro al proceso de pago y simplifícalo con un PDV para iPad que ya sabes cómo usar.",
    linkText: "Explora Square Stand",
    url: "https://squareup.com/us/es/hardware/stand",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/4yLTmkDRm3lJq3SY19zjbC/d83f137120ee9168caf9b5912a08a575/PD07328-USEShardware-stand.png?fm=webp&q=85&fit=fill&w=1460"
  },
  {
    id: 6,
    title: "Square Reader para tarjetas de banda magnética",
    description: "Comienza a vender en cuestión de minutos con un pequeño lector que se conecta sin problemas y nunca necesita cargarse.",
    linkText: "Explora Square Reader para tarjetas de banda magnética",
    url: "https://squareup.com/us/es/hardware/reader",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/7tfPF18qIqrlYZjL1bHwhf/d484d4eaa8784d357d23b17311b61be1/PD07328-hardware-magstripe.png?fm=webp&q=85&fit=fill&w=1460"
  },
  {
    id: 7,
    title: "Square Kiosk",
    description: "Elimina filas y libera al personal con un kiosco administrado por iPad que puedes configurar completamente por cuenta propia.",
    linkText: "Explora Square Kiosk",
    url: "https://squareup.com/us/es/hardware/kiosk",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/26O1psKys9y7ZbfDEBeKNX/37e5ee9da402a9ca8719721c7aa1f318/PD07789-USES-hardware-kiosk.png?fm=webp&q=85&fit=fill&w=1460"
  }
];

const HardwareCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Refs
  const textContainerRef = useRef(null);
  const trackRef = useRef(null);
  const imagesRef = useRef([]);

  // --- NAVEGACIÓN ---
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % hardwareData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + hardwareData.length) % hardwareData.length);
  };

  // --- ANIMACIONES (GSAP) ---
  useGSAP(() => {
    
    // 1. TEXTO
    if (textContainerRef.current) {
        const textElements = textContainerRef.current.children;
        gsap.fromTo(textElements, 
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                stagger: 0.1, 
                ease: "power2.out" 
            }
        );
    }

    // 2. TRACK
    if (trackRef.current) {
        const totalSlides = hardwareData.length;
        const xPercentage = -(activeIndex * 100) / totalSlides;

        gsap.to(trackRef.current, {
            xPercent: xPercentage,
            duration: 1.2,
            ease: "expo.out"
        });
    }

    // 3. IMÁGENES
    imagesRef.current.forEach((img, index) => {
        if (!img) return;
        
        const isActive = index === activeIndex;

        gsap.to(img, {
            scale: isActive ? 1 : 0.9,
            opacity: isActive ? 1 : 0.4,
            filter: isActive ? "blur(0px)" : "blur(2px)",
            duration: 1.2,
            ease: "expo.out"
        });
    });

  }, [activeIndex]);

  const currentItem = hardwareData[activeIndex];

  // Detectar ancho de pantalla para ajustar el "peek" (opcional, pero mejora UX en móvil)
  // Nota: Para mantenerlo simple con CSS puro en el style, usamos una variable o media query lógica
  // En este caso, usaremos una lógica CSS simple en el style del track.

  return (
    // CAMBIO 1: Ajuste de padding vertical (py-12 en movil, py-24 en desktop) y padding horizontal (px-4 vs px-12)
    <section className="bg-white w-full py-12 md:py-24 px-4 md:px-12 overflow-hidden">
      
      {/* Título: Ajuste de tamaño de fuente (text-3xl vs text-[56px]) */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-20">
        <h2 className="text-3xl md:text-[56px] font-serif text-gray-900 leading-tight tracking-tight">
          Hardware para mejorar tu día a día
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
        
        {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
        <div className="w-full lg:w-1/3 flex flex-col justify-center lg:justify-between relative z-20 py-4">
          
          <div ref={textContainerRef} className="flex flex-col items-start min-h-[180px] md:min-h-[200px]">
            {/* Título del item: Ajuste responsive */}
            <h3 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              {currentItem.title}
            </h3>
            {/* Descripción: Ajuste responsive */}
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              {currentItem.description}
            </p>
            <a 
              href={currentItem.url} 
              className="inline-flex items-center text-base md:text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors group"
            >
              <span className="hover:underline underline-offset-4 decoration-2">
                 {currentItem.linkText}
              </span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} strokeWidth={3} />
              </span>
            </a>
          </div>

          {/* Botones: Ajuste para que no estén tan pegados en móvil */}
          <div className="flex items-center gap-4 mt-6 md:mt-8">
            <button 
              onClick={handlePrev}
              className="group p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none active:scale-95 touch-manipulation"
              aria-label="Anterior"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-900 group-hover:scale-105 transition-transform" />
            </button>
            <button 
              onClick={handleNext}
              className="group p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none active:scale-95 touch-manipulation"
              aria-label="Siguiente"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900 group-hover:scale-105 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: CARRUSEL --- */}
        {/* CAMBIO 2: Altura dinámica. h-[320px] en móvil, crece a lg:h-[600px] para desktop */}
        <div className="w-full lg:w-2/3 relative h-[320px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl bg-gray-50/30">
            
            <div 
                ref={trackRef}
                className="flex h-full items-center"
                style={{ 
                    // En desktop mantenemos el 85% para el efecto "peek".
                    // En CSS, esto se comporta bien responsive si el contenedor padre cambia de tamaño.
                    width: `${hardwareData.length * 85}%`, 
                    display: 'flex' 
                }} 
            >
                {hardwareData.map((item, index) => (
                    <div 
                        key={item.id}
                        style={{ width: `${100 / hardwareData.length}%` }} 
                        className="h-full flex-shrink-0 flex items-center justify-start px-2 md:px-4"
                    >
                          {/* Wrapper de la imagen */}
                          <div className="w-full h-full flex items-center justify-center relative p-2 md:p-4">
                            
                            <img
                                ref={el => imagesRef.current[index] = el}
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain drop-shadow-xl"
                                // CAMBIO 3: Max height ajustado para que no se corte en móvil
                                style={{ maxHeight: '100%' }}
                            />
                          </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default HardwareCarousel;