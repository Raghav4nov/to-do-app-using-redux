import React from "react";
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  return (
    <Particles
      style={{ position: "fixed", top: 0, left: 0 }}
      options={{
        fullScreen: { enable: false }, // false because we handle sizing with CSS
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 },
          },
        },
        particles: {
          color: { value: ["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"] },
          move: { direction: "none", enable: true, outModes: "bounce", speed: 1 },
          number: { value: 50 },
          opacity: { value: 0.7 },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 6 } },
          links: {
            enable: true,
            distance: 120,
            color: "#ffffff",
            opacity: 0.3,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
