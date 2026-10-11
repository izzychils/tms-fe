import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './StaggerTestimonials.css';

/**
 * Staggered testimonial stack with notched (clip-path) cards.
 *
 * Ported from the shadcn/Tailwind "stagger testimonials" recipe to this
 * project's conventions: hand-written CSS, no Tailwind tokens. The centre card
 * is inked black, the cards behind it sit at slight rotations and come
 * forward when clicked or when the arrows are used.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Portrait image; falls back to initials if it fails to load. */
  image: string;
}

interface StaggerTestimonialsProps {
  testimonials: Testimonial[];
}

/** 50px corner cut at 45° → hypotenuse of 50√2. */
const NOTCH = 50;
const NOTCH_DIAGONAL = Math.sqrt(NOTCH * NOTCH * 2);

interface CardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const Avatar: React.FC<{ name: string; image: string }> = ({ name, image }) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('');

  return (
    <span className="stg-avatar">
      <span className="stg-avatar-initials">{initials}</span>
      {!failed && (
        <img src={image} alt="" loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  );
};

const TestimonialCard: React.FC<CardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Read the testimonial from ${testimonial.name}`}
      onClick={() => handleMove(position)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleMove(position);
        }
      }}
      className={`stg-card ${isCenter ? 'is-center' : ''}`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(${NOTCH}px 0%, calc(100% - ${NOTCH}px) 0%, 100% ${NOTCH}px, 100% 100%, calc(100% - ${NOTCH}px) 100%, ${NOTCH}px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? '0 8px 0 4px rgba(10, 10, 11, 0.16)' : '0 0 0 0 transparent',
      }}
    >
      <span
        className="stg-notch-line"
        aria-hidden
        style={{ right: -2, top: NOTCH - 2, width: NOTCH_DIAGONAL, height: 2 }}
      />

      <Avatar name={testimonial.name} image={testimonial.image} />

      <h3 className="stg-quote">&ldquo;{testimonial.quote}&rdquo;</h3>

      <p className="stg-by">
        {testimonial.name}
        <span>{testimonial.role}</span>
      </p>
    </article>
  );
};

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ testimonials }) => {
  const [cardSize, setCardSize] = useState(365);
  const [items, setItems] = useState<Array<Testimonial & { tempId: number }>>(() =>
    testimonials.map((testimonial, index) => ({ ...testimonial, tempId: index }))
  );

  useEffect(() => {
    setItems(testimonials.map((testimonial, index) => ({ ...testimonial, tempId: index })));
  }, [testimonials]);

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');
      setCardSize(matches ? 365 : 280);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMove = (steps: number) => {
    const next = [...items];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: Math.random() });
      }
    }
    setItems(next);
  };

  return (
    <div className="stg-stage">
      {items.map((item, index) => {
        const position =
          items.length % 2 ? index - (items.length + 1) / 2 : index - items.length / 2;
        return (
          <TestimonialCard
            key={item.tempId}
            testimonial={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {items.length > 1 && (
        <div className="stg-controls">
          <button
            type="button"
            className="stg-arrow"
            onClick={() => handleMove(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="stg-arrow"
            onClick={() => handleMove(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default StaggerTestimonials;
