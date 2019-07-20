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

  let isRunning = false;
  useEffect(() => {
    if (running) {
      isRunning = true;
      startAnimation();
    } else {
      stopAnimation();
    }
    return stopAnimation;
  }, [running]);

  function startAnimation() {
    if (!isRunning) return;
    Animated.sequence([
      blink(animatedValue, true, duration),
      blink(animatedValue, false, duration),
    ]).start(() => {
      startAnimation();
    });
  }

  function stopAnimation() {
    isRunning = false;
    animatedValue.stopAnimation();
  }

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

export function useFireEngine(duration) {
  const [animatedValue] = useState(new Animated.Value(0));
  function fire() {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
    });
  }
  return [animatedValue, fire];
}

export function interpolate(
  animatedValue,
  outputRange,
  easing,
  extrapolate,
  extrapolateLeft,
  extrapolateRight,
) {
  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange,
    easing,
    extrapolate,
    extrapolateLeft,
    extrapolateRight,
  });
}
