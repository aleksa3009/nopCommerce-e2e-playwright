export function parsePrice(priceStr: string): number {
    const cleaned = priceStr.replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned);
  }
  
  export function toCurrency(num: number): string {
    return '$' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
