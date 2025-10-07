"use client";

import Particles from "../custom-ui/hero-bg";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={1000}
        particleSpread={10}
        speed={0.8}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
};

export default Background;
