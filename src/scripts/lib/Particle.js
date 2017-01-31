import { Graphics } from 'pixi.js';

export default class Particle extends Graphics {

    /**
     * @constructor
     */
    constructor() {

        super();

        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;

        this.radius = 3;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = 100;

        this.isAlive = true;

    }

    /**
     * @method
     * @name update
     * @description Triggered on every frame
	 * @param {number} time - CURRENT_TIME
	 * @param {number} delta - DELTA_TIME
     */
    update(time, delta) {

        this.clear();

        this.velocityX = Math.cos(this.angle) * delta * this.speed / 1000;
        this.velocityY = Math.sin(this.angle) * delta * this.speed / 1000;

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.radius -= delta / 1000;

        if (this.radius <= 0) {
            this.isAlive = false;
        }

        this.beginFill(0xFFFFFF);
        this.drawCircle(0, 0, this.radius);

    }

}
