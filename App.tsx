import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";

interface renderItemProps {
  item: { timeStamp: number; text: string };
  index: number;
}

const DATA = [
  { timeStamp: Date.now(), text: "Sample Text" },
  { timeStamp: Date.now() + 1, text: "Sample Text" },
];

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(DATA);

  const handleDelete = (timeStamp: number) => {
    const res = data.filter((val) => val.timeStamp !== timeStamp);

    setData([...res]);
  };

  const handleAdd = () => {
    const res = { timeStamp: Date.now(), text: text };
    setData([...data, res]);
    setText("");
  };

  const renderItem = ({ item, index }: renderItemProps) => {
    return (
      <View key={index} style={styles.renderItem}>
        <View style={styles.check} />
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.delete} />
      </View>
    );
  };
  const renderHiddenItem = ({ item, index }: renderItemProps) => {
    return (
      <View key={index} style={styles.renderHiddenItem}>
        <Pressable onPress={null}>
          <Text style={styles.icon}>✏️</Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item.timeStamp)}>
          <Text style={styles.icon}>🗑️</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView bounces={false}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>✅ To do list</Text>
        </View>
        <View style={styles.swiperWrapper}>
          <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={wp(10)}
            rightOpenValue={-wp(10)}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            value={text}
            placeholder="문구를 입력해주세요."
            placeholderTextColor="#aaa"
            onChangeText={(text) => setText(text)}
            style={styles.textInput}
          />
          <Pressable style={styles.pressable} onPress={handleAdd}>
            <Text>➕</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  wrapper: {
    width: wp(100),
    height: hp(20),
    justifyContent: "center",
    paddingLeft: wp(10),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "800",
  },
  renderItem: {
    width: wp(90),
    height: wp(90) / 4,
    backgroundColor: "#fff",
    marginHorizontal: wp(5),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },
  check: {
    width: hp(4),
    height: hp(4),
    backgroundColor: "#8D71FE",
    borderRadius: 4,
    margin: wp(5),
    opacity: 0.4,
  },
  text: {
    width: wp(50),
  },
  delete: {
    width: hp(2),
    height: hp(2),
    backgroundColor: "#8D71FE",
    borderRadius: 100,
    marginHorizontal: wp(10),
  },
  swiperWrapper: {
    width: wp(100),
    height: hp(70),
  },
  renderHiddenItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(4),
  },
  icon: {
    fontSize: hp(3),
  },
  textInputWrapper: {
    width: wp(100),
    height: hp(10),
    flexDirection: "row",
  },
  textInput: {
    width: wp(60),
    height: hp(5),
    marginLeft: wp(10),
    paddingLeft: wp(3),
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  pressable: {
    width: hp(5),
    height: hp(5),
    marginLeft: wp(10),
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
