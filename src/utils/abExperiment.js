export function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function chooseVariant({ userId = "anon", testName, variants = ["A", "B"], weights = [1, 1] }) {
  const seed = `${userId}::${testName}`;
  const h = hashString(seed);
  const sum = weights.reduce((a, b) => a + b, 0);
  const r = h % sum;
  let acc = 0;
  for (let i = 0; i < variants.length; i++) {
    acc += weights[i];
    if (r < acc) return variants[i];
  }
  return variants[0];
}
