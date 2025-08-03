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
      sliderElRef.current.querySelector(".blaze-container") &&
      !sliderRef.current
    ) {
      const blazeSlider = new BlazeSlider(sliderElRef.current, config);
      sliderRef.current = blazeSlider;
    }
  }, [isMounted, config]);

  return { sliderElRef, sliderRef };
}
