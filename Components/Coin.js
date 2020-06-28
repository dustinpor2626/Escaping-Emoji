import  React from 'react';
import { StyleSheet, Text, View ,Button,Slider,Dimensions,Image,Animated,Easing} from 'react-native';




class Coin extends React.Component{

  
    state = {
        rotate:new Animated.Value(0),
    }


    componentDidMount(){

        this.animate();
    }


    animate = () => {

            this.state.rotate.setValue(0);  
                Animated.timing(this.state.rotate,{
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                }).start(() => this.animate());
        
    }



    render(){

        const RotateData = this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          });

    return(
        <Animated.View style={[styles.ball,{top:this.props.position[1],left:this.props.position[0]},{transform: [{ rotateY: RotateData }]}]} >
            <Image source={require('./img/coin.png')} style={{height:'100%',width:'100%'}} />
        </Animated.View>
  
    ); 

    }
}


const styles = ({

ball:{
    height:40,
    width:40,
    borderRadius:20,
    position:'absolute'
}


});

export default Coin;