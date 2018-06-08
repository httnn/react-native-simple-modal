import * as React from 'react';
import * as ReactNative from 'react-native';

export interface ModalProps {
  open?: boolean;
  offset?: number;
  overlayStyle?: ReactNative.ViewStyle;
  animationDuration?: number;
  animationTension?: number;
  modalDidOpen?: () => void;
  modalDidClose?: () => void;
  closeOnTouchOutside?: boolean;
  containerStyle?: ReactNative.ViewStyle;
  containerProps?: ReactNative.ViewProperties;
  modalStyle?: ReactNative.ViewStyle;
  modalProps?: ReactNative.ViewProperties;
  disableOnBackPress?: boolean;
}

declare class Modal extends React.Component<ModalProps, {}> {
  close(): void;
  open(): void;
  animateOffset(offset: number): void;
}

export default Modal;
