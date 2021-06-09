import { sum } from '../src';
import { times } from '../src';
import { minus } from '../src';
import { square } from '../src';

describe('functions from ../src work good', () => {
  it('sums two numbers', () => {
    expect(sum(1, 1)).toEqual(2);
  });

  it('minuses two numbers', () => {
    expect(minus(1, 1)).toEqual(0);
  });

  it('timeses two numbers', () => {
    expect(times(1, 1)).toEqual(1);
  });

  it('squares a number', () => {
    expect(square(0)).toEqual(0);
    expect(square(1)).toEqual(1);
    expect(square(2)).toEqual(4);
    expect(square(3)).toEqual(9);
  });
});
