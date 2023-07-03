// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 20, b: 2, action: Action.Subtract, expected: 18 },
  { a: 21, b: 7, action: Action.Divide, expected: 3 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
];

describe('simpleCalculator', () => {
  it.each(testCases)('Should calculate', (n) => {
    const { expected, ...params } = n;
    const result = simpleCalculator(params);
    expect(result).toBe(expected);
  });
});
