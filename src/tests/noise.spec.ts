import { noiseGenerator, scaleNoise } from '../noise';

describe('Noise generator', () => {
  it('should scale properly numbers to range from 0 to 1', () => {
    expect(scaleNoise(1)).toEqual(1);
    expect(scaleNoise(0)).toEqual(0.5);
    expect(scaleNoise(-1)).toEqual(0);
  });

  it('should clip to 1 numbers larger than 1', () => {
    expect(scaleNoise(1.1)).toEqual(1);
    expect(scaleNoise(2)).toEqual(1);
  });

  it('should clip to 0 numbers smaller than -1', () => {
    expect(scaleNoise(-1.1)).toEqual(0);
    expect(scaleNoise(-2)).toEqual(0);
  });

  it('should return numeric value from generator value', () => {
    const noise = noiseGenerator('seed');
    expect(typeof noise.next().value).toBe('number');
  });
});
