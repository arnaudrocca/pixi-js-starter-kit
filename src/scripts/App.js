import 'TweenMax';
import bindAll from 'lodash.bindall';
import Scene from './utils/Scene';
import Emitter from './lib/Emitter';

export default class App {

    /**
     * @constructor
     */
    constructor() {

        const $root = document.body.querySelector('.app');

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.DELTA_TIME = 0;
        this.CURRENT_TIME = Date.now();

        this.scene = new Scene(this.width, this.height);
        this.emitter = new Emitter(this.scene);

        $root.appendChild(this.scene.renderer.view);

        bindAll(this, ['resizeHandler', 'update']);

        this.addListeners();

        requestAnimationFrame(this.update);

    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.resizeHandler);

    }

    /**
     * @method
     * @name resizeHandler
     * @description Triggered when window is resized
     */
    resizeHandler() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);

    }

    /**
     * @method
     * @name update
     * @description Triggered on every frame
     */
    update() {

        this.DELTA_TIME = Date.now() - this.CURRENT_TIME;
        this.CURRENT_TIME = Date.now();

        this.emitter.update(this.CURRENT_TIME, this.DELTA_TIME);
        this.scene.render();

        requestAnimationFrame(this.update);

    }

}
