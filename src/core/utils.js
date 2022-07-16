export const emptyObject = (obj) => {
  return (
    !obj ||
    (Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype)
  );
};

export const emptyArray = (arr) => {
  return !arr || !arr.length;
};

export const nvl = (value1, value2) => {
  if (!value1) return value2;
  return value1;
};
