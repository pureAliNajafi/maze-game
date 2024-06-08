export const motionDarkMode = {
  initial: {
    y: 30,
    scale: 0,
    opacity: 0,
    rotate: -90,
  },
  animate: {
    y: 0,
    scale: 1,
    opacity: 1,
    rotate: 0,
  },
  exit: {
    y: -30,
    scale: 0,
    opacity: 0,
    rotate: 90,
    transition: { /*  ease: "easeOut", */ duration: 0.5 },
  },
  transition: { duration: 0.5 },
};
export const motionProps = () => {
  const randomX = (Math.random() - 0.5) * 300;
  const randomY = (Math.random() - 0.5) * 300;
  const randomXExit = (Math.random() - 0.5) * 300;
  const randomYExit = (Math.random() - 0.5) * 300;
  const randomT = Math.random() + 0.5;

  return {
    initial: {
      x: randomX,
      y: randomY,
      scale: 0,
      rotate: 0,
      opacity: 0,
    },
    animate: { x: 0, y: 0, scale: 1, rotate: 360, opacity: 1 },
    exit: {
      x: randomXExit,
      y: randomYExit,
      rotate: 0,
      scale: 0,
      opacity: 0,
      transition: { ease: "easeOut", duration: randomT },
    },
  };
};
