import type { Application } from 'pixi.js';

declare global {
    interface Window {
        game: Application;
    }

    module '*.png' {
        const content: any;
        export default content;
    }
}
