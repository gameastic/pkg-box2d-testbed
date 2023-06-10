import type { b2FixtureDef } from '@box2d/core';
import {
    b2BodyType,
    b2CircleShape,
    b2EdgeShape,
    b2PolygonShape,
    b2RevoluteJointDef,
    b2Vec2,
    b2World,
} from '@box2d/core';
import { Box2dDraw } from '@gameastic/box2d-testbed';
import { Container, Graphics } from 'pixi.js';

const random = (min: number, max: number): number => Math.random() * (max - min) + min;

export class Stage extends Container {
    private readonly _world: b2World;
    private readonly _debugDraw: Box2dDraw;

    public constructor() {
        super();

        const world = (this._world = b2World.Create({ x: 0, y: -9.8 }));

        const { width, height } = window.game.screen;
        const graphics = new Graphics();
        graphics.position.set(width * 0.5, height * 0.5);
        this.addChild(graphics);

        this._debugDraw = new Box2dDraw();
        this._debugDraw.Prepare(graphics, 32, {
            shapes: true,
            joints: true,
            pairs: false,
            aabbs: false,
            massCenters: false,
            particles: false,
        });

        // Ground Edge
        {
            const leftWall = new b2EdgeShape();
            leftWall.SetTwoSided({ x: -15.0, y: 0.0 }, { x: -15.0, y: 10.0 });

            const rightWall = new b2EdgeShape();
            rightWall.SetTwoSided({ x: 15.0, y: 0.0 }, { x: 15.0, y: 10.0 });

            const floor = new b2EdgeShape();
            floor.SetTwoSided({ x: -20.0, y: -0.0 }, { x: 20.0, y: -0.0 });

            const ground = world.CreateBody({
                type: b2BodyType.b2_staticBody,
                position: { x: 0.0, y: -10.0 },
            });
            ground.CreateFixture({ shape: leftWall });
            ground.CreateFixture({ shape: rightWall });
            ground.CreateFixture({ shape: floor });
        }

        // Sinusoidal Edge
        {
            const ground = world.CreateBody({
                position: { x: 10.0, y: -0.5 },
            });

            let x1 = -20;
            let y1 = -5 + 2 * Math.cos((x1 / 10) * Math.PI);
            for (let i = 0; i < 40; ++i) {
                const x2 = x1 + 0.5;
                const y2 = -5 + 2 * Math.cos((x2 / 10) * Math.PI);

                const shape = new b2EdgeShape();
                shape.SetTwoSided(new b2Vec2(x1, y1), new b2Vec2(x2, y2));
                ground.CreateFixture({ shape });

                x1 = x2;
                y1 = y2;
            }
        }

        // Ball
        {
            let count = 0;

            const interfalId = setInterval(() => {
                count++;
                const shape = new b2CircleShape();
                shape.m_p.SetZero();
                shape.m_radius = random(0.4, 0.8);

                const body = world.CreateBody({
                    type: b2BodyType.b2_dynamicBody,
                    position: { x: random(-10, 10), y: 10 - random(-4, 4) },
                });

                body.CreateFixture({
                    shape,
                    density: 1.0,
                });

                if (count > 20) {
                    clearInterval(interfalId);
                }
            }, 100);
        }

        {
            const ground = world.CreateBody();

            // const shape = new b2EdgeShape();
            // shape.SetTwoSided(new b2Vec2(-40, -14), new b2Vec2(40, -14));
            // ground.CreateFixture({ shape });

            {
                const w = 0.25;
                const shape = new b2PolygonShape();
                shape.SetAsBox(w, 0.125);

                const fd: b2FixtureDef = {
                    shape,
                    density: 10.0,
                };

                const jd = new b2RevoluteJointDef();
                jd.collideConnected = true;

                const count = 20;
                let prevBody = ground;
                for (let i = 0; i < count; ++i) {
                    const body = world.CreateBody({
                        type: b2BodyType.b2_dynamicBody,
                        position: { x: -4 + w * 2 * i, y: -0 },
                    });
                    body.CreateFixture(fd);

                    const anchor = new b2Vec2(-4.5 + w * 2 * i, -0);
                    jd.Initialize(prevBody, body, anchor);
                    world.CreateJoint(jd);
                    prevBody = body;
                }

                const anchor = new b2Vec2(-4.5 + w * 2 * count, -0);
                jd.Initialize(prevBody, ground, anchor);
                world.CreateJoint(jd);
            }
        }
    }

    public readonly update = (): void => {
        this._world.Step(1 / 60, {
            positionIterations: 2,
            velocityIterations: 4,
        });

        this._debugDraw.Update(this._world);
    };
}
