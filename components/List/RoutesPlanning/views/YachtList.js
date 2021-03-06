import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Image, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


const colors = require("../../../../utilities/Colors")
const endpoint = require("../../../../utilities/RestEndpoints").yachts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.brandMarine
  },
  rightContainer:{
    flex:2
  },
  item: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flex:1,
    flexDirection: "row"
  },
  title: {
    fontSize: 24,
  },
  year: {
    fontSize: 18,
    color: "gray"
  },
  image: {
    flex: 1,
    width: 80,
    height: 70,
    marginRight: 20
  }
});



const DATA = [
  {
    type: "Open Yacht",
    length: "26",
    year: "2000",
    capacity: "10",
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Nówka',
    year: "2019",
    url: "https://www.motorowy.com/sites/motorowy.pl/files/styles/summarize_1065/public/ferretti_yachts_720_1.jpg?itok=1V_ZB57o"
  },
  {
    type: "Open Yacht",
    length: "26",
    year: "2000",
    capacity: "10",
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Cewka',
    year: "2010",
    url: "https://f.allegroimg.com/s512/01f245/6781912548c292875bc5fe3d6a3f/FLY-zaglowka-lodka-lodz-rekreacja-szkolenie"
  },
  {
    type: "Open Yacht",
    length: "26",
    year: "2000",
    capacity: "10",
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Nieśmigana',
    year: "2009",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQS2m1zg_57d2ExGSVDU3SocQg0IPZ7fXR5w&usqp=CAU"
  },
];

export default function YachtListView({navigation}) {
  
  const [data, setData] = useState([]);

  async function getRestData() {
      console.log("hello")
      const value = await AsyncStorage.getItem('id_token');
      if (value !== null) {
        fetch(endpoint, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + value
          }
        })
        .then(response => response.json())
        .then(result => {
          //if(result.isArray()){
           let newData = result.map((item) => {
              return {
                type: item.type,
                length: item.length.toString(),
                year: item.yearBuilt.toString(),
                capacity: item.humanCapacity.toString(),
                id: item.id.toString(),
                name: item.yachtName,
                url: item.image
              }
            })
            setData(newData)
          //}
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
  }

  useEffect(() => {
    if(data.length == 0)
      getRestData();
  });

  useLayoutEffect(() => {
  });
  
  let onPressItem = (data) => {
    navigation.navigate("Yacht edit", {yachtObj: data});
  }
  
  const Item = ({ title, id, year, graphicUrl, index }) => (
  <TouchableOpacity style={styles.item} onPress={()=>{onPressItem(data[index])}}>
      <Image
        style={styles.image}
        source={{
          uri: graphicUrl,
        }}
      />
    <View style={styles.rightContainer}> 
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.year}>{year}</Text>
    </View>
  </TouchableOpacity>
  );  

  const renderItem = ({ item, index }) => (
    <Item title={item.name} id={item.id} year={item.year} graphicUrl={item.url} index={index}/>
  );
  
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        ListHeaderComponent={
          <View style={{flex: 1, flexDirection: 'column', justifyContent: "center", height:150, width:"100%", alignItems: "center"}}>
            <Button
              icon={
                <AntDesign name="pluscircleo" size={32} color={"white"}/>
              }
              type="clear"
              onPress={()=>{
               navigation.navigate("Yacht edit", {yachtObj: null});
              }}
            />
            <Text style={{color: "white"}}>New yacht</Text>
          </View>
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}



