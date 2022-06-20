import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button style={{ display: visible ? "inline" : "none" }}>
      <i
        className="bi bi-arrow-up"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      ></i>
    </Button>
  );
};

export default ScrollButton;
