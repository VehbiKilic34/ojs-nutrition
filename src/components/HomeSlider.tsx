
import { Container } from "react-bootstrap";
import { useBlazeSlider } from "../hooks/useBlazeSlider";
import "./BlazeSlider.css";
import type { BannerSlide } from "../services/api";

interface HomeSliderProps {
  banners: BannerSlide[];
  autoplayInterval?: number;
  transitionDuration?: number;
}

export const HomeSlider = ({
  banners,
  autoplayInterval = 5000,
  transitionDuration = 1000
}: HomeSliderProps) => {
  const { sliderElRef } = useBlazeSlider({
    all: {
      slidesToShow: 1,
      enableAutoplay: true,
      autoplayInterval,
      slideGap: "0",
      transitionDuration,
      loop: true,
    },
  });

  return (
    <section className="hero-slider mb-4">
      <div className="blaze-slider" ref={sliderElRef}>
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">
              {banners.map((banner) => (
                <div key={banner.id} className="blaze-slide">
                  <div 
                    className="hero-banner d-flex align-items-center justify-content-center text-white"
                    style={{
                      background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '500px',
                      backgroundColor: banner.backgroundColor
                    }}
                  >
                    <Container>
                      <div className="text-center">
                        <h1 className="display-4 fw-bold mb-3">{banner.title}</h1>
                        <p className="lead mb-4">{banner.subtitle}</p>
                        {banner.buttonText && (
                          <a 
                            href={banner.buttonLink || '#'} 
                            className="btn btn-warning btn-lg"
                          >
                            {banner.buttonText}
                          </a>
                        )}
                      </div>
                    </Container>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
