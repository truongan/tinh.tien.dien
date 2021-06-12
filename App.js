/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

function calc(current ,previous ){
  var amount =  current - previous;

  //https://www.evn.com.vn/c3/evn-va-khach-hang/Bieu-gia-ban-le-dien-9-79.aspx 
  var list = [ 
    { 'bracket' : 400  , 'price':   2927},
    { 'bracket' : 300  , 'price':   2834},
    { 'bracket' : 200  , 'price':   2536},
    { 'bracket' : 100  , 'price':   2014},
    { 'bracket' : 50   , 'price':    1734},
    { 'bracket' : 0, 'price':     1678},
  ];

  sum = 0;
  for(var i = 0; i < list.length; i++){
    if (amount > list[i].bracket){
      sum += (amount - list[i].bracket)*list[i].price;
      amount = list[i].bracket;
    }
  }  
  sum *= 1.1;
  return Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum);
  
}

const Line = (props) =>{
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View 
      style={styles.line}
    >
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            paddingHorizontal: 24,
          },
        ]}>
        {props.date}
      </Text>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            paddingHorizontal: 24,
          },
        ]}>
        {props.current}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        { props.current -  props.previous }
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,       
          },
          {marginLeft: 22}
        ]}>
        { calc(props.current ,  props.previous) }
      </Text>
    </View>
  );
};

const List_line = (props) => {
  
  const backgroundStyle = {
    backgroundColor: ( useColorScheme() === 'dark') ? Colors.darker : Colors.lighter,
  };
  
  // const [line_list, set_line_list] = useState(props.list);
  // set_line_list(props.list);
  return (
    <View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle,
          {flex: 1}
        ]}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: ( useColorScheme() === 'dark') ? Colors.black : Colors.white,
          }}>

          {props.list}
        </View>
        
        
      </ScrollView>
      <View style={[ {flexDirection: 'row'}, styles.bottom, backgroundStyle]}>
        <TextInput
          style={{height: 40, justifyContent: 'flex-start'}}
          placeholder="Type here to translate!"
        />

      </View>
    </View>
  );
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  list = [
    {date:'none', cs:'7180'},
    {date:'19/02/2021', cs:'7459'},
    {date:'15/03/2021', cs:'7841'},
    {date:'15/04/2021', cs:'8317'},
    {date:'15/03/2021', cs:'7841'},
    {date:'15/04/2021', cs:'8317'},
    {date:'15/03/2021', cs:'7841'},
    {date:'15/04/2021', cs:'8317'},
    {date:'15/03/2021', cs:'7841'},
    {date:'15/04/2021', cs:'8317'},
    {date:'15/05/2021', cs:'8817'},

  ];

  line_list = [];
  for (let index = 1; index < list.length; index++) {
    // console.log(list[index - 1].cs);
    line_list.push(<Line previous={list[index - 1].cs}  current = {list[index].cs} date={list[index].date} />);
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>

      <List_line list={line_list}  />
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  bottom:{
    
    justifyContent: 'flex-end',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  line: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 14,
    alignContent: 'stretch',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
