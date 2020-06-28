import  React from 'react';
import { StyleSheet, Text, View ,Animated, Button,Slider,Dimensions} from 'react-native';




class Bomb extends React.Component{

    render(){
    return(
        <View style={[styles.ball,{top:this.props.position[1],left:this.props.position[0]}]} />
  
    ); 

    }
}


const styles = ({

ball:{
    height:40,
    width:40,
    backgroundColor:'pink',
    borderRadius:20,
}


});

export default Bomb;