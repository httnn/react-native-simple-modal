# react-native-simple-modal
A simple JavaScript modal component for React Native.

## Installation
`npm install react-native-simple-modal --save`

## Usage

### Properties and their default values

```javascript

<Modal
	ref="modal"
	overlayOpacity={0.75}
	animationDuration={200}
	animationTension={40}
	modalDidOpen={() => undefined}
	modalDidClose={() => undefined}>
   ...
</Modal>
```

### Methods

```javascript
// opens the modal
this.refs.modal.open();

// closes the modal
this.refs.modal.close();

// can be used to animate a translation of the modal along the Y-axis
// useful for example when the modal has an text input and the modal needs to move up so that it's not hidden behind the keyboard
this.refs.modal.animateOffset(number);
```