import { BestProductCard } from 'components/card';
import React from 'react';
import Slider from 'react-slick';

export const BestCardsSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const cardSize = [0, 0, 0, 1, 1].sort(() => Math.random() - 0.5);

  console.log(cardSize);
  return (
    <div>
      {cardSize.map(e => (
        <BestProductCard isSmall={e} />
      ))}
    </div>
  );
};
