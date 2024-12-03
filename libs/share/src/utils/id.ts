export function randomId(length = 5, prefix = '') {
  const rand = () => (Math.random() + 1).toString(36).replace(/[\d.]/g, '');
  const chars = new Array(Math.ceil(length / 4)).fill(0).map(rand).join('');
  return `${prefix}${chars.substring(0, length)}`;
}
