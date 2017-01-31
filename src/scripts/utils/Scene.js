import { CanvasRenderer, Container } from 'pixi.js';

export default class Scene {

	/**
	 * @constructor
	 */
	constructor(width, height) {

		const pixelRatio = window.devicePixelRatio;

		TweenMax.set('.app', { scale: 1 / pixelRatio, transformOrigin: '0% 0%' });

		this.renderer = new CanvasRenderer(width, height, { antialias: true, resolution: pixelRatio });

		this.stage = new Container();

	}

	/**
	 * @method
	 * @name addChild
	 * @description Add a child to the stage
	 * @param {object} child - A PIXI object
	 */
	add(child) {

		this.stage.addChild(child);

	}

	/**
	 * @method
	 * @name remove
	 * @description Remove a child from the stage
	 * @param {object} child - A PIXI object
	 */
	remove(child) {

		this.stage.removeChild(child);

	}

	/**
	 * @method
	 * @name render
	 * @description Renders/Draw the scene
	 */
	render() {

		this.renderer.render(this.stage);

	}

	/**
	 * @method
	 * @name resize
	 * @description Resize the scene according to screen size
	 * @param {number} newWidth
	 * @param {number} newHeight
	 */
	resize(newWidth, newHeight) {

		this.renderer.resize(newWidth, newHeight);

	}

}
