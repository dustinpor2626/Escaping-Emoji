import React from 'react';
import { StyleSheet, Text, View ,Dimensions, TouchableOpacity,ImageBackground,Modal,Image, Alert,BackHandler,AsyncStorage} from 'react-native';
import { GameEngine , GameLoop} from "react-native-game-engine";
import Ball from './Components/Ball.js';
import MoveBall from './Components/MoveBall.js';
import Coin from './Components/Coin.js';
import Bomb from './Components/Bomb.js';
import { Audio } from 'expo-av';



var width = Dimensions.get('screen').width;
var height = Dimensions.get('screen').height;

const score = new Audio.Sound();
const game = new Audio.Sound();
const start = new Audio.Sound();
const new_game = new Audio.Sound();



export default class App extends React.Component{

  state = {
    running:false,
    start:true,
    stop:false,
    score:0,
  }


componentDidMount() {

  setInterval(() => {
    this.sounds();
  },1000);

}

sounds = async () => {

  await score.loadAsync(require('./Components/sound/coin.mp3'));
  await game.loadAsync(require('./Components/sound/gaming.mp3'));
  game.setIsLoopingAsync(true);
  await start.loadAsync(require('./Components/sound/start.mp3'));
  await new_game.loadAsync(require('./Components/sound/new_game.mp3'));

}


  start = () => {
    start.playAsync();
    this.setState({start:false});
    this.setState({running:true});
    game.playAsync();
  }


  new_game = () => {
    new_game.playAsync();
    this.setState({stop:false});
    this.setState({score:0});
    this.setState({start:true});
    this.engine.swap(this.object());
  }


  quit = () =>{
      BackHandler.exitApp();
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
      this.setState({stop:true});
      game.stopAsync();
    }

    if(e.type === "score"){
      this.setState(pre => {return {score:pre.score + 1}});
      score.playAsync();
    }
}

 
  render(){  
  return (
    <View style={styles.container}> 



    <Modal
        animationType="slide"
        transparent={true}
      visible={this.state.start} >
      <View style={{height:'100%',width:'100%',backgroundColor:'white',opacity:0.5}} />
    </Modal>



    <Modal
        animationType="slide"
        transparent={true}
      visible={this.state.start}>
      <View style={{top:height/2 - 50,left:width/2-100,height:100,width:200}} >
      <TouchableOpacity onPress={() => this.start()}>
            <Image source={require('./Components/img/start.png')}  style={{height:'100%',width:'100%'}}/>
            </TouchableOpacity>
      </View>
    </Modal>



    <Modal
        animationType="fade"
        visible={this.state.stop}>

<ImageBackground source={require('./Components/img/background.jpeg')} style={{height:'100%',width:'100%'}} blurRadius={1} >
        <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>

          <View><Text style={{fontSize:40,color:'black'}}>Score</Text></View>
            <Text style={{fontSize:50,color:'red',marginTop:20,marginBottom:50}}>{this.state.score}</Text>
           <View >
            <TouchableOpacity onPress={() => this.new_game()}>
            <Image source={require('./Components/img/new_game.png')}  style={{height:100,width:200,resizeMode:'contain'}}/>
            </TouchableOpacity>
             </View>

             <TouchableOpacity onPress={() => {
               Alert.alert('Quit Game','Exit From Game',[
                 {
                   text:'Ok',
                   onPress:() => this.quit(),
                 },
                 {
                   text:'cancel',
                   style:'cancel',
                 }
               ])
               
               }}>
             <Text style={{fontSize:30,color:'blue',marginTop:20,fontStyle:'italic',fontWeight:'bold'}}>Quit</Text>
             </TouchableOpacity>

      </View>
      </ImageBackground>
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

right:{
  width:60,
  height:60,
  position:'absolute', 
  top:height - 90,
  left:width - 65,
},

left:{
  width:60,
  height:60,
  position:'absolute',
  top:height - 90,
  left:width - 140,
},

up:{
  width:60,
  height:60,
  position:'absolute',
  top:height - 130,
  left:10,
},

down:{
  width:60,
  height:60,
  position:'absolute',
  top:height - 70,
  left:65,
},

but:{
  width:'100%',
  height:'100%',
}


});
