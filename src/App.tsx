import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, ImageSourcePropType, Image} from 'react-native';
import dice1 from '../assets/One.png';
import dice2 from '../assets/Two.png';
import dice3 from '../assets/Three.png';
import dice4 from '../assets/Four.png';
import dice5 from '../assets/Five.png';
import dice6 from '../assets/Six.png';

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
}>

const Dice = ({imageUrl}: DiceProps ):JSX.Element => {
 return(
  <View>
    <Image style = {styles.diceImage} source={imageUrl}></Image>
  </View>
 )
}

function App(): React.JSX.Element {
  return <View></View>;
}

const styles = StyleSheet.create({});

export default App;
