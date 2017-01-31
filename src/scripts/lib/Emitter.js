import Particle from './Particle';

export default class Emitter {

	/**
	 * @constructor
     * @param {object} scene - The scene
	 */
	constructor(scene) {

        this.scene = scene;
        this.particles = [];

        this.delay = 150;
        this.flow = 3;
        this.timer = 0;

	}

	/**
     * @method
     * @name throwParticles
     * @description Add new particles in the scene
     * @param {number} number - Number of thrown particles
     */
	throwParticles(number) {

		for (let i = 0; i < number; i++) {
			const particle = new Particle();
			this.particles.push(particle);
			this.scene.add(particle);
		}

	}

	/**
	 * @method
	 * @name update
	 * @description Triggered on every frame
	 * @param {number} time - CURRENT_TIME
	 * @param {number} delta - DELTA_TIME
	 */
	update(time, delta) {

		this.timer += delta;

        if (this.timer >= this.delay) {
            this.throwParticles(this.flow);
            this.timer = 0;
        }

        // Update the particles
        for (let i in this.particles) {
            const particle = this.particles[i];
            particle.update(time, delta);
            // Kill the particles
            if (!particle.isAlive) {
                this.particles.splice(i, 1);
                this.scene.remove(particle);
            }
        }

	}

}
