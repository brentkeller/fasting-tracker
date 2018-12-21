import calculateStats from './fastStatCalculator';
import { getFasts } from '../selectors';
import * as helper from 'common/testHelper';

let state = helper.getEmptyState();
let fasts = getFasts(state);

describe('calculateStats', () => {
  describe('populated fasts', () => {
    test('returns default stats when there are no fasts', () => {
      const result = calculateStats(fasts);
      expect(result.shortest).toEqual(null);
      expect(result.longest).toEqual(null);
      expect(result.average).toEqual(null);
    });
  });

  describe('populated fasts', () => {
    beforeAll(() => {
      state = helper.getSampleState();
      fasts = getFasts(state);
      fasts[1] = {
        ...fasts[1],
        duration: 1920,
      };
    });
    test('computes shortest fast', () => {
      const result = calculateStats(fasts);
      expect(result.shortest).toEqual(960);
    });

    test('computes longest fast', () => {
      const result = calculateStats(fasts);
      expect(result.longest).toEqual(1920);
    });

    test('computes average fast', () => {
      const result = calculateStats(fasts);
      expect(result.average).toEqual(1440);
    });
  });
});
