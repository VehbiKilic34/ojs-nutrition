
import { useEffect, useRef } from 'react';
import 'blaze-slider/dist/blaze.css';
import './BlazeSlider.css';

export default function BlazeSlider({ children }: { children: React.ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current && !sliderRef.current.classList.contains('blaze-slider')) {
      import('blaze-slider').then(({ default: BlazeSlider }) => {
        new BlazeSlider(sliderRef.current!, {
          all: {
            enableAutoplay: true,
            autoplayInterval: 4000, 
            slidesToShow: 4, 
            transitionDuration: 1500,
            slideGap: "0.25rem",
            loop: true,
          },
          '(max-width: 900px)': {
            slidesToShow: 2,
            slideGap: "0.125rem",
            transitionDuration: 1500,
          },
          '(max-width: 500px)': {
            slidesToShow: 1,
            slideGap: "0.1rem",
            transitionDuration: 1500,
          },
        });
      });
    }
  }, []);

  return (
    <div className="blaze-slider" ref={sliderRef}>
      <div className="blaze-container">
        <div className="blaze-track-container">
          <div className="blaze-track">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}