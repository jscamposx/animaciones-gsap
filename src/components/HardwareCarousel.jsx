import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const imagesRef = useRef([]); // Array de refs para controlar cada imagen individualmente

  // --- NAVEGACIÓN ---
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % hardwareData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + hardwareData.length) % hardwareData.length);
  };

  // --- ANIMACIONES (GSAP) ---
  useGSAP(() => {
    
    // 1. TEXTO: Animación en cascada (Stagger)
    // Seleccionamos los hijos del contenedor de texto (h3, p, a)
    if (textContainerRef.current) {
        const textElements = textContainerRef.current.children;
        gsap.fromTo(textElements, 
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.5, 
                stagger: 0.1, // Retraso entre cada elemento
                ease: "power2.out" 
            }
        );
    }

    // 2. TRACK: Movimiento del carrusel
    if (trackRef.current) {
        const totalSlides = hardwareData.length;
        const xPercentage = -(activeIndex * 100) / totalSlides;

        gsap.to(trackRef.current, {
            xPercent: xPercentage,
            duration: 1.2, // Duración larga para suavidad
            ease: "expo.out" // 'expo' da ese efecto de arranque rápido y frenado muy suave (Apple style)
        });
    }

    // 3. IMÁGENES: Escala y Opacidad individual
    // En lugar de CSS, usamos GSAP para sincronizarlo con el movimiento del track
    imagesRef.current.forEach((img, index) => {
        if (!img) return;
        
        const isActive = index === activeIndex;

        gsap.to(img, {
            scale: isActive ? 1 : 0.9,      // Activa: 100%, Otras: 90%
            opacity: isActive ? 1 : 0.4,    // Activa: visible, Otras: muy tenues
            filter: isActive ? "blur(0px)" : "blur(2px)", // Desenfoque sutil a las inactivas
            duration: 1.2,
            ease: "expo.out" // Misma curva que el track para que se muevan al unísono
        });
    });

  }, [activeIndex]);

  const currentItem = hardwareData[activeIndex];

  return (
    <section className="bg-white w-full py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      
      {/* Título Estático */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-20">
        <h2 className="text-4xl md:text-[56px] font-serif text-gray-900 leading-tight tracking-tight">
          Hardware para mejorar tu día a día
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 min-h-[500px]">
        
        {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between relative z-20 py-4">
          
          {/* Contenedor del Texto (Usamos ref aquí para animar los hijos) */}
          <div ref={textContainerRef} className="flex flex-col items-start min-h-[200px]">
            <h3 className="text-2xl md:text-[32px] font-bold text-gray-900 mb-6 leading-tight">
              {currentItem.title}
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {currentItem.description}
            </p>
            <a 
              href={currentItem.url} 
              className="inline-flex items-center text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors group"
            >
              <span className="hover:underline underline-offset-4 decoration-2">
                 {currentItem.linkText}
              </span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} strokeWidth={3} />
              </span>
            </a>
          </div>

          {/* Botones Fijos */}
          <div className="flex items-center gap-4 mt-8">
            <button 
              onClick={handlePrev}
              className="group p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none active:scale-95"
              aria-label="Anterior"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900 group-hover:scale-105 transition-transform" />
            </button>
            <button 
              onClick={handleNext}
              className="group p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none active:scale-95"
              aria-label="Siguiente"
            >
              <ArrowRight className="w-6 h-6 text-gray-900 group-hover:scale-105 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- COLUMNA DERECHA: CARRUSEL --- */}
        <div className="w-full lg:w-2/3 relative h-[400px] lg:h-[600px] overflow-hidden rounded-xl bg-gray-50/30">
            
            {/* EL TRACK */}
            <div 
                ref={trackRef}
                className="flex h-full items-center"
                style={{ 
                    width: `${hardwareData.length * 85}%`, 
                    display: 'flex' 
                }} 
            >
                {hardwareData.map((item, index) => (
                    <div 
                        key={item.id}
                        // Cada contenedor ocupa una fracción exacta del track
                        style={{ width: `${100 / hardwareData.length}%` }} 
                        className="h-full flex-shrink-0 flex items-center justify-start px-4"
                    >
                         {/* Wrapper de la imagen */}
                         <div className="w-full h-full flex items-center justify-center relative p-4">
                            
                            <img
                                ref={el => imagesRef.current[index] = el} // Guardamos la ref para animarla
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain drop-shadow-xl"
                                style={{ maxHeight: '500px' }}
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