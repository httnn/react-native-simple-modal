'use strict';

import React from 'react-native';

const {
   View,
   Component,
   StyleSheet,
   TouchableOpacity,
   Animated,
   PropTypes,
   Platform,
   BackAndroid
} = React;

class Modal extends Component {
   constructor() {
      super();

      this.state = {
         opacity: new Animated.Value(0),
         scale: new Animated.Value(0.8),
         offset: new Animated.Value(0)
      };
   }
   componentWillReceiveProps(props) {
      if (props.open !== this.props.open) {
         if (props.open)
            this.open();
         else
            this.close();
      }

      if (props.offset !== this.props.offset) {
         this.animateOffset(props.offset);
      }
   }
   componentDidMount() {
      if (Platform.OS === 'android') {
         BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.state.open) {
               this.close();
               return true;
            }
            return false;
         });
      }
   }
   setPhase(toValue) {
      if (this.state.open != toValue) {
         const {animationDuration, animationTension} = this.props;
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

         setTimeout(() => {
            if (toValue)
               this.props.modalDidOpen();
            else {
               this.setState({open: false, renderedContent: undefined});
               this.props.modalDidClose();
            }
         }, animationDuration);
      }
   }
   render() {
      const {opacity, open, scale, offset} = this.state;
      const {overlayOpacity, children} = this.props;
      return (
         <View
         pointerEvents={open ? 'auto' : 'none'}
         style={[styles.absolute, styles.container]}>
            <TouchableOpacity
            style={styles.absolute}
            onPress={this.close.bind(this)}
            activeOpacity={0.75}>
               <Animated.View style={{flex: 1, opacity, backgroundColor: 'rgba(0, 0, 0, ' + overlayOpacity + ')'}} />
            </TouchableOpacity>
            <Animated.View
               style={[
                  styles.defaultModalStyle,
                  this.props.style,
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
   overlayOpacity: PropTypes.number,
   animationDuration: PropTypes.number,
   animationTension: PropTypes.number,
   modalDidOpen: PropTypes.func,
   modalDidClose: PropTypes.func
};

Modal.defaultProps = {
   open: false,
   offset: 0,
   overlayOpacity: 0.75,
   animationDuration: 200,
   animationTension: 40,
   modalDidOpen: () => undefined,
   modalDidClose: () => undefined
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
   }
});

export default Modal;
