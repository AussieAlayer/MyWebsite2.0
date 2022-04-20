import {onSnake, expandSnake} from "./snake.js"
import {updateFoodIntake, onWall} from "./wall.js"
import {getRandomGridPosition} from "./grid.js"
let food = getRandomFoodPosition()
const EXPANSION_RATE = 3
export let score = 0

export function update(){
    if(onSnake(food)){
        updateFoodIntake()
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        score += 1
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition) || onWall(newFoodPosition)){
        newFoodPosition = getRandomGridPosition()
    }
    return newFoodPosition
}