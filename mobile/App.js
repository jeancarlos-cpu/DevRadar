import React from "react";
import { StatusBar, Text, View, YellowBox } from "react-native";
import Routes from "./src/routes";
import "react-native-gesture-handler";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
