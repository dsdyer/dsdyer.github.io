export const _times = (a: number, b: number): number => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a * b;
};
