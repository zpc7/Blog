const cardValues = [
  // 红心
  '♥A',
  '♥2',
  '♥3',
  '♥4',
  '♥5',
  '♥6',
  '♥7',
  '♥8',
  '♥9',
  '♥10',
  '♥J',
  '♥Q',
  '♥K',
  // 黑桃
  '♠A',
  '♠2',
  '♠3',
  '♠4',
  '♠5',
  '♠6',
  '♠7',
  '♠8',
  '♠9',
  '♠10',
  '♠J',
  '♠Q',
  '♠K',
  // 方块
  '♦A',
  '♦2',
  '♦3',
  '♦4',
  '♦5',
  '♦6',
  '♦7',
  '♦8',
  '♦9',
  '♦10',
  '♦J',
  '♦Q',
  '♦K',
  // 梅花
  '♣A',
  '♣2',
  '♣3',
  '♣4',
  '♣5',
  '♣6',
  '♣7',
  '♣8',
  '♣9',
  '♣10',
  '♣J',
  '♣Q',
  '♣K',
  // 王牌
  'Red Joker',
  'Black Joker',
] as const;

type CardValues = (typeof cardValues)[number];
export type TearType = 'none' | 'keep-top' | 'keep-bottom';
export interface Card {
  readonly value: CardValues;
  readonly imagePath: string;
  readonly cardId: number;
  tear: TearType;
}
let uniqueCardId = 1;
const colorMap = {
  '♦': '4',
  '♥': '2',
  '♠': '1',
  '♣': '3',
};
const valueMap = {
  A: '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': '0',
  J: 'a',
  Q: 'b',
  K: 'c',
  'Red Joker': 'a',
  'Black Joker': 'b',
};
export function createCard(
  cardValue: CardValues,
  tear: TearType = 'none'
): Card {
  const cardId = uniqueCardId++;
  const isJoker = cardValue === 'Red Joker' || cardValue === 'Black Joker';
  const value = isJoker
    ? valueMap[cardValue]
    : valueMap[cardValue.slice(1) as keyof typeof valueMap];
  const color = isJoker ? '' : colorMap[cardValue[0] as keyof typeof colorMap];
  const name = `${color}${value}`;
  const url = new URL(`../assets/${name}.jpg`, import.meta.url);
  const imagePath = url.href;
  return {
    value: cardValue,
    imagePath,
    cardId,
    tear,
  };
}

export function createRandomCards(count: number): Card[] {
  if (count > cardValues.length) {
    throw new Error(`count should be less than ${cardValues.length}`);
  }
  if (count < 0) {
    throw new Error(`count should be greater than 0`);
  }
  const indexes = new Set<number>();
  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * cardValues.length));
  }
  return Array.from(indexes).map((index) => createCard(cardValues[index]));
}
