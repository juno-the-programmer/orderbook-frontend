export default function formatThousandSeparator(item: number | string) {
  return item.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
