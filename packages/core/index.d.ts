import { NativeScrollEvent, NativeSyntheticEvent, Animated } from 'react-native';
import AnimatedInterpolation = Animated.AnimatedInterpolation;

declare module 'react-native-animated-engine' {
  export function useLoopEngine(duration?: number): [Animated.Value, (state: boolean) => void];

  export function useScrollEngine(
    inputRange: number[],
  ): [Animated.Value, (event: NativeSyntheticEvent<NativeScrollEvent>) => void];

  export function useFireEngine(duration?: number): [Animated.Value, () => void];

  export function interpolate(
    animated: AnimatedInterpolation,
    outputRange: number[] | string[],
    easing?: (input: number) => number,
    extrapolate?: 'extend' | 'identity' | 'clamp',
    extrapolateLeft?: 'extend' | 'identity' | 'clamp',
    extrapolateRight?: 'extend' | 'identity' | 'clamp',
  ): AnimatedInterpolation;
}
