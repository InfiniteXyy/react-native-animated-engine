import React, { useEffect } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { interpolate, useLoopEngine, useScrollEngine } from 'react-native-animated-engine';
import Header from './Header';

const App = () => {
  const [loopValue, setBlink] = useLoopEngine();
  const [scrollValue, handleNativeScrollEvent] = useScrollEngine([5, 30]);

  useEffect(() => {
    // componentDidMount => startBlink()
    setBlink(true);
    // componentWillUnMount => stopBlink()
    return () => setBlink(false);
  }, [setBlink]);

  // Animation engine will always use [0, 1] as output range
  // so you may interpolate it to your proper output range
  const opacityValue = interpolate(loopValue, [0.2, 0.7]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView onScroll={handleNativeScrollEvent} scrollEventThrottle={32}>
          <Text style={styles.title}>Engine</Text>
          <View style={styles.article}>
            <Animated.View style={{ opacity: opacityValue }}>
              <View style={styles.skeleton} />
              <View style={styles.skeleton} />
              <View style={styles.skeleton} />

              <View style={styles.gap} />

              <View style={styles.skeleton} />
              <View style={styles.skeleton} />
              <View style={styles.skeleton} />
            </Animated.View>
          </View>
        </ScrollView>
        <Animated.View style={[styles.header, { opacity: scrollValue }]}>
          <Header title="Engine" />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  article: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  skeleton: {
    marginTop: 10,
    borderRadius: 4,
    height: 20,
    backgroundColor: '#aaaaaa',
  },
  gap: {
    height: 20,
  },
});

export default App;
