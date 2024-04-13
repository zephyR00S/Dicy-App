import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import dice1 from '../assets/One.png';
import dice2 from '../assets/Two.png';
import dice3 from '../assets/Three.png';
import dice4 from '../assets/Four.png';
import dice5 from '../assets/Five.png';
import dice6 from '../assets/Six.png';

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function App(): JSX.Element {
  const [diceIndex, setDiceIndex] = useState<number>(0);
  const [buttonColor] = useState(new Animated.Value(0));
  const [diceRotation] = useState(new Animated.Value(0));

  useEffect(() => {
    const buttonAnimation = Animated.loop(
      Animated.timing(buttonColor, {
        toValue: 1000,
        duration: 5000,
        useNativeDriver: false,
      })
    );
    buttonAnimation.start();

    return () => buttonAnimation.stop();
  }, []);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setDiceIndex(randomNumber);
    Animated.timing(diceRotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      diceRotation.setValue(0);
    });
    ReactNativeHapticFeedback.trigger("impactLight", options);
  };

  const buttonBackgroundColor = buttonColor.interpolate({
    inputRange: [0,250,500,750, 1000],
    outputRange: ['#01000a', '#080363','#08a103','#fbff03', '#a80204'],
  });

  const diceRotationStyle = {
    transform: [
      {
        rotate: diceRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.diceImage, diceRotationStyle]}
        source={diceImages[diceIndex]}
      />
      <Pressable onPress={rollDice}>
        <Animated.View style={[styles.rollDiceButton, { backgroundColor: buttonBackgroundColor }]}>
          <Text style={styles.rollDiceBtnText}>Press Me</Text>
        </Animated.View>
      </Pressable>
    
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010e1c',
  },
  diceImage: {
    width: 200,
    height: 200,
    marginBottom: 50
    
  },
  rollDiceButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#06051c',
    shadowColor: '#bee4f7',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.999,
    shadowRadius: 10,
    elevation: 2,
  },
  rollDiceBtnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default App;