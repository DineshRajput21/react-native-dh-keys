
# react-native-dh-keys

## Getting started

`$ npm install react-native-dh-keys --save`

### Mostly automatic installation

`$ react-native link react-native-dh-keys`

## Usage
```javascript
import DHKeys from 'react-native-dh-keys';

//Create Client Public and Private keys using P and G values
DHKeys.getEncodedPublicKeyFromPg(P, G, ({ privateKey, publicKey }) => {
	console.log(`Private Key:  ${privateKey}  Public Key: ${publicKey}`)
});

//In order to generate Shared key
const sharedKey = DHKeys.getSharedSecretHex(serverPublicKey, clientPrivateKey);
console.log(`Shared Key:  ${shareKey}`);

```
  