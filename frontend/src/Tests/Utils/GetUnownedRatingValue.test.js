import { getUnownedRatingValue } from "../../Utils";

describe("getUnownedRatingValue", () => {
  it('returns 1 when passed "interesting"', () => {
    const rating = getUnownedRatingValue("interesting");
    expect(rating).toBe(1);
  });

  it('returns 0.75 when passed "love"', () => {
    const rating = getUnownedRatingValue("love");
    expect(rating).toBe(0.75);
  });

  it('returns 0 when passed "meh"', () => {
    const rating = getUnownedRatingValue("meh");
    expect(rating).toBe(0);
  });
});
