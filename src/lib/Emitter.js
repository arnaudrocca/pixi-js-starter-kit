import Particle from './Particle'

class Emitter {

	/**
	 * @constructor
     * @param {object} scene - The scene
	 */
	constructor(scene) {

        this.scene = scene;
		this.particles = new Array();

        this.delay = 150;
        this.flow = 3;
        this.timer = 0;

	}

	/**
     * @method
     * @name throw
     * @description Add new particles in the scene
     * @param {number} number - Number of thrown particles
     */
	throw(number) {

		for (let i = 0; i < number; i++) {
			const particle = new Particle();
			this.particles.push(particle);
			this.scene.add(particle);
		}

	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every TweenMax tick
	 * @param {number} dt - DELTA_TIME
	 */
	update(dt) {

		this.timer += dt;

        if (this.timer >= this.delay) {
            this.timer = 0;
            this.throw(this.flow);
        }

        // Update the particles
        for (let i in this.particles) {
            const particle = this.particles[i];
            particle.update(dt);
            // Kill the particles
            if (!particle.isAlive) {
                this.particles.splice(i, 1);
                this.scene.remove(particle);
            }
        }

	}

}

export default Emitter
