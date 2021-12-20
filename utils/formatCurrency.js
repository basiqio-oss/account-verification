const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  maximumSignificantDigits: 2,
});

/**
 * Utility function for formatting a number (i.e a bank balance) as currency
 */
export function formatCurrency(value) {
  return formatter.format(value);
}
