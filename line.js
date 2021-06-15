import {
  ScrollView,
  TextInput,
  Text,
  useColorScheme,
  View,
  StyleSheet,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import React, {Component, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

function list_to_lines(list, remove_func){
  line_list = [];
  for (let index = 0; index < list.length-1; index++) {
    // console.log(list[index - 1].cs);
    line_list.push(<Line remove_func={remove_func} key={index} id={index} previous={list[index + 1].cs}  current = {list[index].cs} date={list[index].date} />);
  }
  return line_list;
}

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
  const opace = (props.id %2 == 1? 0.7 : 1);

  return (
    <View 
      style={[styles.line, {opacity: opace  }]}
    >
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {props.date}
      </Text>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            paddingHorizontal: 6,
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
            marginLeft: 12,
            flexGrow:1,
          },
        ]}>
        { calc(props.current ,  props.previous) }
      </Text>
      <Button title="X" style={{ marginLeft:22 }} onPress={ ()=>{ 
        (props.remove_func)(props.id);
        }  } />
    </View>
  );
};

const List_line = (props) => {
  
  const [newcs, set_newcs] = useState(0);
  
  const remove_line = (id)=>{
    console.log(id);
    var a = props.read_list().slice();
    a.splice(id,1);
    props.set_list(a);
  }

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[{flex:1}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[ 
          {flex: 2}
      ]}>
          { list_to_lines( props.read_list() , remove_line) }
      </ScrollView>
      <View style={[ {flexDirection: 'row', backgroundColor: (isDarkMode? Colors.black : Colors.white) }, styles.bottom]}>
        <TextInput
          keyboardType = 'numeric'
          style={{height: 40, borderWidth:2, borderColor:'#00FF00', flexGrow:1}}
          placeholder="chỉ số điện mới"
          onChangeText={text => { 
            set_newcs(text);
          }}
        />
        <Button title="ADD" 
          onPress = {()=>{
            props.set_list([ {cs: newcs, date: Intl.DateTimeFormat('vi-VN').format(new Date())} , ...props.read_list()]);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  bottom:{
    
    justifyContent: 'flex-end',
  },
  sectionContainer: {
    marginTop: 30,
  },
  line: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 5,
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
    justifyContent: 'flex-start',    
    paddingHorizontal:5,

  },
  highlight: {
    fontWeight: '700',
  },
});


export {List_line};