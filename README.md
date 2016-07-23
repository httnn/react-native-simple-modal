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
	overlayBackground={'rgba(0, 0, 0, 0.75)'}
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
	}}>
</Modal>
```

### Methods

**Deprecated! The usage of these methods is discouraged. Use the properties `open` and `offset` instead.**

```javascript
// opens the modal
modalRef.open();

// closes the modal
modalRef.close();

// can be used to animate a translation of the modal along the Y-axis
// useful when for example the modal has a text input and the modal needs to move up so that it's not hidden behind the keyboard
modalRef.animateOffset(number);
```

## Example
```javascript
import React, { Component } from 'react';
import Modal from 'react-native-simple-modal';

import {
   AppRegistry,
   Text,
   TouchableOpacity,
   View
} from 'react-native';

class Example extends Component {
   constructor() {
      super();
      this.state = {
         open: false
      };
   }
   render() {
      return (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.setState({open: true})}>
               <Text>Open modal</Text>
            </TouchableOpacity>
            <Modal
               offset={this.state.offset}
               open={this.state.open}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({open: false})}
               style={{alignItems: 'center'}}>
               <View>
                  <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({offset: -100})}>
                     <Text>Move modal up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({offset: 0})}>
                     <Text>Reset modal position</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({open: false})}>
                     <Text>Close modal</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         </View>
      );
   }
}

AppRegistry.registerComponent('myapp', () => Example);

```
