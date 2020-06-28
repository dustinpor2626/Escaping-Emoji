import React from 'react';
import { StyleSheet, Text, View ,Animated, Button,Slider,Dimensions, TouchableOpacity,ImageBackground,Modal} from 'react-native';
import { GameEngine , GameLoop} from "react-native-game-engine";
import Ball from './Components/Ball.js';
import MoveBall from './Components/MoveBall.js';
import Coin from './Components/Coin.js';
import Bomb from './Components/Bomb.js';


const multiple_in_slider = 10;
const minus_in_slider = 5;
var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;

export default class App extends React.Component{

  state = {
    running:false,
    start:true,
    stop:false,
    score:0,
  }


randomCoin = (min,max) => {

  var rand = Math.floor(min + Math.random() * (max - min));
  return rand;

}


get_random_speed = () => {

  var rand = Math.floor(-2 + Math.random() * 4);

  if(rand == 0){
    return 2;
  }else{
    return rand;  
  }

}


object = () => {

  const obj = {
    ball:{ position:[0,0], xSpeed:1, ySpeed:1, renderer: <Ball />},
    bomb2:{ position:[width - 200,height - 200], xSpeed:this.get_random_speed(), ySpeed:this.get_random_speed(), renderer: <Bomb/>},
    bomb1:{ position:[width - 100,height - 100], xSpeed:this.get_random_speed(), ySpeed:this.get_random_speed(), renderer: <Bomb/>},
    bomb3:{ position:[width - 100,height - 50], xSpeed:this.get_random_speed(), ySpeed:this.get_random_speed(), renderer: <Bomb/>},
    bomb4:{ position:[width - 100,height - 200], xSpeed:this.get_random_speed(), ySpeed:this.get_random_speed(), renderer: <Bomb/>},
    coin:{ position:[this.randomCoin(5,width - 60),this.randomCoin(15,height - 100)], xSpeed:1, ySpeed:1, renderer: <Coin />},
  }

  return obj;
}


event = (e) => {

    if(e.type === "game_over"){
      this.setState({running:false});
      alert('Game Over');
    }

    if(e.type === "score"){
      this.setState(pre => {return {score:pre.score + 1}}  );
    }
}

 
  render(){  
  return (
    <View style={styles.container}> 

    <Modal
        animationType="slide"
        transparent={true}
      visible={this.state.start}
    >
      <View ><Text>hiiiiiii</Text></View>
    </Modal>

        <ImageBackground source={require('./Components/img/background.jpeg')} style={{height:'100%',width:'100%'}} blurRadius={1} >

        <Text style={{color:'red',fontSize:40,position:'absolute',top:height/2,left:width/2}}>{this.state.score}</Text>

          <GameEngine
               ref = {(ref) => this.engine = ref}
              style={styles.engine} 
              systems={[MoveBall]}
              entities={ this.object() }
              running={this.state.running}
              onEvent={this.event}
              />

              <View style={styles.right} >
                  <ImageBackground source={require('./Components/img/right.png')} style={{width:'100%',height:'100%'}}>
              <TouchableOpacity onPress={() => this.engine.dispatch({type:"move_right"})} >
              <View style={styles.but} />
              </TouchableOpacity>
                  </ImageBackground>
              </View>
 

              <View style={styles.left} >
               <ImageBackground source={require('./Components/img/left.png')} style={{width:'100%',height:'100%'}}> 
              <TouchableOpacity onPress={() => this.engine.dispatch({type:"move_left"})} >
              <View style={styles.but} />
              </TouchableOpacity>
              </ImageBackground>
              </View>


              <View style={styles.up} >
              <ImageBackground source={require('./Components/img/up.png')} style={{width:'100%',height:'100%'}}>
              <TouchableOpacity onPress={() => this.engine.dispatch({type:"move_up"})}>
              <View style={styles.but} />
              </TouchableOpacity>
              </ImageBackground>
              </View>


              <View style={styles.down} >
              <ImageBackground source={require('./Components/img/down.png')} style={{width:'100%',height:'100%'}}>
              <TouchableOpacity onPress={() => this.engine.dispatch({type:"move_down"})} >
              <View style={styles.but} />
              </TouchableOpacity>
              </ImageBackground>
              </View>
              
              {/* <Slider
              style={styles.vertical_slide}
                value={this.state.y}
                minimumTrackTintColor='black'
                maximumTrackTintColor='black'
                thumbTintColor='white'
                 onValueChange= {(value) => {
                    this.setState({y:value});
                    this.move_vertical(value);
                 }} />

      
      
                 <Slider
                 style={styles.horizontal_slide}
                   value={this.state.x}
                   minimumTrackTintColor='black'
                   maximumTrackTintColor='black'
                   thumbTintColor='white'
                    onValueChange= {(value) => {
                       this.setState({x:value});  
                       this.move_horizontal(value);
                    }} /> */}
       
       </ImageBackground>

</View> 
  );

  }
}



const styles = StyleSheet.create({

  container: {
    height:'100%',
    width:'100%',
  },

engine:{
  height:'100%',
  width:'100%',
},

// vertical_slide:{
//   transform: [{ rotate: '-90deg' }], 
//   position:'absolute',
//   top:height - 100,
//   left:width/10 - 50  ,
//   width:100,
//   height:20,
//   backgroundColor:'black'
// },

// horizontal_slide:{
//  position:'absolute',
//  top:height - 80,
//  left:width - 120,
//  width:100,
//  height:20,
//  backgroundColor:'black'
// },

right:{
  width:50,
  height:50,
  position:'absolute', 
  top:height - 90,
  left:width - 60,
},

left:{
  width:50,
  height:50,
  position:'absolute',
  top:height - 90,
  left:width - 115,
},

up:{
  width:50,
  height:50,
  position:'absolute',
  top:height - 120,
  left:10,
},

down:{
  width:50,
  height:50,
  position:'absolute',
  top:height - 70,
  left:60,
},

but:{
  width:'100%',
  height:'100%',
}


});
