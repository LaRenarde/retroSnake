document.addEventListener("DOMContentLoaded",  function(){

    let snake = {
        size : 10,
        color : "#fff",
        direction: "droite",
        visage : {
            x: 400,
            y: 400,
            width : 11,
        },
        corps :{
            x: 380,
            y: 390,
            width : 20,

        },
        queue :{
            x: 380,
            y: 400,
            width : 10

        }

    }

    let bonbon = {
        size : 2,
        color : "red",
        y : null,
        x : null
    }

    setInterval(() => {
        createSnake(snake)
        move(snake)
        
    },5)


    function move(snake){
        if(snake.direction === "haut"){
            snake.visage.y -= 1 
        }
        if(snake.direction === "bas"){
            snake.visage.y += 1 
        }
        if(snake.direction === "gauche"){
            snake.visage.x -= 1 
        }
        if(snake.direction === "droite"){
            snake.visage.x += 1 
        }

        border(snake)
    
    }
    function border(snake){
        let canvas = document.querySelector(".dessin")

        if(snake.visage.x === canvas.width - snake.size && snake.direction === "droite"){
            snake.visage.x = 0
        }
        if(snake.visage.x === 0 && snake.direction === "gauche"){
            snake.visage.x = canvas.width
        }
        if(snake.visage.y === canvas.height - snake.size && snake.direction === "bas"){
            snake.visage.y = 0
        }
        if(snake.visage.y === 0 && snake.direction === "haut"){
            snake.visage.y = canvas.height
        }
    }

    function createSnake(snake) {
        let canvas = document.querySelector(".dessin")
        let ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    
        ctx.beginPath();
        ctx.fillStyle = snake.color
        ctx.ellipse(snake.visage.x, snake.visage.y, snake.visage.width, snake.visage.width, Math.PI / 4, 0, 2 * Math.PI); 
        ctx.fill()
        ctx.closePath()

        // ctx.beginPath()
        // ctx.fillStyle = snake.color
        // ctx.rect(snake.corps.x, snake.corps.y, snake.corps.width, snake.corps.width)
        // ctx.fill()
        // ctx.closePath()
    
        // ctx.beginPath();
        // ctx.ellipse(snake.queue.x, snake.queue.y, snake.queue.width, snake.queue.width, 10, 0, 2 * Math.PI); 
        // ctx.fill();
    }
    function createBonbon(bonbon){
        let canvas = document.querySelector(".dessin")
        bonbon.y = Math.floor(Math.random() * Math.floor(canvas.height));
        bonbon.x = Math.floor(Math.random() * Math.floor(canvas.width));

        let ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.beginPath();
        ctx.fillStyle = bonbon.color
        ctx.ellipse(bonbon.x, bonbon.x, snake.bonbon.size, bonbon.size, Math.PI / 4, 0, 2 * Math.PI); 
        ctx.fill()
        ctx.closePath()
    }
    


    window.addEventListener("keypress",function(e){
      
        if(e.key === 'z'){
           snake.direction = "haut"
           return
        }
        if(e.key === 'q'){
           snake.direction = "gauche"
           return
        }
        if(e.key === 's'){
           snake.direction = "bas"
           return
        }
        if(e.key === 'd'){
           snake.direction = "droite"
           return
        }
    })




})

