import { Card } from './card';
export interface Desk {
  line1Cards: Card[];
  line2Cards: Card[];
  concealCard: Card | null;
  meet: [Card, Card] | null;
}

export function initDesk(): Desk {
  return {
    line1Cards: [],
    line2Cards: [],
    concealCard: null,
    meet: null,
  };
}
