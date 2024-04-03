import { INTERESTING, LOVE, MEH, getUnownedRatingValue } from "../../Utils";

describe("getUnownedRatingValue", () => {
  it('returns 0.75 when passed "interesting"', () => {
    const rating = getUnownedRatingValue("interesting");
    expect(rating).toBe(INTERESTING);
  });

  it('returns 1 when passed "love"', () => {
    const rating = getUnownedRatingValue("love");
    expect(rating).toBe(LOVE);
  });

  it('returns 0 when passed "meh"', () => {
    const rating = getUnownedRatingValue("meh");
    expect(rating).toBe(MEH);
  });
});
