import 'TweenMax'
import Scene from './scene/scene'
import Emitter from './lib/emitter'

class App {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.scene = new Scene(this.width, this.height);
        this.emitter = new Emitter(this.scene);

        const root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.view);

        this.addListeners();

    }

    /**
     * @method
     * @name onResize
     * @description Triggered when window is resized
     */
    onResize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);

    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));

    }

    /**
     * @method
     * @name update
     * @description Triggered on every TweenMax tick
     */
    update() {

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        this.emitter.update(this.DELTA_TIME);
        this.scene.render();

    }

}

export default App
