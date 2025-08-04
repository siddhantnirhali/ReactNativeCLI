import { sum } from "./sum";

test("sum adds two numbers", () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, 1)).toBe(0);
  expect(sum(0, 0)).toBe(0);
});

test("sum handles non-numeric inputs", () => {
  expect(sum("1", "2")).toBe("12");
  expect(sum(null, 2)).toBe(2);
  expect(sum(undefined, 5)).toBe(5);
});
export {};