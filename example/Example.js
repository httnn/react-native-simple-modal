import React from 'react';
import Modal from 'react-native-simple-modal';
import {AppRegistry, Text, TouchableOpacity, View} from 'react-native';

export default class Example extends React.Component {
  state = {open: false};
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

AppRegistry.registerComponent('ExampleModal', () => Example);