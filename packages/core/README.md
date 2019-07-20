# react-native-animated-engine

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Version](https://img.shields.io/npm/v/react-native-animated-engine.svg)](https://www.npmjs.com/package/react-native-animated-engine)
[![npm](https://img.shields.io/npm/dt/react-native-animated-engine.svg)](https://www.npmjs.com/package/react-native-animated-engine)

A react-hooks utility to help build react native animations

## Example app

![image](https://raw.githubusercontent.com/InfiniteXyy/react-native-animated-engine/master/screenshot.gif)

## Installation

```bash
yarn add react-native-animated-engine
```

## Usage

`useLoopEngine` is designed for those animation running again and again forever.

```jsx
import { useLoopEngine } from 'react-native-animated-engine';

const App = () => {
  const [loopValue, setBlink] = useLoopEngine();

  // start blinking when app started
  useEffect(() => {
    setBlink(true);
    return () => setBlink(false);
  }, []);
  return (
    <Animated.View style={{ opacity: loopValue }}>
      <View style={styles.skeleton} />
    </Animated.View>
  );
};
```

`useScrollEngine` is designed for binding animation to a ScrollView.

```jsx
import { useScrollEngine } from 'react-native-animated-engine';

const App = () => {
  const [scrollValue, handleNativeScrollEvent] = useScrollEngine([5, 30]);
  return (
    <ScrollView onScroll={handleNativeScrollEvent} scrollEventThrottle={32}>
      <Animated.View style={[styles.header, { opacity: scrollValue }]}>
        <Header title="Engine" />
      </Animated.View>
    </ScrollView>
  );
};
```

`useFireEngine` is designed for animations that only act once. After the animation finished, the value will keep it's value, but when you fire it again, it will reset itself.

```jsx
const App = () => {
  // set duration to 500
  const [fireValue, fire] = useFireEngine(500);
  const heightValue = interpolate(fireValue, [0, 50]);
  return (
    <View>
      <View style={[styles.ball, { height: heightValue }]} />
    </View>
  );
};
```

After you get these animation values, you can `interpolate` them to a proper output range. By default, the value is from 0 to 1.

```jsx
const [loopValue, setBlink] = useLoopEngine();
const opacityValue = interpolate(loopValue, [0.2, 0.7]);
```

## Running example app (Expo)

```bash
git clone https://github.com/InfiniteXyy/react-native-animated-engine
cd react-native-animated-engine/example-app
yarn
yarn start
```

## License

MIT
