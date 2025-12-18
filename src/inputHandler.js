export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = new Set();
        this.mouseButtons = new Set();
        this.mousePos = { x: 0, y: 0 };


        window.addEventListener("keydown", (e) => {
            this.keys.add(e.key.toLowerCase());
        });

        window.addEventListener("keyup", (e) => {
            this.keys.delete(e.key.toLowerCase());
        });

        this.game.canvas.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                this.mouseButtons.add(e.button);
            }
        });

        this.game.canvas.addEventListener("mouseup", (e) => {
            this.mouseButtons.delete(e.button);
        });

        this.game.canvas.addEventListener("mousemove", (e) => {
            const rect = this.game.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });
    }


    isKeyDown(key) {
        return this.keys.has(key.toLowerCase());
    }

    isMouseDown(button=0) {
        return this.mouseButtons.has(button);
    }
}