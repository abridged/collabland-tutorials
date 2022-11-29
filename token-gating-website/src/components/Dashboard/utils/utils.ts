export function countdown(s: number) {
  const d = Math.floor(s / (3600 * 24));
  s -= d * 3600 * 24;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  s -= m * 60;
  const tmp = [];
  d && tmp.push(d + 'd');
  (d || h) && tmp.push(h + 'h');
  (d || h || m) && tmp.push(m + 'm');
  tmp.push(s + 's');
  return tmp.join(' ');
}
