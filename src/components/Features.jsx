import React, { useRef, useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// --- DATOS (Sin cambios) ---
const featuresData = [
  {
    title: "Acepta cualquier tipo de pago",
    description: "Recibe pagos en persona, en línea o por teléfono, y luego accede a tu dinero al instante.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/ah0miZPiEPGcHXq7ee7zO/5842168cbe1a1abadf82a90489ee5a90/PD07327-USES-features-payment.png?fm=webp&q=85&fit=fill&w=958",
    alt: "Terminal de pago Square",
    modalDetails: [
        { headline: "Tipos de pago", text: "Acepta las principales tarjetas de crédito, pagos sin contacto, pagos ingresados manualmente, efectivo y tarjetas de regalo Square." },
        { headline: "Montos de propina personalizados", text: "Ofrece a los clientes opciones de propina predefinidas en pantalla o con recibos impresos." },
        { headline: "Pagos sin conexión", text: "Sigue haciendo ventas aun si pierdes el servicio o la conexión Wi-Fi. Guardaremos tus recibos y pagos sin conexión durante 24 horas." },
        { headline: "Descuentos automáticos", text: "Crea descuentos automáticos para artículos específicos, categorías, cantidades, especiales diarios u ofertas de tiempo limitado." },
        { headline: "Transferencias rápidas", text: "Transfiere fondos a una cuenta bancaria externa gratis al siguiente día hábil o al instante por una comisión." },
        { headline: "Seguridad integrada", text: "La protección contra fraudes, la seguridad de datos, la administración de reclamos y el cumplimiento de los estándares PCI están integrados en tu PDV." }
    ]
  },
  {
    title: "Vende de todo",
    description: "Personaliza tu catálogo con artículos, servicios o paquetes.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/6VhwqJWH1JEITY3Cf6VJnq/42cdf18518dc4f7d9012fefd7b756c5d/PD07327-USES-features-sell.png?fm=webp&q=85&fit=fill&w=958",
    alt: "Interfaz de venta",
    modalDetails: [
        { headline: "Catálogo flexible", text: "Crea variantes de artículos (tamaños, colores) y modificadores complejos para pedidos personalizados." },
        { headline: "Gestión de inventario", text: "Recibe alertas de stock bajo y sincroniza tu inventario en tiempo real entre tu tienda física y en línea." },
        { headline: "Códigos de barras", text: "Genera e imprime etiquetas de códigos de barras para escanear productos rápidamente en la caja." },
        { headline: "Venta a granel", text: "Vende artículos por peso o longitud conectando una báscula compatible al sistema." }
    ]
  },
  {
    title: "Trabaja de manera rápida y organizada",
    description: "Un PDV intuitivo que no requiere capacitación compleja.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/1Upj6heZj0hvn7JmoZJnvi/1ac80e575f88e4eae3f22220e53c50fa/PD07327-features-organized.png?fm=webp&q=85&fit=fill&w=958",
    alt: "Organización",
    modalDetails: [
        { headline: "Permisos de equipo", text: "Controla qué información y funciones puede ver cada empleado con códigos de acceso personalizados." },
        { headline: "Perfiles de clientes", text: "Guarda información de tus clientes habituales, su historial de compras y preferencias automáticamente." },
        { headline: "Gestión de ubicaciones", text: "Administra múltiples sucursales desde una sola cuenta maestra con reportes unificados." }
    ]
  },
  {
    title: "Aprende y crece con cada venta",
    description: "Datos y estadísticas en tiempo real sobre tu negocio.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/19oGKq54H07C4WTWLRZWNG/0a5f35e20487a9d85762781c0633cb2d/PD07327-USES-features-grow.png?fm=webp&q=85&fit=fill&w=958",
    alt: "Crecimiento",
    modalDetails: [
        { headline: "Reportes de ventas", text: "Visualiza tus ventas brutas, netas y por categoría en tiempo real desde cualquier dispositivo." },
        { headline: "Análisis de empleados", text: "Identifica a tus mejores vendedores y optimiza los horarios laborales según el flujo de clientes." },
        { headline: "Integraciones", text: "Conecta tu PDV con aplicaciones de contabilidad como QuickBooks, Xero y más." }
    ]
  }
];

// --- MODAL: ANIMACIÓN SÓLIDA ---
const FeatureModal = ({ feature, onClose }) => {
  // Usamos refs separados para no afectar la opacidad del hijo al animar el padre
  const containerRef = useRef(null); 
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  
  const isClosing = useRef(false);

  useGSAP(() => {
    // ENTRADA
    // 1. El backdrop aparece suave
    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    
    // 2. El modal sube SÓLIDO (Solo Y, nada de opacidad)
    gsap.fromTo(modalRef.current, 
      { y: "100%" }, 
      { y: "0%", duration: 0.5, ease: "power3.out" }
    );
  }, { scope: containerRef });

  // FUNCIÓN DE CIERRE
  const handleClose = () => {
    if (isClosing.current) return;
    isClosing.current = true;

    const tl = gsap.timeline({
      onComplete: onClose // Desmontar React al terminar
    });

    // PASO 1: El modal baja SÓLIDO. 
    // No tocamos la opacidad, así que se ve blanco puro mientras baja.
    tl.to(modalRef.current, {
      y: "100%", 
      duration: 0.4,
      ease: "power3.in"
    });

    // PASO 2: El fondo negro se desvanece SIMULTÁNEAMENTE o un poco después
    // El '<' indica que empiece al mismo tiempo que la animación anterior
    tl.to(backdropRef.current, {
      opacity: 0,
      duration: 0.4
    }, "<"); 
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!feature) return null;

  return (
    // Contenedor fijo (Z-Index alto)
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      
      {/* 1. BACKDROP (Fondo negro) 
          Separado del modal para poder animar su opacidad independientemente.
      */}
      <div 
        ref={backdropRef}
        onClick={handleClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] cursor-pointer"
      ></div>
      
      {/* 2. VENTANA MODAL 
          No tiene opacidad animada. Solo se mueve en Y.
      */}
      <div 
        ref={modalRef} 
        className="relative bg-white w-full h-full md:w-[96%] md:max-w-[1600px] md:h-[92vh] md:rounded-xl shadow-2xl flex flex-col overflow-hidden will-change-transform"
      >
        
        {/* Header */}
        <div className="flex justify-between items-start pt-10 px-8 md:pt-14 md:px-16 pb-8 bg-white shrink-0">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-sans tracking-tight max-w-4xl">
                {feature.title}
            </h2>
            
            <button 
                onClick={handleClose} 
                className="p-3 hover:bg-gray-100 rounded-full transition-colors -mr-2 -mt-2"
                aria-label="Cerrar"
            >
                <X className="w-8 h-8 text-gray-900" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-16 pb-16 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 mt-8">
                {feature.modalDetails && feature.modalDetails.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="flex flex-col gap-4 pt-8 border-t border-gray-300"
                    >
                        <h4 className="text-lg font-bold text-gray-900 leading-snug">
                            {item.headline}
                        </h4>
                        <p className="text-[17px] text-gray-600 leading-relaxed font-light">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
            <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (Sin cambios) ---
const Features = () => {
  const containerRef = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.feature-card'); 
    rows.forEach((row) => {
      gsap.fromTo(row, 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: row, start: "top 85%", toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <>
      <section ref={containerRef} className="bg-white w-full py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto mb-20 md:mb-28">
          <h2 className="text-4xl md:text-[64px] font-serif text-gray-900 leading-[1.05] tracking-tight max-w-4xl">
            Vende sin problemas en una o cien sucursales
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto flex flex-col">
          {featuresData.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="w-full h-px bg-gray-200 mb-12"></div>
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24 mb-16">
                <div className="w-full lg:w-[45%]">
                  <div className="overflow-hidden rounded-xl cursor-pointer bg-gray-50 aspect-[4/3] lg:aspect-[16/10]" onClick={() => setSelectedFeature(feature)}>
                    <img src={feature.image} alt={feature.alt} className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105" />
                  </div>
                </div>
                <div className="w-full lg:w-[55%] flex flex-col justify-start pt-4">
                    <h3 className="text-3xl md:text-[32px] font-bold text-gray-900 mb-5 leading-tight">{feature.title}</h3>
                    <p className="text-[18px] text-gray-600 mb-8 leading-relaxed max-w-2xl">{feature.description}</p>
                    <button onClick={() => setSelectedFeature(feature)} className="inline-flex items-center text-[18px] font-bold text-gray-900 hover:underline decoration-2 underline-offset-4 transition-all">
                      Más información <Plus className="w-5 h-5 ml-2 stroke-[3]" />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedFeature && (
        <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      )}
    </>
  );
};

export default Features;