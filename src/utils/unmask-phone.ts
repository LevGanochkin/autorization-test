export const unmaskPhone = (phone: string): string => {
  const unmasked = phone.replace(/[^\d]/g, '');

  return unmasked;
};
