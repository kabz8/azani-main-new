import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import slide1 from "@assets/WhatsApp Image 2025-09-06 at 23.36.35 (1)_1759747415275.jpeg";
import slide2 from "@assets/WhatsApp Image 2025-09-06 at 23.36.41 (1)_1759748459592.jpeg";
import slide3 from "@assets/WhatsApp Image 2025-09-07 at 00.46.40 (1)_1759748477884.jpeg";
import slide4 from "@assets/WhatsApp Image 2025-09-06 at 23.36.41 (2)_1759748499406.jpeg";
import slide5 from "@assets/WhatsApp Image 2025-09-07 at 00.46.43_1759748506109.jpeg";

const slides = [slide1, slide2, slide3, slide4, slide5];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <img
                src={slide}
                alt={`African fashion ${index + 1}`}
                className="w-full h-[450px] md:h-[550px] object-contain object-center lg:object-right-top bg-muted"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-white w-8"
                : "bg-white/60 w-1.5 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
