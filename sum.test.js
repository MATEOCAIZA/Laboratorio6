const{calcWeightedGrade,percentile}=require('./sum'); 

describe('calcWeightedGrade', () => {
  test('80*0.4 + 90*0.6 = 86.00', () => {
    const items = [{ score: 80, weight: 0.4 }, { score: 90, weight: 0.6 }];
    expect(calcWeightedGrade(items)).toBe(85.00);
  });

  test('throw error if weights != 1', () => {
    expect(() => calcWeightedGrade([{ score: 50, weight: 0.5 }])).toThrow(RangeError);
  });

  test('throw error if score out of range', () => {
    expect(() => calcWeightedGrade([{ score: 150, weight: 1 }])).toThrow(RangeError);
  });
});

describe('percentile', () => {
  test('p=0 → mínimo', () => expect(percentile(0, [1, 2, 3])).toBe(1.00));
  test('p=100 → máximo', () => expect(percentile(100, [1, 2, 3])).toBe(3.00));
  test('p=50, values=[1,2,3,4] → 2.00 (nearest-rank)', () =>
    expect(percentile(50, [1, 2, 3, 4])).toBe(2.00));

  test('throw error if p out of range', () => {
    expect(() => percentile(120, [1, 2, 3])).toThrow(RangeError);
  });

  test('throw error if values empty', () => {
    expect(() => percentile(50, [])).toThrow(TypeError);
  });
});
