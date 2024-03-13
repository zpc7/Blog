import { createCard, createRandomCards } from './card';
import { Desk, initDesk } from './desk';
import { cloneDeep, random } from 'lodash-es';

function delay(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export interface InteractiveDescriptor {
  type: 'radio' | 'number' | 'none';
  title: string;
  payload: any;
  getOptions(interactive?: any): any;
}

export class StageContext {
  public stages: Stage[];
  public currentIndex = 0;
  public desk: Desk = initDesk();
  constructor(public animationDuration: number) {
    this.stages = [
      new InitialStage(this),
      new ShuffleStage(this),
      new TearStage(this),
      new ConcatStage(this),
      new NameStage(this),
      new TakeThreeCardsToMiddle(this),
      new ConcealStage(this),
      new LocationChooseStage(this),
      new SexChooseStage(this),
      new SevenWordsSpellStage(this),
      new KeepOneStage(this),
    ];
  }
  get hasPrev() {
    return this.currentIndex > 0;
  }
  get hasNext() {
    return this.currentIndex < this.stages.length - 1;
  }
  get currentStage() {
    return this.stages[this.currentIndex];
  }
  getInteractiveDescriptor() {
    return this.currentStage.getInteractiveDescriptor();
  }
  async play(options?: any) {
    await this.currentStage.play(options);
  }
  undo() {
    this.currentStage.undo();
  }
  next() {
    if (this.hasNext) {
      this.currentIndex++;
    }
  }
  prev() {
    if (this.hasPrev) {
      this.currentIndex--;
    }
  }
}

export abstract class Stage {
  private hasGetInteractiveDescriptor = false;
  private initialDesk: Desk | null = null;
  private playedDesk: Desk | null = null;
  protected defaultDescriptor: InteractiveDescriptor = {
    type: 'none',
    title: '',
    payload: null,
    getOptions: () => void 0,
  };
  constructor(public ctx: StageContext, public name: string) {}
  getInteractiveDescriptor(): InteractiveDescriptor {
    if (this.hasGetInteractiveDescriptor) {
      return this.defaultDescriptor;
    }
    const desc = this._getInteractiveDescriptor();
    this.hasGetInteractiveDescriptor = true;
    return desc;
  }
  _getInteractiveDescriptor(): InteractiveDescriptor {
    return this.defaultDescriptor;
  }
  abstract _play(options: any): Promise<void> | void;
  async play(options: any): Promise<void> {
    if (!this.initialDesk) {
      this.initialDesk = cloneDeep(this.ctx.desk);
    }
    if (this.playedDesk) {
      this.ctx.desk = cloneDeep(this.playedDesk);
      return;
    }
    await this._play(options);
    this.playedDesk = cloneDeep(this.ctx.desk);
    return;
  }
  undo(): void {
    if (this.initialDesk) {
      this.ctx.desk = cloneDeep(this.initialDesk);
    }
  }
}

class InitialStage extends Stage {
  _play() {
    this.ctx.desk.line1Cards = createRandomCards(4);
  }
  constructor(ctx: StageContext) {
    super(ctx, '开局');
  }
}

class ShuffleStage extends Stage {
  _play() {
    for (let i = this.ctx.desk.line1Cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [this.ctx.desk.line1Cards[i], this.ctx.desk.line1Cards[j]] = [
        this.ctx.desk.line1Cards[j],
        this.ctx.desk.line1Cards[i],
      ];
    }
  }

  constructor(ctx: StageContext) {
    super(ctx, '洗牌');
  }
}

class TearStage extends Stage {
  _play() {
    for (const card of this.ctx.desk.line1Cards) {
      card.tear = 'keep-top';
      this.ctx.desk.line2Cards.push(createCard(card.value, 'keep-bottom'));
    }
  }
  constructor(ctx: StageContext) {
    super(ctx, '撕牌');
  }

  public undo() {
    this.ctx.desk.line2Cards = [];
    setTimeout(() => {
      super.undo();
    }, this.ctx.animationDuration);
  }
}

class ConcatStage extends Stage {
  _play() {
    this.ctx.desk.line1Cards = [
      ...this.ctx.desk.line1Cards,
      ...this.ctx.desk.line2Cards,
    ];
    this.ctx.desk.line2Cards = [];
  }
  constructor(ctx: StageContext) {
    super(ctx, '拼牌');
  }
}

class TakeCardsToTail extends Stage {
  async _play(options: { takeNumber: number }) {
    const { takeNumber } = options;
    for (let i = 0; i < takeNumber; i++) {
      this.beforeCardChange();
      const [head, ...rest] = this.ctx.desk.line1Cards;
      this.ctx.desk.line1Cards = [...rest, head];
      await delay(this.ctx.animationDuration);
    }
    this.afterChange();
  }

  beforeCardChange() {}
  afterChange() {}
}

class NameStage extends TakeCardsToTail {
  _getInteractiveDescriptor(): InteractiveDescriptor {
    return {
      title: '你的姓名有几个字？',
      type: 'number',
      payload: {
        defaultValue: 3,
        min: 1,
        max: 10,
      },
      getOptions: (value) => ({
        takeNumber: value,
      }),
    };
  }
  constructor(ctx: StageContext) {
    super(ctx, '按姓名字数洗牌');
  }
}

abstract class InsertStage extends Stage {
  _play(options: { takeNumber: number }) {
    const { takeNumber } = options;
    const cards = this.ctx.desk.line1Cards;
    if (takeNumber > cards.length - 2 || takeNumber <= 0) {
      return;
    }
    const insertFromTopNumber = random(1, cards.length - takeNumber - 1);
    const lastChangeIndex = takeNumber + insertFromTopNumber - 1;
    for (let i = takeNumber; i <= lastChangeIndex; i++) {
      for (let j = i, k = 0; k < takeNumber; k++, j--) {
        // 交换j和j-1
        [cards[j], cards[j - 1]] = [cards[j - 1], cards[j]];
      }
    }
  }
}

class TakeThreeCardsToMiddle extends InsertStage {
  constructor(ctx: StageContext) {
    super(ctx, '取三张放中间');
  }

  _getInteractiveDescriptor(): InteractiveDescriptor {
    return {
      ...this.defaultDescriptor,
      getOptions: () => ({
        takeNumber: 3,
      }),
    };
  }
}

class ConcealStage extends Stage {
  _play() {
    this.ctx.desk.concealCard = this.ctx.desk.line1Cards.shift()!;
  }
  constructor(ctx: StageContext) {
    super(ctx, '藏牌');
  }
}

class LocationChooseStage extends InsertStage {
  _getInteractiveDescriptor(): InteractiveDescriptor {
    return {
      title: '请选择你的地域',
      type: 'radio',
      payload: {
        defaultValue: 1,
        options: [
          { label: '南方人', value: 1 },
          { label: '北方人', value: 2 },
          { label: '不清楚', value: 3 },
        ],
      },
      getOptions: (value) => ({
        takeNumber: value,
      }),
    };
  }
  constructor(ctx: StageContext) {
    super(ctx, '地域选择');
  }
}

class ThrowHeadCardsStage extends Stage {
  async _play(options: { takeNumber: number }) {
    const { takeNumber } = options;
    for (let i = 0; i < takeNumber; i++) {
      this.ctx.desk.line1Cards.shift();
      await delay(this.ctx.animationDuration);
    }
  }
}

class SexChooseStage extends ThrowHeadCardsStage {
  _getInteractiveDescriptor(): InteractiveDescriptor {
    return {
      title: '请选择你的性别',
      type: 'radio',
      payload: {
        defaultValue: 1,
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      getOptions: (value) => ({
        takeNumber: value,
      }),
    };
  }
  constructor(ctx: StageContext) {
    super(ctx, '性别选择');
  }
}

class SevenWordsSpellStage extends TakeCardsToTail {
  private words = '见证奇迹的时刻';
  private currentIndex = 0;
  _getInteractiveDescriptor(): InteractiveDescriptor {
    return {
      ...this.defaultDescriptor,
      getOptions() {
        return { takeNumber: 7 };
      },
    };
  }
  beforeCardChange(): void {
    this.name = this.words[this.currentIndex++];
  }
  afterChange(): void {
    this.currentIndex = 0;
    this.name = this.words;
  }
  constructor(ctx: StageContext) {
    super(ctx, '见证奇迹的时刻');
  }
}

class KeepOneStage extends Stage {
  private words = ['好运留下来', '烦恼扔出去'];
  async _play() {
    const stages = [this.takeStage, this.throwStage];
    let i = 0;
    let oldDuration = this.ctx.animationDuration;
    this.ctx.animationDuration *= 2;
    let wordsIndex = 0;
    while (this.ctx.desk.line1Cards.length > 1) {
      const stage = stages[i++ % stages.length];
      this.name = this.words[wordsIndex++ % this.words.length];
      await stage._play({ takeNumber: 1 });
    }
    this.ctx.desk.meet = [
      this.ctx.desk.line1Cards[0],
      this.ctx.desk.concealCard!,
    ];
    this.ctx.desk.concealCard = null;
    this.ctx.desk.line1Cards = [];
    this.ctx.animationDuration = oldDuration;
    this.name = this.words.join('，');
  }
  private throwStage = new ThrowHeadCardsStage(this.ctx, '');
  private takeStage = new TakeCardsToTail(this.ctx, '');
  constructor(ctx: StageContext) {
    super(ctx, '好运留下来，烦恼扔出去');
  }
}
