# react-native-simple-modal
A simple JavaScript modal component for React Native. Works on both iOS and Android.

<img src="https://i.imgur.com/EiwkCWn.gif" width="300" />

## Installation
`npm install react-native-simple-modal --save`

## Usage
See example. Make sure to put the `<Modal>` at the end of the render function so that it renders above the content! (RN currently doesn't yet have support for z-index).
### Properties and their default values

```javascript
import Modal from 'react-native-simple-modal';

<Modal
  open={false}
  offset={0}
  overlayBackground="rgba(0, 0, 0, 0.75)"
  animationDuration={200}
  animationTension={40}
  modalDidOpen={() => undefined}
  modalDidClose={() => undefined}
  closeOnTouchOutside={true}
  containerStyle={{
    justifyContent: 'center'
  }}
  modalStyle={{
    borderRadius: 2,
    margin: 20,
    padding: 10,
    backgroundColor: '#F5F5F5'
  }}
  disableOnBackPress={false}>
  </Modal>
```

## Example
```javascript
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-simple-modal';

export default class App extends React.Component {
  state = {open: false};

  modalDidOpen = () => console.log('Modal did open.')

  modalDidClose = () => {
    this.setState({open: false});
    console.log('Modal did close.');
  }

  moveUp = () => this.setState({offset: -100})

  resetPosition = () => this.setState({offset: 0})

  openModal = () => this.setState({open: true})

  closeModal = () => this.setState({open: false})

  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={this.openModal}>
        <Text>Open modal</Text>
      </TouchableOpacity>
      <Modal
        offset={this.state.offset}
        open={this.state.open}
        modalDidOpen={this.modalDidOpen}
        modalDidClose={this.modalDidClose}
        style={{alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
          <TouchableOpacity
          style={{margin: 5}}
          onPress={this.moveUp}>
            <Text>Move modal up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 5}}
            onPress={this.resetPosition}>
            <Text>Reset modal position</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{margin: 5}}
            onPress={this.closeModal}>
            <Text>Close modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    );
  }
}
```
