class Wave {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.simplex = new SimplexNoise();
        this.speedY = 0;
        this.speedX = 0;
        this.init();
    }
    init() {
        this.reset();
        this.loop();
    }
    reset() {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.count = Math.ceil(this.w / Math.floor(Math.random() * 40 + 15));
    }
    loop() {
        var This = this;

        function drawloop() {
            window.requestAnimationFrame(drawloop);
            This.ctx.clearRect(0, 0, This.w, This.h);
            This.speedX = 0;
            This.speedY += 0.01; //每次渲染需要更新波峰波谷值
            //连续绘制三次波浪线

            // This.draw('#402657', 'screen');
            // This.draw('#fff', 'screen');
            This.draw('#EA8D8D', 'screen');
            This.draw("#A890FE", 'screen');

        }
        drawloop();
    }
    draw(color, comp) {


        var amp = 50; //波浪幅度 可以通过函数传递参数更改不同的幅度
        this.ctx.beginPath();
        for (var i = 0; i <= this.count; i++) {
            this.speedX += 0.1;
            var x = i * (this.w / this.count);
            var y = this.h / 2 + this.simplex.noise2D(this.speedX, this.speedY) * amp;
            this.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
        }
        this.ctx.lineTo(this.w, -this.h);
        this.ctx.lineTo(0, -this.h);
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.globalCompositeOperation = comp;
        this.ctx.fill();
    }
}
new Wave();