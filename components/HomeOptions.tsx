import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const OPTION1 = "OPTION1";
const OPTION2 = "OPTION2";

export default function HomeOptions({ navigation }: { navigation: any }) {
  const [page, setPage] = useState<string>("OPTION1");
  return (
    <View>
      <MainComponent page={page} setPage={setPage} />
    </View>
  );
}

const MainComponent = ({
  page,
  setPage,
}: {
  page: string;
  setPage: Function;
}) => {
  return (
    <View>
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.bntControl}
          onPress={() => {
            setPage(OPTION1);
          }}
          disabled={page === OPTION1 ? true : false}
        >
          <Text
            style={[
              styles.bntText,
              page === OPTION1 ? styles.activeText : null,
            ]}
          >
            Một năm
          </Text>
          {page === OPTION1 ? (
            <View
              style={{
                position: "absolute",
                bottom: -3,
                width: "100%",
                height: 3,
                backgroundColor: "#2966dc",
                borderRadius: 10,
              }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bntControl}
          onPress={() => {
            setPage(OPTION2);
          }}
          disabled={page === OPTION2 ? true : false}
        >
          <Text
            style={[
              styles.bntText,
              page === OPTION2 ? styles.activeText : null,
            ]}
          >
            Tất cả
          </Text>
          {page === OPTION2 ? (
            <View
              style={{
                position: "absolute",
                bottom: -3,
                width: "100%",
                height: 3,
                backgroundColor: "#2966dc",
                borderRadius: 10,
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      {page === OPTION1 ? <Option1Component /> : null}
      {page === OPTION2 ? <Option2Component /> : null}
    </View>
  );
};

const Option1Component = () => {
  return (
    <View>
      <Text>Option1</Text>
    </View>
  );
};

const Option2Component = () => {
  return (
    <View>
      <Text>Option2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderBottomColor: "#d3d3d3",
    flexDirection: "row",
    alignContent: "center",
  },
  bntControl: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bntText: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
    color: "#626262",
  },
  activeText: {
    color: "#2966dc",
  },
});
