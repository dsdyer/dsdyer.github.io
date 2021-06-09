import { _minus } from './_minus';
import { _times } from './_times';
import { _square } from './_square';


export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export const minus = (c: number, d:number): number => _minus(c, d);
export const times = (c: number, d:number): number => _times(c, d);
export const square = (c: number): number => _square(c);