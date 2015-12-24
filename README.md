# react-native-simple-modal
A simple JavaScript modal component for React Native. Works on both iOS and Android.

<img src="https://i.imgur.com/EiwkCWn.gif" width="300" />

## Installation
`npm install react-native-simple-modal --save`

## Usage

### Properties and their default values

```javascript
import Modal from 'react-native-simple-modal';

<Modal
	overlayOpacity={0.75}
	animationDuration={200}
	animationTension={40}
	modalDidOpen={() => undefined}
	modalDidClose={() => undefined}
	style={{
      borderRadius: 2,
      margin: 20,
      padding: 10,
      backgroundColor: '#F5F5F5'
	}}>
   ...
</Modal>
```

### Methods

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
'use strict';

import React from 'react-native';
import Modal from 'react-native-simple-modal';

const {
   AppRegistry,
   Component,
   Text,
   TouchableOpacity,
   View
} = React;

class Example extends Component {
   render() {
      return (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.refs.modal.open()}>
               <Text>Open modal</Text>
            </TouchableOpacity>
            <Modal
               ref="modal"
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => console.log('modal did close')}
               style={{alignItems: 'center'}}>
               <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
               <TouchableOpacity
                  style={{margin: 5}}
                  onPress={() => this.refs.modal.animateOffset(-100)}>
                  <Text>Move modal up</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={{margin: 5}}
                  onPress={() => this.refs.modal.animateOffset(0)}>
                  <Text>Reset modal position</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={{margin: 5}}
                  onPress={() => this.refs.modal.close()}>
                  <Text>Close modal</Text>
               </TouchableOpacity>
            </Modal>
         </View>
      );
   }
}

AppRegistry.registerComponent('myapp', () => Example);

```
