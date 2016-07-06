import { Graphics } from 'pixi.js'

class Particle extends Graphics {

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
     * @description Triggered on every TweenMax tick
     * @param {number} dt - DELTA_TIME
     */
    update(dt) {

        this.clear();

        this.velocityX = Math.cos(this.angle) * dt * this.speed / 1000;
        this.velocityY = Math.sin(this.angle) * dt * this.speed / 1000;

        this.x += this.velocityX;
        this.y += this.velocityY;

        this.radius -= dt / 1000;

        if (this.radius <= 0) {
            this.isAlive = false;
        }

        this.beginFill(0xFFFFFF);
        this.drawCircle(0, 0, this.radius);

    }

}

export default Particle
