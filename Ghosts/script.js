/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 200;
const enemiesArray = [];
let gameFrame = 0;


class Enemy {
    constructor(){
        this.enemyImage = new Image();
        this.enemyImage.src = '../img/enemy3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 100;
        this.angleSpeed = Math.random() * 2;
        //this.curve = Math.random() * 200 + 50;
    }
    draw() {
        ctx.drawImage(this.enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update() {
        this.x = CANVAS_WIDTH / 2 * Math.sin(this.angle * Math.PI/180) + (CANVAS_WIDTH / 2 - this.width / 2);
        this.y = CANVAS_HEIGHT / 2 * Math.cos(this.angle * Math.PI/360) + (CANVAS_HEIGHT / 2 - this.height / 2);
        this.angle += this.angleSpeed;
        if(this.x + this.width < 0) this.x = CANVAS_WIDTH;
        if(gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;    
        }
        
    }
}

//const enemy1 = new Enemy();

for(let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());

}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();

    })
    gameFrame++;
    requestAnimationFrame(animate)
}

animate();