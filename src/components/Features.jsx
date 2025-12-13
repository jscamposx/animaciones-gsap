import React, { useRef, useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

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
        { headline: "Seguridad integrada", text: "La protección contra fraudes, la seguridad de datos, la administración de reclamos y el cumplimiento de los estándares PCI están integrados." }
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
        { headline: "Gestión de ubicaciones", text: "Administra múltiples sucursales desde una sola cuenta maestra con reportes unificados." },
        { headline: "Hardware compatible", text: "Conecta impresoras de recibos, cajones de efectivo y escáneres de forma plug-and-play." }
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
        { headline: "Integraciones", text: "Conecta tu PDV con aplicaciones de contabilidad como QuickBooks, Xero y más." },
        { headline: "Marketing integrado", text: "Envía correos electrónicos y mensajes de texto promocionales directamente desde tu base de datos de clientes." }
    ]
  }
];

// --- MODAL ---
const FeatureModal = ({ feature, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 }
    );
  }, { scope: modalRef });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!feature) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer transition-colors"></div>
      <div ref={contentRef} className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden">
        <div className="flex justify-between items-start p-8 md:p-12 pb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif max-w-2xl leading-tight">
                {feature.title}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4">
                <X className="w-8 h-8 text-gray-900" />
            </button>
        </div>
        <div className="p-8 md:p-12 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {feature.modalDetails && feature.modalDetails.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        <h4 className="text-lg font-bold text-gray-900">{item.headline}</h4>
                        <p className="text-base text-gray-600 leading-relaxed">{item.text}</p>
                        <div className="w-full h-px bg-gray-200 mt-4 md:hidden"></div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const Features = () => {
  const containerRef = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useGSAP(() => {
    // CAMBIO IMPORTANTE: Usamos un selector de clase en lugar de refs manuales
    // Esto es mucho más seguro para listas dinámicas
    const rows = gsap.utils.toArray('.feature-card'); 

    rows.forEach((row) => {
      gsap.fromTo(row, 
        { 
          opacity: 0, 
          y: 50 // Reduje la distancia para que sea más fácil que entre en viewport
        }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            // Empieza cuando el elemento toca el 90% inferior de la pantalla
            // (casi apenas aparece)
            start: "top 90%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <>
      <section ref={containerRef} className="bg-white w-full py-24 px-6 md:px-12 overflow-hidden">
        
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight font-medium">
            Vende sin problemas en <br className="hidden md:block" /> una o cien sucursales
          </h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32 max-w-7xl mx-auto">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              // AÑADIMOS ESTA CLASE 'feature-card' para que GSAP la encuentre automáticamente
              className={`feature-card flex flex-col lg:flex-row items-center gap-12 lg:gap-24 
                ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''} 
              `}
            >
              {/* IMAGEN */}
              <div className="w-full lg:w-1/2">
                <div 
                  className="bg-gray-100 rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto shadow-sm group cursor-pointer" 
                  onClick={() => setSelectedFeature(feature)}
                >
                  <img 
                    src={feature.image} 
                    alt={feature.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy" 
                  />
                </div>
              </div>

              {/* TEXTO */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                  <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {feature.description}
                  </p>
                  
                  <button 
                    onClick={() => setSelectedFeature(feature)}
                    className="inline-flex items-center justify-center lg:justify-start text-lg font-bold text-gray-900 group"
                  >
                    <span className="border-b-2 border-transparent group-hover:border-black transition-all duration-300">
                      Más información
                    </span>
                    <div className="ml-2 p-1 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-300">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
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