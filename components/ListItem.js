import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
const ListItem = ({ item , deleteItem }) => {
  return (
    <TouchableOpacity style={styles.list}>
      <View style={styles.view}>
        <Text style={styles.text}>{item.text}</Text>
        <Icon name='delete' size={20} color="firebrick" onPress={() => deleteItem(item.id)}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 15,
    borderColor: "#eee",
    borderBottomWidth: 1,
    backgroundColor: "#f8f8f8"
  },
  view: {
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:"center"
  },
  text: {
    color: "#666",
    fontSize: 19,
    textAlign: "left",
    marginLeft: 10,
    alignItems: "center"
  }
});

export default ListItem;
