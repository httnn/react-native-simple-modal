import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  ViewPropTypes,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  BackHandler,
} from "react-native";

class Modal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    offset: PropTypes.number,
    overlayStyle: ViewPropTypes.style,
    animationDuration: PropTypes.number,
    animationTension: PropTypes.number,
    modalDidOpen: PropTypes.func,
    modalDidClose: PropTypes.func,
    closeOnTouchOutside: PropTypes.bool,
    disableOnBackPress: PropTypes.bool,
    useNativeDriver: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
    offset: 0,
    animationDuration: 200,
    animationTension: 40,
    modalDidOpen: () => undefined,
    modalDidClose: () => undefined,
    closeOnTouchOutside: true,
    disableOnBackPress: false,
    useNativeDriver: true,
  };

  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.8),
    offset: new Animated.Value(this.props.offset),
    useNativeDriver: this.props.useNativeDriver,
  };

  UNSAFE_componentWillMount() {
    if (this.props.open) {
      this.setState({ children: this.props.children });
      this.open();
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.useNativeDriver !== this.props.useNativeDriver) {
      this.setState({ useNativeDriver: props.useNativeDriver });
    }

    if (props.open && props.children !== this.state.children) {
      this.setState({ children: props.children });
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

  hardwareBackPress = () => {
    if (this.state.open) {
      if (!this.props.disableOnBackPress) {
        this.close();
      }
      return true;
    }

    return false;
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.hardwareBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.hardwareBackPress
      );
    }
  }

  executeCallbacks(didOpen) {
    if (didOpen) {
      this.props.modalDidOpen();
    } else {
      this.setState({ open: false, children: undefined });
      this.props.modalDidClose();
    }
  }

  setPhase(toValue) {
    if (this.state.open != toValue) {
      const { animationDuration, animationTension } = this.props;
      if (animationDuration === 0) {
        this.state.opacity.setValue(toValue);
        this.executeCallbacks(toValue === 1);
      } else {
        Animated.timing(this.state.opacity, {
          toValue,
          duration: animationDuration,
          useNativeDriver: this.state.useNativeDriver,
        }).start();

        Animated.spring(this.state.scale, {
          toValue: toValue ? 1 : 0.8,
          tension: animationTension,
          useNativeDriver: this.state.useNativeDriver,
        }).start(() => this.executeCallbacks(toValue === 1));
      }
    }
  }

  render() {
    const { opacity, open, scale, offset, children } = this.state;
    let containerStyles = [
      styles.absolute,
      styles.container,
      this.props.containerStyle,
    ];

    if (!this.state.open) {
      containerStyles.push(styles.hidden);
    }

    return (
      <View
        pointerEvents={open ? "auto" : "none"}
        style={containerStyles}
        {...this.props.containerProps}
      >
        <TouchableOpacity
          style={styles.absolute}
          disabled={!this.props.closeOnTouchOutside}
          onPress={this.close}
          activeOpacity={0.75}
        >
          <Animated.View
            style={[
              styles.defaultOverlayStyle,
              { opacity },
              this.props.overlayStyle,
            ]}
          />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.defaultModalStyle,
            this.props.modalStyle,
            { opacity, transform: [{ scale }, { translateY: offset }] },
          ]}
          {...this.props.modalProps}
        >
          {children}
        </Animated.View>
      </View>
    );
  }

  open() {
    this.setState({ open: true });
    this.setPhase(1);
  }

  close = () => {
    this.setPhase(0);
  };

  animateOffset(offset) {
    Animated.spring(this.state.offset, {
      toValue: offset,
      useNativeDriver: this.state.useNativeDriver,
    }).start();
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  container: {
    justifyContent: "center",
  },
  defaultModalStyle: {
    borderRadius: 2,
    margin: 20,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  defaultOverlayStyle: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});

export default Modal;
