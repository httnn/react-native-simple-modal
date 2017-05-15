import * as React from 'react';
import * as ReactNative from 'react-native';

export interface ModalProps {
  open?: boolean;
  offset?: number;
  overlayBackground?: string;
  animationDuration?: number;
  animationTension?: number;
  modalDidOpen?: () => void;
  modalDidClose?: () => void;
  closeOnTouchOutside?: boolean;
  containerStyle?: ReactNative.ViewStyle;
  modalStyle?: ReactNative.ViewStyle;
  disableOnBackPress?: boolean;
}

declare class Modal extends React.Component<ModalProps, {}> {
  close(): void;
  open(): void;
  animateOffset(offset: number): void;
}

export default Modal;
