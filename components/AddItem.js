import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import Icon from "react-native-vector-icons/dist/FontAwesome";

const AddItem = ({ addItem }) => {
  const [newtext, setText] = useState("");
  const onChange = textValue => {setText(textValue); };
  return (
    <View>
      <TextInput
        placeholder="Add one item"
        style={styles.input}
        onChangeText={onChange}
      />
      <TouchableOpacity style={styles.btn} onPress={() => addItem(newtext)}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} />
          {"   Add Item"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    fontSize: 15
  },
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    margin: 5
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center"
  }
});
export default AddItem;
