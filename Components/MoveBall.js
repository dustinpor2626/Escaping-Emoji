
import {Dimensions} from 'react-native';


var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;
const dia = 40;
const bomb_dia = 60;
const min_bomb_speed = -3;
const max_bomb_speed = 3;
const ball_speed = 5;

const randomCoin = (min,max) => {

    var rand = Math.floor(min + Math.random() * (max - min));
    return rand;
  
  }




const MoveBall = (entities, { touches ,events,dispatch}) => {

    let ball = entities.ball;
    let coin = entities.coin;
    let bomb = [entities.bomb1,entities.bomb2,entities.bomb3];


if(events.length){

    for(let i =0 ; i< events.length; i++){

            if(events[i].type === "move_right"){
                ball.xSpeed = ball_speed;
            }
            else if(events[i].type === "move_left"){
                ball.xSpeed = -ball_speed;
            }
            else if(events[i].type === "move_up"){
                 ball.ySpeed = -ball_speed; 
            }
            else if(events[i].type === "move_down" ){
                 ball.ySpeed = ball_speed; 
            }

    }
}



if(ball.position[0] <= 0){
    ball.position[0] = width - 1;
}else if(ball.position[0] >= width ){
    ball.position[0] = 1;
}


if(ball.position[1] <= 0){
    ball.position[1] = height - (dia + 1);
}else if(ball.position[1] >= height - dia){
    ball.position[1] = 1;
}


if(ball.position[0] < width && ball.position[0] > 0){
    ball.position[0] += ball.xSpeed; 
}

    if(ball.position[1] > 0 && ball.position[1] < height - dia){
    ball.position[1] += ball.ySpeed; 
    }


    if(
        ((ball.position[0] + dia >= coin.position[0]  &&  ball.position[0] + dia < coin.position[0] + dia) ||
        (ball.position[0] <= coin.position[0] + dia  &&  ball.position[0] > coin.position[0])) &&
        ((ball.position[1] + dia >= coin.position[1]  &&  ball.position[1] + dia < coin.position[1] + dia) ||
        (ball.position[1] <= coin.position[1] + dia  &&  ball.position[1] > coin.position[1]))
        )
    {
        coin.position[0] = randomCoin(5,width - 60);
        coin.position[1] = randomCoin(15,height - 100);
        dispatch({
            type:"score"
        })
    }




for(let i = 0 ; i < 3 ;i++){


    if(
        ((ball.position[0] + dia >= bomb[i].position[0]  &&  ball.position[0] + dia < bomb[i].position[0] + bomb_dia) ||
        (ball.position[0] <= bomb[i].position[0] + bomb_dia  &&  ball.position[0] > bomb[i].position[0])) &&
        ((ball.position[1] + dia >= bomb[i].position[1]  &&  ball.position[1] + dia < bomb[i].position[1] + bomb_dia) ||
        (ball.position[1] <= bomb[i].position[1] + bomb_dia  &&  ball.position[1] > bomb[i].position[1]))
        )
    {
        //game over

        dispatch({
            type: "game_over"
        })
    }


    
    if(bomb[i].position[0] <= 0){
        bomb[i].xSpeed =  Math.floor(1 + Math.random() * (max_bomb_speed));
        bomb[i].position[0] += bomb[i].xSpeed; 
    }else if(bomb[i].position[0] >= width - bomb_dia){
        bomb[i].xSpeed = Math.floor((min_bomb_speed) + Math.random() * 2);
        bomb[i].position[0] += bomb[i].xSpeed; 
    }


    if(bomb[i].position[1] <= 10){
        bomb[i].ySpeed =  Math.floor(1 + Math.random() * (max_bomb_speed));
        bomb[i].position[1] += bomb[i].ySpeed; 
    }else if(bomb[i].position[1] >= height - bomb_dia){
        bomb[i].ySpeed =  Math.floor((min_bomb_speed) + Math.random() * 2);
        bomb[i].position[1] += bomb[i].ySpeed; 
    }


    if(bomb[i].position[0] < width - bomb_dia && bomb[i].position[0] > 0){
        bomb[i].position[0] += bomb[i].xSpeed; 
    }

        if(bomb[i].position[1] > 10 && bomb[i].position[1] < height - bomb_dia){
            bomb[i].position[1] += bomb[i].ySpeed; 
        }

}





    return entities;
}

export default MoveBall;