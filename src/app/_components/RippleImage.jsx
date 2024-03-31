import React from 'react';
import Image from 'next/image';
import w from "../images/w.png";


const RippleImage = () => {
  const showRippleEffect = (event) => {
    const container = event.currentTarget;
    const rippleElement = container.querySelector('.ripple');

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    rippleElement.style.width = rippleElement.style.height = `${size}px`;
    rippleElement.style.left = `${x}px`;
    rippleElement.style.top = `${y}px`;

    rippleElement.classList.add('active');

    setTimeout(() => {
      rippleElement.classList.remove('active');
    }, 400);
  };

  return (
    <div className="group relative" onClick={showRippleEffect}>
 <Image
                      className="bg-white rounded-full"
                      src={w}
                      width={80}
                      height={80}
                      alt="img"
                    />      <div className="absolute inset-0 overflow-hidden rounded-md ripple-container">
        <div className="absolute w-16 h-16 bg-white rounded-full ripple"></div>
      </div>
    </div>
  );
};

export default RippleImage;
