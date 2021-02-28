const getRandomCords = (min, max, floatingPoint) => {
  if (min < 0 || max < 0) {
    return 0;
  }

  if (floatingPoint < 0 || floatingPoint > 20) {
    floatingPoint = 0;
  }
  if (min >= max) {
    return (Math.random () * (min - max) + max).toFixed (floatingPoint);
  }

  return (Math.random () * (max - min) + min).toFixed (floatingPoint);
};

export {getRandomCords};
