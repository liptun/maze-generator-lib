import { makeDecision } from './../decision';

describe('makeDecision()', () => {
  it('should return always the same choice if only one is available', () => {
    const choice = 'one';
    expect(makeDecision([choice], 0)).toEqual(choice);
    expect(makeDecision([choice], 0.5)).toEqual(choice);
    expect(makeDecision([choice], 1)).toEqual(choice);
  });

  it('should return one choice from provided two choices based of noise value', () => {
    const choices = ['one', 'two'];
    let noise = 0.4;
    expect(makeDecision(choices, noise)).toEqual(choices[0]);
    noise = 0.5;
    expect(makeDecision(choices, noise)).toEqual(choices[1]);
  });

  it('should throw error when noise is not between 0 and 1', () => {
    expect(() => makeDecision(['one'], -1)).toThrow();
    expect(() => makeDecision(['one'], 1)).not.toThrow();
    expect(() => makeDecision(['one'], 1.1)).toThrow();
  });

  it('should throw error when choices array is empty', () => {
    expect(() => makeDecision([], 0)).toThrow();
    expect(() => makeDecision(['x'], 1)).not.toThrow();
  });
});
