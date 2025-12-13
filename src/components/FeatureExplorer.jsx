import React, { useState } from 'react';

// 1. Agregamos la propiedad 'image' a los datos
const featuresData = [
  {
    id: 1,
    title: "Aparece en todas partes",
    description: "Crece con herramientas incorporadas de optimización de motores de búsqueda (SEO) e integraciones con Google y Meta.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/2sVLYLXAmCQPaCBkpEQI2V/8d925d6f3c35c2cdee600be9b3de43db/PD07134_-_USES_desktop_show_up.png?fm=webp&q=85&fit=fill&w=1000"
  },
  {
    id: 2,
    title: "Envía promociones personalizadas",
    description: "Envía campañas de marketing por correo electrónico y mensaje de texto en cualquier momento. Crea conexiones duraderas.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/4ovoRcpg57OK30qofHicWV/c9235b5bee6dd276aa27b79ef72b63b5/PD07134_-_USES_desktop_promotions.png?fm=webp&q=85&fit=fill&w=1000"
  },
  {
    id: 3,
    title: "Recompensa a tus clientes frecuentes",
    description: "Impulsa las ventas frecuentes con un programa de recompensas integrado. Fideliza a tus compradores habituales.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/15Qy90J8Hm8cPCsZB3UQjd/3f1d4cdeade1ebd928e5507b197eaa83/PD07134_-_USES_desktop_loyalty.png?fm=webp&q=85&fit=fill&w=1000"
  },
  {
    id: 4,
    title: "Vende tarjetas de regalo electrónicas",
    description: "Personaliza diseños y ofrece tarjetas de regalo electrónicas directamente en tu sitio para aumentar el flujo de caja.",
    image: "https://images.ctfassets.net/2d5q1td6cyxq/41YYpZ8Wb7QrCpo0vLCp7c/cc370d8eaca00aacb03c44d923dffc0e/PD07134_-_USES_desktop_eGifts.png?fm=webp&q=85&fit=fill&w=1000"
  }
];

const FeatureExplorer = () => {
  // Estado para controlar qué ítem está activo (por defecto el 1)
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="bg-white w-full py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Título Principal */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-[56px] font-bold text-gray-900 tracking-tight leading-tight">
            Amplía tu alcance. Vende más.
          </h2>
        </div>

        {/* --- GRID DE 2 COLUMNAS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA: Acordeón */}
          <div className="w-full">
            {featuresData.map((item) => {
              const isOpen = activeId === item.id;

              return (
                <div key={item.id} className="border-b border-gray-200 last:border-0">
                  <button
                    onClick={() => setActiveId(item.id)}
                    className="w-full py-6 flex items-start justify-between group text-left focus:outline-none cursor-pointer"
                  >
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                      {item.title}
                    </h3>
                    
                    {/* Icono animado (+ / -) */}
                    <div className={`relative w-4 h-4 flex-shrink-0 mt-1.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        {/* Línea Horizontal */}
                        <span className={`absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 rounded-full transition-colors ${isOpen ? 'bg-black' : 'bg-gray-400'}`} />
                        {/* Línea Vertical */}
                        <span className={`absolute top-0 left-1/2 w-[2px] h-full -translate-x-1/2 rounded-full transition-all duration-300 ${isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 bg-gray-400'}`} />
                    </div>
                  </button>

                  {/* Contenido Desplegable */}
                  <div 
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-lg text-gray-600 leading-relaxed transition-opacity duration-500 ${isOpen ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: Imagen Cambiante */}
          {/* 'sticky' hace que la imagen te siga si la lista es muy larga */}
          <div className="hidden lg:block sticky top-24">
            <div className="bg-[#EBF4F8] rounded-2xl p-8 md:p-12 aspect-square flex items-center justify-center overflow-hidden relative">
               {/* Mapeamos las imágenes para hacer una transición suave (fade in/out) */}
               {featuresData.map((item) => (
                 <img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    className={`absolute inset-0 w-full h-full object-contain p-8 transition-opacity duration-500 ease-in-out ${activeId === item.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                 />
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureExplorer;