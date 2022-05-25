import * as React from 'react';

import DhKeys from 'react-native-dh-keys';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import axios from 'axios';
import Aes from 'react-native-aes-crypto';
import { hexaToDecimal, decimalToHexa } from './Utils';
import { Buffer } from "buffer"

const PG_ANDROID = {
  "p": "8f7935d9b9aae9bfabed887acf4951b6f32ec59e3baf3718e8eac4961f3efd3606e74351a9c4183339b809e7c2ae1c539ba7475b85d011adb8b47987754984695cac0e8f14b3360828a22ffa27110a3d62a993453409a0fe696c4658f84bdd20819c3709a01057b195adcd00233dba5484b6291f9d648ef883448677979cec04b434a6ac2e75e9985de23db0292fc1118c9ffa9d8181e7338db792b730d7b9e349592f68099872153915ea3d6b8b4653c633458f803b32a4c2e0f27290256e4e3f8a3b0838a1c450e4e18c1a29a37ddf5ea143de4b66ff04903ed5cf1623e158d487c608e97f211cd81dca23cb6e380765f822e342be484c05763939601cd667",
  "g": "16a65c58204850704e7502a39757040d34da3a3478c154d4e4a5c02d242ee04f96e61e4bd0904abdac8f37eeb1e09f3182d23c9043cb642f88004160edf9ca09b32076a79c32a627f2473e91879ba2c4e744bd2081544cb55b802c368d1fa83ed489e94e0fa0688e32428a5c78c478c68d0527b71c9a3abb0b0be12c44689639e7d3ce74db101a65aa2b87f64c6826db3ec72f4b5599834bb4edb02f7c90e9a496d3a55d535bebfc45d4f619f63f3dedbb873925c2f224e07731296da887ec1e4748f87efb5fdeb75484316b2232dee553ddaf02112b0d1f02da30973224fe27aeda8b9d4b2922d9ba8be39ed9e103a63c52810bc688b7e2ed4316e1ef17dbde"
}
const PG_IOS = {
  "p": "18111848663142005571178770624881214696591339256823507023544605891411707081617152319519180201250440615163700426054396403795303435564101919053459832890139496933938670005799610981765220283775567361483662648340339405220348871308593627647076689407931875483406244310337925809427432681864623551598136302441690546585427193224254314088256212718983105131138772434658820375111735710449331518776858786793875865418124429269409118756812841019074631004956409706877081612616347900606555802111224022921017725537417047242635829949739109274666495826205002104010355456981211025738812433088757102520562459649777989718122219159982614304359",
  "g": "2859278237642201956931085611015389087970918161297522023542900348087718063098423976428252369340967506010054236052095950169272612831491902295835660747775572934757474194739347115870723217560530672532404847508798651915566434553729839971841903983916294692452760249019857108409189016993380919900231322610083060784269299257074905043636029708121288037909739559605347853174853410208334242027740275688698461842637641566056165699733710043802697192696426360843173620679214131951400148855611740858610821913573088059404459364892373027492936037789337011875710759208498486908611261954026964574111219599568903257472567764789616958430"
}
const IV = '00000000000000000000000000000000';
const KEY_EXCHANGE_URL = 'https://phoenix.integrate.singlife.com/v11/sso-service/dh/keyExchange';
const X_API_KEY = '5c80c3498f4d613eccb5952c0b607d78eb414f109fbfd44cdd179096';
const DECRYPT_TEST_URL = 'https://phoenix.integrate.singlife.com/v11/sso-service/dh/testDecrypt';


export default function App() {
  const [payload, setPayload] = React.useState('');
  const [decryptedData, setDecryptedData] = React.useState('');
  const [encryptDataObj, setEncryptedData] = React.useState('');
  const [clientScret, setClientScecretKey] = React.useState('');
  const [clientKeys, setClientKeys] = React.useState({});
  const [serverPubKey, setServerPubKeys] = React.useState('');

  const iOSPlatform = Platform.OS === 'ios';
  const PG = iOSPlatform ? PG_IOS : PG_ANDROID;

  const generateClientKeys = async () => {
    const { clientPrivateKey, clientPublicKey } = await DhKeys.getEncodedPublicKeyFromPg(PG.p, PG.g);
    setClientKeys({ clientPrivateKey, clientPublicKey });
  }

  const keyExchangeWithServer = async () => {
    if (!clientKeys.clientPublicKey) return;
    try {
      var data = iOSPlatform ? decimalToHexa(clientKeys.clientPublicKey) + '' : clientKeys.clientPublicKey;
      var config = {
        method: 'post',
        url: iOSPlatform ? KEY_EXCHANGE_URL+'V2': KEY_EXCHANGE_URL,
        headers: {
          'x-api-key': X_API_KEY,
          'p': '8f7935d9b9aae9bfabed887acf4951b6f32ec59e3baf3718e8eac4961f3efd3606e74351a9c4183339b809e7c2ae1c539ba7475b85d011adb8b47987754984695cac0e8f14b3360828a22ffa27110a3d62a993453409a0fe696c4658f84bdd20819c3709a01057b195adcd00233dba5484b6291f9d648ef883448677979cec04b434a6ac2e75e9985de23db0292fc1118c9ffa9d8181e7338db792b730d7b9e349592f68099872153915ea3d6b8b4653c633458f803b32a4c2e0f27290256e4e3f8a3b0838a1c450e4e18c1a29a37ddf5ea143de4b66ff04903ed5cf1623e158d487c608e97f211cd81dca23cb6e380765f822e342be484c05763939601cd667',
          'g': '16a65c58204850704e7502a39757040d34da3a3478c154d4e4a5c02d242ee04f96e61e4bd0904abdac8f37eeb1e09f3182d23c9043cb642f88004160edf9ca09b32076a79c32a627f2473e91879ba2c4e744bd2081544cb55b802c368d1fa83ed489e94e0fa0688e32428a5c78c478c68d0527b71c9a3abb0b0be12c44689639e7d3ce74db101a65aa2b87f64c6826db3ec72f4b5599834bb4edb02f7c90e9a496d3a55d535bebfc45d4f619f63f3dedbb873925c2f224e07731296da887ec1e4748f87efb5fdeb75484316b2232dee553ddaf02112b0d1f02da30973224fe27aeda8b9d4b2922d9ba8be39ed9e103a63c52810bc688b7e2ed4316e1ef17dbde',
          'Content-Type': 'text/plain',
        },
        data: data,
      };

      axios(config).then((response) => {
        setServerPubKeys(response.data);
      }).catch((error) => {
        console.log(error);
      })
    } catch (e) {
      alert(e);
    }
  }

  const generateSecretKey = async () => {
    let sharedKey = null;
    console.log("actual server key "+ serverPubKey);
    if (iOSPlatform)
      sharedKey = await DhKeys.getSharedSecretHex(iOSPlatform ? hexaToDecimal(serverPubKey) : ServerKeyDummy, clientKeys.clientPrivateKey, PG.p );
    else
      sharedKey = await DhKeys.getSharedSecretHex( serverPubKey, clientKeys.clientPrivateKey);

      const trimKey = iOSPlatform ? decimalToHexa(sharedKey).substring(0, 64) : sharedKey.substring(0,64);
    setClientScecretKey(trimKey);
    // console.log("client pub key  " + decimalToHexa(clientKeys.clientPublicKey));
  }

  const encryptMeClick = async () => {
    const encryptrdData = await encryptData(payload, clientScret);
    const buffer = Buffer.from(encryptrdData, 'base64');
    const encryptrdDataHex = buffer.toString('hex');
    setEncryptedData(encryptrdDataHex);
    console.log("Secret key " + clientScret);
    console.log("encrypted Data " + encryptrdDataHex)

  }
  const decryptMeClick = () => {
    if (!encryptDataObj) return;
    try {
      var pubKey = iOSPlatform ? decimalToHexa(clientKeys.clientPublicKey) + '' : clientKeys.clientPublicKey;
      var config = {
        method: 'post',
        url: iOSPlatform ? DECRYPT_TEST_URL+'V2' : DECRYPT_TEST_URL,
        headers: {
          'x-api-key': X_API_KEY,
          'pub': pubKey,
          'p': '8f7935d9b9aae9bfabed887acf4951b6f32ec59e3baf3718e8eac4961f3efd3606e74351a9c4183339b809e7c2ae1c539ba7475b85d011adb8b47987754984695cac0e8f14b3360828a22ffa27110a3d62a993453409a0fe696c4658f84bdd20819c3709a01057b195adcd00233dba5484b6291f9d648ef883448677979cec04b434a6ac2e75e9985de23db0292fc1118c9ffa9d8181e7338db792b730d7b9e349592f68099872153915ea3d6b8b4653c633458f803b32a4c2e0f27290256e4e3f8a3b0838a1c450e4e18c1a29a37ddf5ea143de4b66ff04903ed5cf1623e158d487c608e97f211cd81dca23cb6e380765f822e342be484c05763939601cd667',
          'g': '16a65c58204850704e7502a39757040d34da3a3478c154d4e4a5c02d242ee04f96e61e4bd0904abdac8f37eeb1e09f3182d23c9043cb642f88004160edf9ca09b32076a79c32a627f2473e91879ba2c4e744bd2081544cb55b802c368d1fa83ed489e94e0fa0688e32428a5c78c478c68d0527b71c9a3abb0b0be12c44689639e7d3ce74db101a65aa2b87f64c6826db3ec72f4b5599834bb4edb02f7c90e9a496d3a55d535bebfc45d4f619f63f3dedbb873925c2f224e07731296da887ec1e4748f87efb5fdeb75484316b2232dee553ddaf02112b0d1f02da30973224fe27aeda8b9d4b2922d9ba8be39ed9e103a63c52810bc688b7e2ed4316e1ef17dbde',
          'Content-Type': 'text/plain',
        },
        data: encryptDataObj,
      };
      axios(config).then((response) => {
        setDecryptedData(response.data);
      }).catch((error) => {
        console.log(error);
      })
    } catch (e) {
      alert(e);
    }
  }
  const resetAll = () => {
    setPayload('');
    setDecryptedData('');
    setEncryptedData('');
    setClientScecretKey('');
    setClientKeys({});
    setServerPubKeys('');
  }
  const encryptData = async (text, key) => {
    const response = await Aes.encrypt(text, key, IV, 'aes-256-cbc');
    return response;
  }
  return (
    <SafeAreaView >
      <View style={{ flex: 1, marginVertical: 10, alignItems: 'center' }}>
        <Text style={{ color: 'black', height: 30, paddingVertical: 10, fontWeight: '600' }}> ================ DH Key Exchange =============== </Text>
        <TouchableOpacity onPress={generateClientKeys}
          style={{ padding: 10, marginTop: 10, height: 50, backgroundColor: 'black', justifyContent: 'center', }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}> Generate Client Keys </Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', padding: 20, height: 70 }}>Client Pub Keys: {clientKeys?.clientPublicKey}</Text>
        <TouchableOpacity onPress={keyExchangeWithServer}
          style={{ padding: 10, marginTop: 10, height: 50, backgroundColor: 'black', justifyContent: 'center', }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}> Exchange Keys </Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', padding: 20, height: 70 }}>Server Pub Keys: {serverPubKey}</Text>
        <TouchableOpacity onPress={generateSecretKey}
          style={{ padding: 10, marginTop: 10, height: 50, backgroundColor: 'black', justifyContent: 'center', }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}> Generate Keys </Text>
        </TouchableOpacity>
        {clientScret ?
          (<>
            <View style={{ flexDirection: 'row', padding: 20, height: 40, alignItems: 'center' }}>
              <Text style={{ height: 35, marginTop: 10, color: 'black', padding: 10, alignSelf: 'center' }}>
                SecretKey:
              </Text>
              <Text style={{ height: 35, width: 250, marginTop: 10, color: 'black', padding: 10, alignSelf: 'center' }}>
                {clientScret}
              </Text>
            </View>
            <Text style={{ color: 'black', height: 25, paddingVertical: 10, fontWeight: '600' }}> ============== AES Ecryption/Decryption ================ </Text>
            <TextInput
              value={payload}
              placeholder={"Please enter payload text here"}
              style={{ marginTop: 20, width: 300, height: 50, borderColor: 'black', borderWidth: 1, padding: 10, fontSize: 18 }}
              onChangeText={(text) => setPayload(text)}
            />
          </>) : null
        }
        {
          payload ?
            <>
              <TouchableOpacity onPress={encryptMeClick}
                style={{ padding: 10, marginTop: 20, height: 50, backgroundColor: 'black', justifyContent: 'center' }}>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}> Encrypt Payload </Text>
              </TouchableOpacity>
              <Text style={{ height: 50, marginTop: 10, color: 'black', padding: 10, alignSelf: 'center', fontSize: 16, fontWeight: 'bold' }}>
                {encryptDataObj}
              </Text>
            </> : null
        }
        {
          encryptDataObj ?
            <>
              <TouchableOpacity onPress={decryptMeClick} style={{ padding: 10, marginTop: 10, height: 50, backgroundColor: 'black', justifyContent: 'center' }}>
                <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}> Decrypt Payload </Text>
              </TouchableOpacity>
              <Text style={{ height: 50, marginTop: 10, color: 'black', padding: 10, alignSelf: 'center', fontSize: 18, fontWeight: '500' }}>
                {decryptedData}
              </Text>
            </> : null
        }

      </View>
      <View style={{ marginTop: 650 }}>
        <TouchableOpacity onPress={resetAll} style={{ padding: 10, marginTop: 100, height: 50, width: 400, backgroundColor: 'black', justifyContent: 'center' }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: '700' }}> Reset All! </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
