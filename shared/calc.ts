// Money helpers shared by server & web. Amounts are DZD, stored as numbers (2 decimals).

export interface LineLike {
  quantity: number;
  unit_price: number;
  cost_price?: number | null;
  lot?: string | null;
}

export interface Totals {
  ht: number; // before discount
  discount: number;
  net_ht: number;
  tva: number;
  ttc: number;
  cost: number;
  margin: number; // net_ht - cost
}

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function computeTotals(lines: LineLike[], tvaRate = 19, discountPct = 0): Totals {
  const ht = round2(lines.reduce((s, l) => s + (Number(l.quantity) || 0) * (Number(l.unit_price) || 0), 0));
  const cost = round2(lines.reduce((s, l) => s + (Number(l.quantity) || 0) * (Number(l.cost_price) || 0), 0));
  const discount = round2((ht * (Number(discountPct) || 0)) / 100);
  const net_ht = round2(ht - discount);
  const tva = round2((net_ht * (Number(tvaRate) || 0)) / 100);
  return { ht, discount, net_ht, tva, ttc: round2(net_ht + tva), cost, margin: round2(net_ht - cost) };
}

/** Totals grouped by lot ("" = no lot). */
export function totalsByLot(lines: LineLike[], tvaRate = 19, discountPct = 0): Record<string, Totals> {
  const groups: Record<string, LineLike[]> = {};
  for (const l of lines) (groups[l.lot || ''] ??= []).push(l);
  return Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, computeTotals(v, tvaRate, discountPct)]));
}

export function formatDZD(n: number | null | undefined, withCurrency = true): string {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return '—';
  const s = Number(n).toLocaleString('fr-DZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ | /g, ' ');
  return withCurrency ? `${s} DA` : s;
}

// ---------- French amount in words (used on invoices: "Arrêtée la présente facture à la somme de ...") ----------
const UNITS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize'];
const TENS = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];

function below100(n: number): string {
  if (n <= 16) return UNITS[n];
  if (n < 20) return 'dix-' + UNITS[n - 10];
  const t = Math.floor(n / 10);
  let u = n % 10;
  if (t === 7 || t === 9) u += 10; // soixante-dix, quatre-vingt-dix
  let s = TENS[t];
  if (u === 0) return t === 8 ? 'quatre-vingts' : s;
  if ((u === 1 || u === 11) && t !== 8 && t !== 9) return s + ' et ' + (u === 1 ? 'un' : 'onze');
  return s + '-' + below100(u);
}

function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  let s = '';
  if (h > 0) s = h === 1 ? 'cent' : UNITS[h] + ' cent' + (r === 0 ? 's' : '');
  if (r > 0) s += (s ? ' ' : '') + below100(r);
  return s || 'zéro';
}

export function integerToFrenchWords(n: number): string {
  n = Math.floor(Math.abs(n));
  if (n === 0) return 'zéro';
  const parts: string[] = [];
  const scales: [number, string, string][] = [
    [1e9, 'milliard', 'milliards'],
    [1e6, 'million', 'millions'],
  ];
  for (const [v, sing, plur] of scales) {
    const q = Math.floor(n / v);
    if (q > 0) {
      parts.push(`${below1000(q)} ${q > 1 ? plur : sing}`);
      n %= v;
    }
  }
  const th = Math.floor(n / 1000);
  if (th > 0) {
    parts.push(th === 1 ? 'mille' : below1000(th).replace(/(cent|vingt)s$/, '$1') + ' mille');
    n %= 1000;
  }
  if (n > 0) parts.push(below1000(n));
  return parts.join(' ');
}

export function amountInFrenchWords(amount: number): string {
  const a = round2(Math.abs(amount));
  const dinars = Math.floor(a);
  const cents = Math.round((a - dinars) * 100);
  let s = `${integerToFrenchWords(dinars)} dinar${dinars > 1 ? 's' : ''} algérien${dinars > 1 ? 's' : ''}`;
  if (cents > 0) s += ` et ${integerToFrenchWords(cents)} centime${cents > 1 ? 's' : ''}`;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
