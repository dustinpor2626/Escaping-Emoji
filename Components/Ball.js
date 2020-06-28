import  React from 'react';
import { StyleSheet, Text, View ,Animated, Button,Slider,Dimensions,Image   } from 'react-native';




class Ball extends React.Component{

    render(){
    return(
        <View style={[styles.ball,{top:this.props.position[1],left:this.props.position[0]}]} >
                                    <Image source={require('./img/emoji.png')} style={{height:'100%',width:'100%'}} />
            </View>
  
    ); 

    }
}


const styles = ({

ball:{
    height:40,
    width:40,
    borderRadius:20,
    position:'absolute',
}


});

export default Ball;