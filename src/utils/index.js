export function formatNumberWithSeparator(number) {
  return new Intl.NumberFormat("en-US").format(number / 20);
}
