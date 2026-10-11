import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './ServicesCarousel.css';

/**
 * Numbered, gradient-tinted glass cards in a snap-scrolling carousel.
 *
 * Ported from the shadcn/Tailwind "animated service card" recipe to this
 * project's conventions: hand-written CSS + framer-motion (no Tailwind, no
 * embla — the track uses native scroll-snap so touch drag keeps working).
 */

export type ServiceTone = 'slate' | 'mint' | 'amber' | 'lilac' | 'sky' | 'rose';

export interface Service {
  /** Display number, already zero-padded: "001" */
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tone: ServiceTone;
}

interface ServicesCarouselProps {
  services: Service[];
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  bullets?: string[];
  id?: string;
}

const cardVariants = {
  hidden: { y: 44 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.09, ease: 'easeOut' },
  }),
};

const ServiceCard: React.FC<{ service: Service; index: number; isActive: boolean; onSelect: () => void }> = ({
  service,
  index,
  isActive,
  onSelect,
}) => {
  const Icon = service.icon;

  return (
    <motion.div className="svc-slide" variants={cardVariants} custom={index}>
      <article
        className={`svc-card svc-tone-${service.tone} ${isActive ? 'is-active' : ''}`}
        onClick={onSelect}
        style={{ cursor: 'pointer' }}
      >
        <span className="svc-card-veil" aria-hidden />

        <header className="svc-card-top">
          <span className="svc-card-number">( {service.number} )</span>
          <span className="svc-card-icon">
            <Icon size={24} />
          </span>
        </header>

        <div className="svc-card-body">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>

        <a className="svc-card-link" href="#showcase" onClick={(e) => e.stopPropagation()}>
          See it in action
          <ArrowRight size={14} />
        </a>
      </article>
    </motion.div>
  );
};

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  services,
  eyebrow,
  title,
  subtitle,
  bullets,
  id,
}) => {
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const stepSize = track.firstElementChild?.clientWidth ?? track.clientWidth;
    const calculatedIndex = Math.min(services.length - 1, Math.max(0, Math.round(track.scrollLeft / stepSize)));
    setActiveIndex(calculatedIndex);
  }, [services.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    track.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      track.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const scrollBySlide = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = 18;
    const slide = (track.firstElementChild?.clientWidth ?? track.clientWidth) + gap;

    if (direction > 0 && activeIndex >= services.length - 1) {
      // Loop back to card 1
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction < 0 && activeIndex <= 0) {
      // Loop to card 6
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: direction * slide, behavior: 'smooth' });
    }
  };

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const gap = 18;
    const slide = (track.firstElementChild?.clientWidth ?? track.clientWidth) + gap;
    track.scrollTo({ left: index * slide, behavior: 'smooth' });
  };

  const progress = services.length > 1 ? activeIndex / (services.length - 1) : 1;

  return (
    <div className="svc-carousel" id={id}>
      <motion.div
        ref={headRef}
        className="svc-head"
        initial={{ y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55 }}
      >
        <div className="svc-head-copy">
          {eyebrow && <p className="svc-eyebrow">{eyebrow}</p>}
          {title && <h2>{title}</h2>}
          {subtitle && <p className="svc-sub">{subtitle}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="svc-bullets">
              {bullets.map((bullet) => (
                <li key={bullet}>
                  <span className="svc-bullet-dot" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="svc-controls">
          <span className="svc-count">
            {String(activeIndex + 1).padStart(2, '0')}
            <em>/</em>
            {String(services.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="svc-arrow"
            onClick={() => scrollBySlide(-1)}
            aria-label="Previous cards"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="svc-arrow"
            onClick={() => scrollBySlide(1)}
            aria-label="Next cards"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>

      <motion.div
        className="svc-track"
        ref={trackRef}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        transition={{ staggerChildren: 0.08 }}
      >
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            service={service}
            index={index}
            isActive={index === activeIndex}
            onSelect={() => scrollToSlide(index)}
          />
        ))}
      </motion.div>

      <div className="svc-progress" aria-hidden>
        <span style={{ width: `${Math.max(6, progress * 100)}%` }} />
      </div>
    </div>
  );
};

export default ServicesCarousel;
