"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export type SliderCard = {
  title?: string;
  image: string;
  category?: string;
  region?: string;
  name?: string;
  rank?: string;
};

type ContentSliderProps = {
  cards: SliderCard[];
  variant: "pros" | "posts" | "centers";
  label: string;
};

export function ContentSlider({ cards, variant, label }: ContentSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * (trackRef.current.clientWidth * 0.82),
      behavior: "smooth",
    });
  };

  return (
    <div className="slider" aria-label={label}>
      <div className="slider-track" ref={trackRef}>
        {cards.map((card) => (
          <article className={`slider-item ${variant}-card`} key={card.title ?? card.name}>
            <div className="card-image">
              <Image src={card.image} alt="" fill sizes="(max-width: 768px) 85vw, 28vw" />
            </div>
            {variant === "pros" ? (
              <>
                <h3 className="card-title">{card.name}</h3>
                <p className="ranking">
                  Meilleur Classement <span>{card.rank}</span>
                </p>
              </>
            ) : (
              <>
                <p className="card-kicker">{card.category ?? card.region}</p>
                <h3 className="card-title">{card.title}</h3>
              </>
            )}
            <a className="secondary-button" href="#">
              <span className="secondary-button-icon">
                <ArrowRight />
              </span>
              <span>En savoir plus</span>
            </a>
          </article>
        ))}
      </div>
      <div className="slider-controls">
        <button aria-label="Previous slide" onClick={() => scrollBy(-1)}>
          ←
        </button>
        <div className="slider-scrollbar" aria-hidden="true">
          <span />
        </div>
        <button aria-label="Next slide" onClick={() => scrollBy(1)}>
          →
        </button>
      </div>
    </div>
  );
}
