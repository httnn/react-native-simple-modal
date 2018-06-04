# react-native-simple-modal

A simple JavaScript modal component for React Native. Works on both iOS and Android.

**Looking for maintainers! I'm not actively developing with React Native anymore and I don't have much time to keep this library up-to-date. If you're interested, hit me up: max.huttunen@gmail.com**

<img src="https://i.imgur.com/EiwkCWn.gif" width="300" />

## Installation

`npm install react-native-simple-modal --save`

## Usage

See example. Make sure to put the `<Modal>` at the end of the render function so that it renders above the content!

### Properties and their default values

```javascript
import Modal from "react-native-simple-modal";

<Modal
  animationDuration={200}
  animationTension={40}
  closeOnTouchOutside={true}
  containerProps={undefined}
  containerStyle={{
    justifyContent: "center"
  }}
  disableOnBackPress={false}
  modalDidClose={() => undefined}
  modalDidOpen={() => undefined}
  modalProps={undefined}
  modalStyle={{
    borderRadius: 2,
    margin: 20,
    padding: 10,
    backgroundColor: "#F5F5F5"
  }}
  offset={0}
  open={false}
  overlayStyle={{
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flex: 1
  }}
/>;
```

## Example

```javascript
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-simple-modal";

export default class App extends React.Component {
  state = { open: false };

  modalDidOpen = () => console.log("Modal did open.");

  modalDidClose = () => {
    this.setState({ open: false });
    console.log("Modal did close.");
  };

  moveUp = () => this.setState({ offset: -100 });

  resetPosition = () => this.setState({ offset: 0 });

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={this.openModal}>
          <Text>Open modal</Text>
        </TouchableOpacity>
        <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidOpen={this.modalDidOpen}
          modalDidClose={this.modalDidClose}
          style={{ alignItems: "center" }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Hello world!</Text>
            <TouchableOpacity style={{ margin: 5 }} onPress={this.moveUp}>
              <Text>Move modal up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={this.resetPosition}
            >
              <Text>Reset modal position</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 5 }} onPress={this.closeModal}>
              <Text>Close modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
```
