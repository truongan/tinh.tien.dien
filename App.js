/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect, useState} from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Button,
  ActivityIndicator
} from 'react-native';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {List_line} from './line';

import AsyncStorage from '@react-native-async-storage/async-storage';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [not_required_save, set_not_required_save] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  var saved ;
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@list', jsonValue);
      set_not_required_save(true);

    } catch (e) {
      // saving error
    }
  } 
  const getData = async () => {
    
      const jsonValue = await AsyncStorage.getItem('@list')
      if (jsonValue != null) {
        set_list( JSON.parse(jsonValue));
      } 
      else {
        set_list([
          {date:'15/5/2021', cs:'8817'},
          {date:'15/4/2021', cs:'8317'},
          {date:'15/3/2021', cs:'7841'},
          {date:'19/2/2021', cs:'7459'},
          {date:'none', cs:'7180'},
        ]);
      }
      setIsLoading(false);

  }

  useEffect(() => {
    getData();
  }, [])
  console.log("saved");
  console.log(saved);
  

  const [list, set_list]  = useState( saved );
  const read_list = ()=>{return list;}
  const child_set_list = (list) => {
    set_not_required_save(false);
    set_list(list);
  }

  if (isLoading) return <ActivityIndicator size="large" />;
  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <View  style={ {flexDirection: 'row'} }>
        <Text style={ 
          {fontSize:30,
            paddingVertical: 15,
            paddingHorizontal:15,
            backgroundColor: '#005000',
            color: '#FFFFFF',
            flexGrow:1,
          } 
        }> 
          TÍNH TIỀN ĐIỆN 
        </Text>
        <Button 
          style={ 
            {justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 15,
            } } 
          title='Save' disabled={not_required_save} 
          onPress = {() => {
            storeData(list);
          }}


        />
      </View>
      <List_line read_list={read_list} set_list={child_set_list} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
});

export default App;
