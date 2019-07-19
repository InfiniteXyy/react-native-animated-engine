import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HeaderProps = { title: string };

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Header;
