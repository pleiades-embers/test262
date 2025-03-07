// Copyright (C) 2022 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.now.plaindatetime
description: >
  Appropriate error thrown when argument cannot be converted to a valid string
  or object for TimeZone
features: [BigInt, Symbol, Temporal]
---*/

const rangeErrorTests = [
  [null, "null"],
  [true, "boolean"],
  ["", "empty string"],
  [1, "number that doesn't convert to a valid ISO string"],
  [19761118, "number that would convert to a valid ISO string in other contexts"],
  [1n, "bigint"],
  [new Temporal.Calendar("iso8601"), "calendar instance"],
];

for (const [timeZone, description] of rangeErrorTests) {
  assert.throws(RangeError, () => Temporal.Now.plainDateTime("iso8601", timeZone), `${description} does not convert to a valid ISO string`);
  assert.throws(RangeError, () => Temporal.Now.plainDateTime("iso8601", { timeZone }), `${description} does not convert to a valid ISO string (nested property)`);
}

const typeErrorTests = [
  [Symbol(), "symbol"],
];

for (const [timeZone, description] of typeErrorTests) {
  assert.throws(TypeError, () => Temporal.Now.plainDateTime("iso8601", timeZone), `${description} is not a valid object and does not convert to a string`);
  assert.throws(TypeError, () => Temporal.Now.plainDateTime("iso8601", { timeZone }), `${description} is not a valid object and does not convert to a string (nested property)`);
}

const timeZone = undefined;
assert.throws(RangeError, () => Temporal.Now.plainDateTime("iso8601", { timeZone }), `undefined is always a RangeError as nested property`);
