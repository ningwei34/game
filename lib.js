let ga={
    lib:{}, ctx:null, audio:null,
    res:{
        total:4, loaded:0,
        sounds:{
            bullet:"bullet.mp3", explosion:"explosion.mp3"
        },
        imgs:{
            plane:"plane.png", explosion:"explosion.png"
        }
    },
    game:{
        id:0, circle:0, particles:null, plane:null,
        key:{
            space:false, left:false, top:false, right:false, bottom:false
        }
    }
};

ga.lib.Bullet=class{
    constructor(){
        this.x=Math.random()*ga.ctx.canvas.width;
        this.y=Math.random()*ga.ctx.canvas.height;
        this.vx=Math.random()*1.5+0.5;
        this.vy=Math.random()*1.5+0.5;
        this.size=2;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        return this.x>ga.ctx.canvas.width;
    }
    render(){
        ga.ctx.save();
        ga.ctx.fillStyle='white';
        ga.ctx.beginPath();
        ga.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ga.ctx.fill();
        ga.ctx.restore();
    }
}

ga.lib.BulletSystems=
class{
    constructor(){
        this.bullets=[];
    }
    update(){
        if(ga.game.circle%5==0){
            this.bullets.push(new ga.lib.Bullet());
        }
        for(let i=0; i<this.bullets.length; i++){
            let die=this.bullets[i].update();
            if(die){
                this.bullets.splice(i, 1);
                i--;
            }
        }
    }
    render(){
        for(let i=0; i<this.bullets.length; i++){
            this.bullets[i].render();
        }
    }
}

/*ga.lib.Bullet=class{
    constructor(x, y){
        this.x= x;
        this.y= y;
        this.vx=Math.random()*2;
        this.vy=Math.random()*2;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
        
    }
    render(){
        ctx.fillRect(this.x, this.y, 2, 2);
        ctx.fillStyle= "#FF0000";
    }
}*/

// 定義需要用到的類別
ga.lib.Plane=class{
    constructor(){
        this.x=ga.ctx.canvas.width/2;
        this.y=ga.ctx.canvas.height/2;
        this.size=20;
    }
    update(){
        let speed=1;
        let key=ga.game.key;
        if(key.space){
            speed*=2;
        }
        if(key.left){
            this.x-=speed;
        }
        if(key.top){
            this.y-=speed;
        }
        if(key.right){
            this.x+=speed;
        }
        if(key.bottom){
            this.y+=speed;
        }
        return false;
    }
    render(){
        ga.ctx.save(); // 儲存 Canvas 的設定
        ga.ctx.drawImage(
            ga.res.imgs.plane,
            this.x-this.size/2, this.y-this.size/2,
            this.size, this.size
        );
        if(ga.game.key.space){
            ga.ctx.drawImage(
                ga.res.imgs.explosion,
                this.x-5, this.y+10,
                10, 10
            );
        }
        ga.ctx.restore(); // 取回上一次儲存的設定
    }
};