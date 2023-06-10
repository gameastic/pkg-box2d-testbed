import { Container, Sprite } from 'pixi.js';

export class Stage extends Container {
    public constructor() {
        super();

        const pandaRound = Sprite.from('assets/panda-round.png');
        this.addChild(pandaRound);
        this.addChild(pandaRound);
    }
}
