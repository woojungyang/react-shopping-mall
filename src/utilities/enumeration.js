export const enumerate = object => {
  const enumeration = Object.freeze(object);

  return { ...enumeration };
};
