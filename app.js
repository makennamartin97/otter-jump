document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const player = document.createElement('div');
    
    let startPoint = 150;
    let playerLeftSpace = 50;
    let playerBottomSpace = startPoint;
    let isGameOver = true;
    let cloudCount = 5;
    let clouds = [];
    var score = 0;
    let upTimerID;
    let downTimerID;
    let isJumping = false;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerID;
    let rightTimerID;
    let score2 = document.getElementById("score");


    
   

    


    class Cloud {
        constructor(newCloudBottom){
            this.bottom = newCloudBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');
            // storing in variable so we can add it
            const visual = this.visual;
            visual.classList.add('cloud')
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            // passing thru new visual
            grid.appendChild(visual);

        }
    }
    
    function createClouds() {
        for(let i = 0; i < cloudCount; i++){
            let cloudGap = 600 / cloudCount;
            let newCloudBottom = 100 + i * cloudGap;
            let newCloud = new Cloud(newCloudBottom);
            clouds.push(newCloud);
            console.log(clouds)


        }
    }

    function createPlayer() {
        grid.appendChild(player)
        player.classList.add('player')
        playerLeftSpace = clouds[0].left;
        player.style.left = playerLeftSpace + 'px';
        player.style.bottom = playerBottomSpace + 'px';
        console.log(player)
    }

    function moveClouds(){
        if(playerBottomSpace > 200){
            clouds.forEach(cloud => {
                cloud.bottom -= 4;
                let visual = cloud.visual;
                visual.style.bottom = cloud.bottom + 'px';

                if(cloud.bottom < 10){
                    let firstCloud = clouds[0].visual;
                    firstCloud.classList.remove('cloud');
                    clouds.shift();
                    score++;
                    console.log(score)
                    score2.innerHTML = "Score: ";
                    score2.innerHTML+= score;
                    var newCloud = new Cloud(600)
                    clouds.push(newCloud);
                    
                }
            })
        }
    }

    function jump(){
        clearInterval(downTimerID);
        isJumping = true;
        upTimerID = setInterval(function() {
            playerBottomSpace += 15;
            player.style.bottom = playerBottomSpace + 'px';
            if(playerBottomSpace > (startPoint + 200)){
                fall();
                isJumping = false;
            }

        },30)
    }

    function fall() {
        isJumping = false;
        clearInterval(upTimerID);
        
        downTimerID = setInterval(function () {
            playerBottomSpace -= 5;
            player.style.bottom = playerBottomSpace + 'px';
            if(playerBottomSpace <= 0){
                gameOver();
            }
            clouds.forEach(cloud =>{
                if(
                    (playerBottomSpace >= cloud.bottom) &&
                    (playerBottomSpace <= cloud.bottom + 18) &&
                    ((playerLeftSpace + 60) >= cloud.left) &&
                    (playerLeftSpace <= (cloud.left + 85)) &&
                    !isJumping
                ) {
                    console.log('landed')
                    startPoint = playerBottomSpace;
                    jump();
                    isJumping = true;
                }
            })
        }, 20)
    
    }
    function gameOver(){
        isGameOver = true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }

        grid.innerHTML = "GAME OVER!" + "<br />"
        grid.innerHTML += "Score: " + score;
        
    
        clearInterval(upTimerID);
        clearInterval(downTimerID);
        clearInterval(rightTimerID);
        clearInterval(leftTimerID);
        

    }

    function control(e){
        if(e.key === "ArrowLeft"){
            moveLeft();
        }else if (e.key === "ArrowRight"){
            moveRight();
        }else if (e.key === "ArrowUp"){
            moveStraight();
        }
    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerID)
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerID = setInterval(function () {
            if(playerLeftSpace >= 0){
                playerLeftSpace -=5;
                player.style.left = playerLeftSpace + 'px';
            } else moveRight()

        }, 30)

    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerID)
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerID = setInterval(function () {
            if(playerLeftSpace <= 340){
                playerLeftSpace +=5;
                player.style.left = playerLeftSpace + 'px';
            } else moveLeft()

        }, 30)

    }

    function moveStraight(){
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerID)
        clearInterval(leftTimerID)
    }




    function start(){

        if (!isGameOver){
            document.getElementById("button").style.visibility = 'hidden';
            document.getElementById("otterjump").style.visibility = 'hidden';
            createClouds();
            createPlayer();
            //console.log(player);
            drawScore();
            setInterval(moveClouds, 30);
            jump(startPoint);

            
            document.addEventListener('keyup', control);
            
            console.log(score)
        
                
        }else{
            document.getElementById("button").style.visibility = 'visible';
        }
    }

    function createButton(){

        var o = document.getElementById("otterjump");
        var x = document.getElementById("button");
        x.addEventListener("click", start);
        isGameOver = false;
    }

    function drawScore(){

        score2.innerHTML = "Score: ";
        score2.innerHTML+= score;
    }

    createButton();
    
        
        
        
    


    
})