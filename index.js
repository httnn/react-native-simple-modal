import React, {Component, PropTypes} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  BackAndroid
} from 'react-native'

class Modal extends Component {
  constructor() {
    super();
    
    this.state = {
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.8),
      offset: new Animated.Value(0)
    };
    
    this.hardwareBackPress = this.hardwareBackPress.bind(this);
  }
  componentWillMount() {
    if (this.props.open) {
      this.setState({children: this.props.children});
      this.open();
    }
  }
  componentWillReceiveProps(props) {
    if (props.open && props.children !== this.state.children) {
      this.setState({children: props.children});
    }

    if (props.animationDuration === 0) {
      this.state.scale.setValue(1);
    } else {
      this.state.scale.setValue(this.props.open ? 1 : 0.8);
    }

    if (props.open !== this.props.open) {
      if (props.open) {
        this.open();
      } else {
        this.close();
      }
    }
    
    if (props.offset !== this.props.offset) {
      this.animateOffset(props.offset);
    }
  }
  hardwareBackPress() {
    if (this.props.disableOnBackPress) {
      return true;
    }

    if (this.state.open) {
      this.close();
      return true;
    }
    
    return false;
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.hardwareBackPress);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.hardwareBackPress);
    }
  }
  setPhase(toValue) {
    if (this.state.open != toValue) {
      const {animationDuration, animationTension} = this.props;
      if (animationDuration === 0) {
        this.state.opacity.setValue(toValue);
      } else {
        Animated.timing(
          this.state.opacity,
          {
            toValue,
            duration: animationDuration
          }
        ).start();
        
        Animated.spring(
          this.state.scale,
          {
            toValue: toValue ? 1 : 0.8,
            tension: animationTension
          }
        ).start();
      }
      
      setTimeout(() => {
        if (toValue) {
          this.props.modalDidOpen();
        } else {
          this.setState({open: false, children: undefined});
          this.props.modalDidClose();
        }
      }, animationDuration);
    }
  }
  render() {
    const {opacity, open, scale, offset, children} = this.state;
    let containerStyles = [styles.absolute, styles.container, this.props.containerStyle];
    
    if (!this.state.open) {
      containerStyles.push(styles.hidden);
    }
    
    return (
      <View
        pointerEvents={open ? 'auto' : 'none'}
        style={containerStyles}>
        <TouchableOpacity
          style={styles.absolute}
          disabled={!this.props.closeOnTouchOutside}
          onPress={this.close.bind(this)}
          activeOpacity={0.75}>
          <Animated.View style={{flex: 1, opacity, backgroundColor: this.props.overlayBackground}} />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.defaultModalStyle,
            this.props.modalStyle,
            {opacity, transform: [{scale}, {translateY: offset}]}
          ]}>
          {children}
        </Animated.View>
      </View>
    );
  }
  open() {
    this.setState({open: true});
    this.setPhase(1);
  }
  close() {
    this.setPhase(0);
  }
  animateOffset(offset) {
    Animated.spring(
      this.state.offset,
      {toValue: offset}
    ).start();
  }
}

Modal.propTypes = {
  open: PropTypes.bool,
  offset: PropTypes.number,
  overlayBackground: PropTypes.string,
  animationDuration: PropTypes.number,
  animationTension: PropTypes.number,
  modalDidOpen: PropTypes.func,
  modalDidClose: PropTypes.func,
  closeOnTouchOutside: PropTypes.bool,
  disableOnBackPress: PropTypes.bool,
};

Modal.defaultProps = {
  open: false,
  offset: 0,
  overlayBackground: 'rgba(0, 0, 0, 0.75)',
  animationDuration: 200,
  animationTension: 40,
  modalDidOpen: () => undefined,
  modalDidClose: () => undefined,
  closeOnTouchOutside: true,
  disableOnBackPress: false,
};


const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  container: {
    justifyContent: 'center'
  },
  defaultModalStyle: {
    borderRadius: 2,
    margin: 20,
    padding: 10,
    backgroundColor: '#F5F5F5'
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0
  }
});

export default Modal;
  