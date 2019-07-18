import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

function blink(animatedValue, isUp, duration) {
  return Animated.timing(animatedValue, {
    toValue: isUp ? 1 : 0,
    duration,
  });
}

export function useLoopEngine(duration = 1000) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [running, setRunning] = useState(false);
  const [animationLoop, setAnimationLoop] = useState(0);

  useEffect(() => {
    if (running) {
      Animated.sequence([
        blink(animatedValue, true, duration),
        blink(animatedValue, false, duration),
      ]).start();
      setAnimationLoop(
        setInterval(() => {
          Animated.sequence([
            blink(animatedValue, true, duration),
            blink(animatedValue, false, duration),
          ]).start();
        }, 2 * duration),
      );
    } else {
      clearInterval(animationLoop);
      setAnimationLoop(0);
    }
  }, [running]);

  function toggleStatus(status) {
    setRunning(status);
  }

  return [animatedValue, toggleStatus];
}

export function useScrollEngine(inputRange) {
  const [animatedValue] = useState(new Animated.Value(0));
  function handleNativeEvent(event) {
    animatedValue.setValue(event.nativeEvent.contentOffset.y);
  }
  const interpolatedValue = animatedValue.interpolate({
    inputRange,
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return [interpolatedValue, handleNativeEvent];
}

export function interpolate(animatedValue, outputRange) {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: outputRange,
  });
}
