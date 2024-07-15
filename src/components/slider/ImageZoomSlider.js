import React from "react";

import { BasicSlider } from "./BasicSlider";
import { ImageSlider } from "./ImageSlider";

export const ImageZoomSlider = () => {
  return (
    <BasicSlider
      settings={{
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      }}
    >
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </BasicSlider>
  );
};
