import assert from "node:assert/strict";
import test from "node:test";
import {
  businessTypes,
  calculateTransition,
  getMatches,
  matchProperty,
  properties,
} from "../src/model.ts";

test("an exact business, area, budget, equipment and date fit scores 100", () => {
  const result = matchProperty(properties[0], {
    type: "Café",
    budget: 50000000,
    location: "Gaeksa",
    date: "2027-03-01",
  });
  assert.equal(result.score, 100);
  assert.equal(result.upfront, 37400000);
  assert.equal(result.reusable.length, 5);
  assert.equal(result.missing.length, 0);
});
test("late availability, a budget shortfall, and a different area lower the score", () => {
  const exact = {
    type: "Café" as const,
    budget: 50000000,
    location: "Gaeksa",
    date: "2027-03-01",
  };
  const early = matchProperty(properties[0], { ...exact, date: "2027-01-25" });
  assert.equal(early.breakdown.find((b) => b.label === "Timing")?.points, 8);
  assert.ok(
    matchProperty(properties[0], { ...exact, budget: 10000000 }).score < 100,
  );
  assert.equal(
    matchProperty(properties[0], { ...exact, location: "Hyoja-dong" }).score,
    93,
  );
});
test("every business produces stable ordered results bounded between 0 and 100", () => {
  for (const type of businessTypes) {
    const preferences = {
      type,
      budget: 20000000,
      location: "All Jeonju",
      date: "2027-01-01",
    };
    const results = getMatches(preferences);
    assert.deepEqual(results, getMatches(preferences));
    assert.equal(results.length, 8);
    results.forEach((r, index) => {
      assert.ok(Number.isFinite(r.score) && r.score >= 0 && r.score <= 100);
      assert.equal(
        r.score,
        r.breakdown.reduce((sum, b) => sum + b.points, 0),
      );
      if (index) assert.ok(results[index - 1].score >= r.score);
    });
  }
});
test("transition totals and difference reconcile with the stated assumptions", () => {
  const result = calculateTransition({
    rent: 1200000,
    vacancyMonths: 3,
    renovation: 30000000,
    equipment: 22000000,
    reuse: 65,
    preparationWeeks: 10,
    handoverWeeks: 2,
  });
  assert.equal(result.traditionalTotal, 55600000);
  assert.equal(result.coordinatedTotal, 28550000);
  assert.equal(result.difference, 27050000);
  assert.equal(result.coordinated.weeks, 7);
});
test("zero reuse retains equipment and renovation costs; slower handovers can cost more", () => {
  const result = calculateTransition({
    rent: 1000000,
    vacancyMonths: 1,
    renovation: 10000000,
    equipment: 20000000,
    reuse: 0,
    preparationWeeks: 5,
    handoverWeeks: 8,
  });
  assert.equal(result.coordinated.equipment, 20000000);
  assert.equal(result.coordinated.renovation, 10000000);
  assert.equal(result.coordinated.weeks, 8);
  assert.equal(result.difference, -1000000);
});
