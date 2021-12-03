import React, {useState, useEffect} from "react";
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export function HomeScreen({ route, navigation }) {
  const [isloading, setloading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try{
      const response = await fetch("https://api.sampleapis.com/beers/ale")
      const json = await response.json();
      setData(json)
    }catch (error){
      console.log(error)
    }finally{
      setloading(false)
    }
  }

  useEffect(() =>{
    getMovies();
  }, [])

 

  function handleSettingsPress() {
    navigation.navigate("Settings");
  }

  return (
    
    <View style={styles.screen}>
    

<View>
        {isloading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <ScrollView>
              <View style={styles.itemWraper}>
                <View style={styles.itemImage}>
                  <Image style={styles.image} source={{uri:`${item.image}`}}/>
                </View>
                <View style={styles.itemText}>
                  <Text>{item.name}</Text>
                  <Text style={styles.priceText}>{item.price}</Text>
                  <Text>RATING: {item.rating.average}</Text>
                  <Text>REVIEW NUMBER: {item.rating.reviews}</Text>
                </View>
              </View>
              </ScrollView>
            )} />
        )}

      </View>
      
    </View>
   
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  itemWraper: {
    flexDirection: "row",
    margin: 20
  },
  image:{
    height: 100,
    width: 100,
    resizeMode: "contain"
  },
  priceText:{
    fontWeight: "bold"
  }
});
