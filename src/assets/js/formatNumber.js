const formatter = new Intl.NumberFormat('ru-Ru', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatNumber(target) {
  const initialParts = formatter.formatToParts(target);
  const formattedParts = initialParts.map(({ type, value }) => {
    switch (type) {
      case 'group':
        return '\u00A0';
      case 'literal':
        return '';
      default:
        return value;
    }
  });
  return formattedParts.reduce((acc, part) => acc + part, '');
}
export default formatNumber;
