import {onSnake, equalPositions} from "./snake.js"
import {getRandomGridPosition} from "./grid.js"
let wall = getRandomWallPosition()
const walls = [{ x: -1, y: -1 }]
let newWall = 0
let foodAte = 0
let foodEaten = 0

export function update(){
    if(foodEaten > foodAte){
        addWall(1)
        wall = getRandomWallPosition()
        foodAte = foodEaten
    }
}


export function draw(gameBoard){
    walls.forEach(part =>{
        const wallElement = document.createElement('div')
        wallElement.style.gridRowStart = part.y
        wallElement.style.gridColumnStart = part.x
        wallElement.classList.add('wall')
        gameBoard.appendChild(wallElement)
    })
}


function getRandomWallPosition(){
    let newWallPosition
    while(newWallPosition == null || onSnake(newWallPosition)){
        newWallPosition = getRandomGridPosition()
    }
    return newWallPosition
}


export function checkWallDeath(){
    let wallChecker = 0
    walls.forEach(part => {
        if(onSnake(part)){
            wallChecker += 1
        }
    })
    if(wallChecker > 0){
        return true
    }else{
        return false
    }
}

function addWall(newWall){
    for(let i = 0; i < newWall; i++){
        walls[walls.length] = getRandomWallPosition()
    }

    newWall = 0
}

export function updateFoodIntake(){
    foodEaten += 1
}

export function onWall(pos){
    return walls.some(part => {
        return equalPositions(part, pos)
    })
}