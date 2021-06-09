export const _square = (a: number): number => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a * a;
};
