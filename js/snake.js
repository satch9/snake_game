//https://www.youtube.com/watch?v=9TcU2C1AACw




    const canvas = document.getElementById('snake');
    const ctx = canvas.getContext('2d');

    // creer une unite
    const box = 32;

    // chargement des images
    const ground = new Image();
    ground.src = 'img/ground.png';

    const foodImg = new Image();
    foodImg.src = 'img/food.png';

    // creer le snake
    let snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    }

    // creer le score
    let score = 0;

    // controler le snake
    let d;

    // creer la nourriture
    let food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }

    function direction(event) {
        if (event.keyCode == 37 && d != "RIGHT") {
            d = "LEFT";
        } else if (event.keyCode == 38 && d != "DOWN") {
            d = "UP";
        } else if (event.keyCode == 39 && d != "LEFT") {
            d = "RIGHT";
        } else if (event.keyCode == 40 && d != "UP") {
            d = "DOWN";
        }
    }
    
    document.addEventListener('keydown', direction);
    
    function collision(head, array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y ){
                return true;
            }
        }
        return false;
    }

    // dessiner tout le canvas
    function draw() {
        ctx.drawImage(ground, 0, 0);

        for (let i = 0; i < snake.length; i++) {

            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.drawImage(foodImg, food.x, food.y);

        // ancien emplacement de la tete du snake
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;


        // quelle direction
        if (d == "LEFT") {
            snakeX -= box;
        } else if (d == "UP") {
            snakeY -= box;
        } else if (d == "RIGHT") {
            snakeX += box;
        } else if (d == "DOWN") {
            snakeY += box;
        }

        // si le snake mange la nourriture
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }
        } else {
            // enlever la queue
            snake.pop();
        }

        // ajout nouvelle tete
        let newHead = {
            x: snakeX,
            y: snakeY
        }

        // game over
        if (snakeX < box || snakeX > 17 * box || 
            snakeY < 3 * box || snakeY > 17 * box || 
            collision(newHead,snake)) {
            clearInterval(game);
        }

        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(score, 2 * box, 1.6 * box);
    }

    

    // generer la carte tous les 100ms
    let game = setInterval(draw, 150);

