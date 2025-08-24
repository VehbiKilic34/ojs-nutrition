import { useEffect, useRef, useState } from "react";
import BlazeSlider, { type BlazeConfig } from "blaze-slider";
import "../components/BlazeSlider.css";

export function useBlazeSlider(config?: BlazeConfig) {
  const sliderRef = useRef<BlazeSlider | null>(null);
  const sliderElRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      isMounted &&
      typeof window !== "undefined" &&
      sliderElRef.current &&
      !sliderRef.current
    ) {
      // DOM element'inin tamamen hazır olmasını bekle
      const initSlider = () => {
        try {
          console.log('Initializing BlazeSlider...');
          console.log('Slider element:', sliderElRef.current);
          console.log('Config:', config);
          
          // Slider'ı temizle
          if (sliderRef.current && typeof sliderRef.current.destroy === 'function') {
            sliderRef.current.destroy();
          }
          
          // Yeni slider oluştur
          if (sliderElRef.current) {
            const blazeSlider = new BlazeSlider(sliderElRef.current, config);
            sliderRef.current = blazeSlider;
            
            console.log('BlazeSlider initialized successfully:', blazeSlider);
            
            // Slider'ın çalışıp çalışmadığını kontrol et
            setTimeout(() => {
              if (sliderRef.current) {
                console.log('Slider methods available:', Object.getOwnPropertyNames(Object.getPrototypeOf(sliderRef.current)));
              }
            }, 100);
          }
          
        } catch (error) {
          console.error('Error initializing BlazeSlider:', error);
        }
      };

      // DOM element'i hazır olduğunda slider'ı başlat
      if (sliderElRef.current.querySelector('.blaze-track')) {
        initSlider();
      } else {
        // DOM element'i henüz hazır değilse biraz bekle
        setTimeout(initSlider, 100);
      }
    }
  }, [isMounted, config]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sliderRef.current && typeof sliderRef.current.destroy === 'function') {
        try {
          sliderRef.current.destroy();
        } catch (error) {
          console.error('Error destroying BlazeSlider:', error);
        }
      }
    };
  }, []);

  return { sliderElRef, sliderRef };
}
