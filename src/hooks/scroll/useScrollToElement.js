import React, { useRef } from "react";

export const useScrollToElement = () => {
  const elementsRef = useRef({});

  const scrollToElement = (id) => {
    const element = elementsRef.current[id];
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + -200;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const setElementRef = (id) => (el) => {
    if (el) {
      elementsRef.current[id] = el;
    }
  };

  return { scrollToElement, setElementRef };
};
