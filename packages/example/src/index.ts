import { b2Transform } from '@box2d/core';
import { Box2dDraw } from '@gameastic/box2d-testbed';
import { Application, Assets, Graphics } from 'pixi.js';
import { Stage } from './stage';

void b2Transform;
void Box2dDraw;
void Graphics;

window.addEventListener('load', () => {
    class Game extends Application {
        public declare stage: Stage;

        public constructor() {
            super({ resizeTo: window, backgroundColor: 0x000, hello: true });

            void this.init().then(() => {
                this.stage = new Stage();
                this.ticker.add(() => {
                    this.stage.update();
                });
            });
        }

        public async init(): Promise<void> {
            await Assets.init({
                basePath: 'assets',
            });

            await Assets.load([
                'giraffe-round.png',
                'giraffe-square.png',
                'panda-round.png',
                'panda-square.png',
                'penguin-round.png',
                'penguin-square.png',
                'pixel.png',
            ]);
        }
    }

    window.game = new Game();

    // @ts-expect-error game.view is canvas type
    document.body.appendChild(window.game.view);
});
