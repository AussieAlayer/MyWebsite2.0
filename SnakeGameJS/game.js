import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeIntersection,getSnakeHead } from "./snake.js"
import { update as updateWall, draw as drawWall, checkWallDeath } from "./wall.js"
import { update as updateFood, draw as drawFood, score} from "./food.js"
import { outsideGrid} from "./grid.js"

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime){
    if(gameOver){
        if(confirm('You died! Press OK to restart or Cancel to return Home')){
            window.location = '/SnakeGameJS/slither.html'
        }else{
            window.location = '/index.html'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) /1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime
    
    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    document.getElementById("score").innerHTML = score;
    updateSnake()
    updateFood()
    updateWall()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawWall(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || checkWallDeath()
}