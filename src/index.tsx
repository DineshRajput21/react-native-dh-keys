import { NativeModules } from 'react-native';

// type DhKeysType = {
//   getEncodedPublicKeyFromPg(a: number, b: number): Promise<number>;
// };

const { DhKeys } = NativeModules;

export default DhKeys;
