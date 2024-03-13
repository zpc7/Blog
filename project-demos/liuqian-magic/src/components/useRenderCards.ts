import { Ref, reactive, watchEffect } from 'vue';
import { Card } from './card';
import { Desk } from './desk';

export interface RenderCard {
  card: Card;
  styles: object;
}
const cardSize = {
  width: 112,
  height: 170,
};

function findRenderCard(renderCards: RenderCard[], card: Card) {
  return renderCards.find((item) => item.card.cardId === card.cardId);
}

function findCard(cards: Card[], renderCard: RenderCard) {
  return cards.find((item) => item.cardId === renderCard.card.cardId);
}

export function useRenderCards(
  desk: Desk,
  isRender: Ref<boolean>,
  containerSize: { width: number; height: number }
): RenderCard[] {
  const renderCards = reactive<RenderCard[]>([]);
  function updateRenderCards(lineCards: Card[], lineIndex: 0 | 1) {
    const len = lineCards.length;
    for (let i = 0; i < len; i++) {
      const card = lineCards[i];
      // 确定横坐标
      const space = containerSize.width - cardSize.width;
      let step = space / (len - 1);
      if (!isFinite(step)) {
        step = 0;
      }
      const left = i * step + 'px';
      // 确定纵坐标
      let top = '0px';
      if (lineIndex === 1) {
        top = cardSize.height / 2 + 50 + 'px';
      }
      // 确定宽高
      const width = cardSize.width + 'px';
      let h = cardSize.height;
      if (card.tear !== 'none') {
        h /= 2;
      }
      const height = h + 'px';
      // 确定 z-index
      const zIndex = i + 1;
      const styles = {
        left,
        top,
        width,
        height,
        zIndex,
      };
      // 找到对应的渲染卡片
      const renderCard = findRenderCard(renderCards, card);
      if (renderCard) {
        renderCard.styles = styles;
        renderCard.card.tear = card.tear;
      } else {
        renderCards.push({
          card,
          styles,
        });
      }
    }
  }
  watchEffect(() => {
    if (!isRender.value) {
      return;
    }
    updateRenderCards(desk.line1Cards, 0);
    updateRenderCards(desk.line2Cards, 1);
    // 处理藏牌
    if (desk.concealCard) {
      const styles = {
        left: '0px',
        bottom: '0px',
        width: cardSize.width + 'px',
        height: cardSize.height + 'px',
        zIndex: 999,
      };
      if (desk.concealCard.tear !== 'none') {
        styles.height = cardSize.height / 2 + 'px';
      }
      const renderCard = findRenderCard(renderCards, desk.concealCard);
      if (renderCard) {
        renderCard.styles = styles;
      } else {
        renderCards.push({
          card: desk.concealCard,
          styles,
        });
      }
    }

    // 处理删除的卡片
    for (let i = renderCards.length - 1; i >= 0; i--) {
      const renderCard = renderCards[i];
      const card =
        findCard(desk.line1Cards, renderCard) ||
        findCard(desk.line2Cards, renderCard) ||
        findCard(desk.meet || [], renderCard);
      if (!card && desk.concealCard?.cardId !== renderCard.card.cardId) {
        renderCards.splice(i, 1);
      }
    }
    // 处理遇牌
    if (desk.meet) {
      const x = containerSize.width / 2 - cardSize.width / 2;
      const y1 = containerSize.height / 2 - cardSize.height;
      const y2 = containerSize.height / 2 - cardSize.height / 2;
      const styles1 = {
        left: x + 'px',
        top: y1 + 'px',
        width: cardSize.width + 'px',
        height: cardSize.height / 2 + 'px',
        zIndex: 999,
      };
      const styles2 = {
        ...styles1,
        top: y2 + 'px',
      };
      renderCards.find((c) => c.card.tear === 'keep-top')!.styles = styles1;
      renderCards.find((c) => c.card.tear === 'keep-bottom')!.styles = styles2;
    }
  });
  return renderCards;
}
