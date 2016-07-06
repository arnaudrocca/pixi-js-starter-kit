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

        this.velocityX = Math.cos(this.angle) * dt / 10;
        this.velocityY = Math.sin(this.angle) * dt / 10;

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.x < 0  || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
            this.isAlive = false;
        }

        this.beginFill(0xFFFFFF);
        this.drawCircle(0, 0, this.radius);

    }

}

export default Particle
