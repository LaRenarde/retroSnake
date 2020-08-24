document.addEventListener("DOMContentLoaded",  function(){
    const nb_colonnes = 20;
    const nb_lignes = 20;
    const cote = 20;
    let score = document.getElementById("score");
    let textScore = 0;
    let canvas = document.querySelector(".dessin")
    let ctx = canvas.getContext("2d")
    canvas.width = nb_colonnes*cote;
    canvas.height = nb_lignes*cote;


    class Snake{
        constructor(){
            this.size = 20,
            this.color = "#0B0316",
            this.direction = "droite",
            this.x =canvas.width/2,
            this.y= canvas.height/2,
            this.longueur = [{x:this.x, y:this.y}],
            this.taille = 3,
            this.tete = []
            
        }

        createSnake(canvas, ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            ctx.fillStyle =this.color;
            for(var i=0;i < this.longueur.length;i++) {             
                ctx.fillRect(this.longueur[i].x,this.longueur[i].y, this.size-2, this.size-2);
                ctx.fill()
            }          
            this.longueur.push({x:this.x, y:this.y});

            while(this.longueur.length > this.taille){
                this.longueur.shift();
            }
        }
    }
    
    class Bonbon{
        constructor(){
            this.size = 15,
            this.color = "red",
            this.y = Math.floor(Math.random() * Math.floor(canvas.height)),
            this.x = Math.floor(Math.random() * Math.floor(canvas.width))
        }
        createBonbon(ctx){
            ctx.beginPath();
            ctx.fillStyle = bonbon.color
            ctx.fillRect(bonbon.x, bonbon.y, bonbon.size, bonbon.size); 
            ctx.stroke()
            ctx.closePath()
        }
    }
    const snake = new Snake();
    const bonbon= new Bonbon();

    let timerJeu = setInterval(() => {
        move(snake);
        update(canvas, ctx);
        
    },100)


    function move(snake){
        if(snake.direction === "haut"){
            snake.y -= 20 
        }
        if(snake.direction === "bas"){
            snake.y += 20
        }
        if(snake.direction === "gauche"){
            snake.x -= 20 
        }
        if(snake.direction === "droite"){
            snake.x += 20
        }

        border(snake)    
    }


    function border(snake){ //permet de traverser les murs
        let canvas = document.querySelector(".dessin")
        if(snake.x === canvas.width+20 - snake.size && snake.direction === "droite"){
            snake.x = 0
        }
        if(snake.x+20 === 0 && snake.direction === "gauche"){
            snake.x = canvas.width
        }
        if(snake.y === canvas.height+20 - snake.size && snake.direction === "bas"){

            snake.y = 0
        }
        if(snake.y+20 === 0 && snake.direction === "haut"){
            snake.y = canvas.height
        }
    }
  
    function update(canvas, ctx){
        snake.tete =[snake.longueur[snake.longueur.length-1].x, snake.longueur[snake.longueur.length-1].y];
        for(var i=0,l = snake.longueur.length-1; i<l; i++){
            if((snake.tete[0]==snake.longueur[i].x)&&(snake.tete[1]==snake.longueur[i].y)){
                gameOver();   
            }         
        } 
        if(snake.x < bonbon.x + bonbon.size && snake.x + snake.size > bonbon.x && snake.y < bonbon.y + bonbon.size && snake.size + snake.y > bonbon.y){
            placeBonbon();
            snake.taille +=1;
            textScore +=10;
            score.innerText = textScore;
        }
        snake.createSnake(canvas, ctx)
        bonbon.createBonbon(ctx)
    }


    function gameOver(){
        
        clearInterval(timerJeu);
        alert("Game Over!");
        location.reload();
        localStorage.setItem('listes', JSON.stringify(liste))
    }

    function placeBonbon(){
        bonbon.y= 10+Math.floor(Math.random() * Math.floor(canvas.height-20));
        bonbon.x = 10+Math.floor(Math.random()* Math.floor(canvas.width-20))

        for(var i=0,l = snake.longueur.length-1; i<l; i++){
            if((bonbon.x==snake.longueur[i].x)&&(bonbon.y ==snake.longueur[i].y)){
                bonbon.y= 10+Math.floor(Math.random() * Math.floor(canvas.height-20));
                bonbon.x = 10+Math.floor(Math.random()* Math.floor(canvas.width-20))
            }         
        }
    }


    window.addEventListener("keypress",function(e){
      
        if(e.key === 'z' && snake.direction !== "bas"){
           snake.direction = "haut"
           return
        }
        if(e.key === 'q' && snake.direction !== "droite"){
           snake.direction = "gauche"
           return
        }
        if(e.key === 's' && snake.direction !== "haut"){
           snake.direction = "bas"
           return
        }
        if(e.key === 'd' && snake.direction !== "gauche"){
           snake.direction = "droite"
           return
        }
    })


})


