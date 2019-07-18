import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

declare module 'react-native-animated-engine' {
  import { Animated } from 'react-native';
  import AnimatedInterpolation = Animated.AnimatedInterpolation;

  export function useLoopEngine(
    duration?: number,
  ): [AnimatedInterpolation, (state: boolean) => void];

  export function useScrollEngine(
    inputRange: [number, number],
  ): [AnimatedInterpolation, (event: NativeSyntheticEvent<NativeScrollEvent>) => void];

  export function interpolate(
    animated: AnimatedInterpolation,
    outputRange: [number, number],
  ): AnimatedInterpolation;
}
