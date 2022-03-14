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

const PGHex = {
  "p": "8f7935d9b9aae9bfabed887acf4951b6f32ec59e3baf3718e8eac4961f3efd3606e74351a9c4183339b809e7c2ae1c539ba7475b85d011adb8b47987754984695cac0e8f14b3360828a22ffa27110a3d62a993453409a0fe696c4658f84bdd20819c3709a01057b195adcd00233dba5484b6291f9d648ef883448677979cec04b434a6ac2e75e9985de23db0292fc1118c9ffa9d8181e7338db792b730d7b9e349592f68099872153915ea3d6b8b4653c633458f803b32a4c2e0f27290256e4e3f8a3b0838a1c450e4e18c1a29a37ddf5ea143de4b66ff04903ed5cf1623e158d487c608e97f211cd81dca23cb6e380765f822e342be484c05763939601cd667",
  "g": "16a65c58204850704e7502a39757040d34da3a3478c154d4e4a5c02d242ee04f96e61e4bd0904abdac8f37eeb1e09f3182d23c9043cb642f88004160edf9ca09b32076a79c32a627f2473e91879ba2c4e744bd2081544cb55b802c368d1fa83ed489e94e0fa0688e32428a5c78c478c68d0527b71c9a3abb0b0be12c44689639e7d3ce74db101a65aa2b87f64c6826db3ec72f4b5599834bb4edb02f7c90e9a496d3a55d535bebfc45d4f619f63f3dedbb873925c2f224e07731296da887ec1e4748f87efb5fdeb75484316b2232dee553ddaf02112b0d1f02da30973224fe27aeda8b9d4b2922d9ba8be39ed9e103a63c52810bc688b7e2ed4316e1ef17dbde"
}
const PG = {
  "p": "18111848663142005571178770624881214696591339256823507023544605891411707081617152319519180201250440615163700426054396403795303435564101919053459832890139496933938670005799610981765220283775567361483662648340339405220348871308593627647076689407931875483406244310337925809427432681864623551598136302441690546585427193224254314088256212718983105131138772434658820375111735710449331518776858786793875865418124429269409118756812841019074631004956409706877081612616347900606555802111224022921017725537417047242635829949739109274666495826205002104010355456981211025738812433088757102520562459649777989718122219159982614304359",
  "g": "2859278237642201956931085611015389087970918161297522023542900348087718063098423976428252369340967506010054236052095950169272612831491902295835660747775572934757474194739347115870723217560530672532404847508798651915566434553729839971841903983916294692452760249019857108409189016993380919900231322610083060784269299257074905043636029708121288037909739559605347853174853410208334242027740275688698461842637641566056165699733710043802697192696426360843173620679214131951400148855611740858610821913573088059404459364892373027492936037789337011875710759208498486908611261954026964574111219599568903257472567764789616958430"
}

const serverPublicKeyAndroid = '308203293082021C06092A864886F70D0103013082020D02820101008F7935D9B9AAE9BFABED887ACF4951B6F32EC59E3BAF3718E8EAC4961F3EFD3606E74351A9C4183339B809E7C2AE1C539BA7475B85D011ADB8B47987754984695CAC0E8F14B3360828A22FFA27110A3D62A993453409A0FE696C4658F84BDD20819C3709A01057B195ADCD00233DBA5484B6291F9D648EF883448677979CEC04B434A6AC2E75E9985DE23DB0292FC1118C9FFA9D8181E7338DB792B730D7B9E349592F68099872153915EA3D6B8B4653C633458F803B32A4C2E0F27290256E4E3F8A3B0838A1C450E4E18C1A29A37DDF5EA143DE4B66FF04903ED5CF1623E158D487C608E97F211CD81DCA23CB6E380765F822E342BE484C05763939601CD6670282010016A65C58204850704E7502A39757040D34DA3A3478C154D4E4A5C02D242EE04F96E61E4BD0904ABDAC8F37EEB1E09F3182D23C9043CB642F88004160EDF9CA09B32076A79C32A627F2473E91879BA2C4E744BD2081544CB55B802C368D1FA83ED489E94E0FA0688E32428A5C78C478C68D0527B71C9A3ABB0B0BE12C44689639E7D3CE74DB101A65AA2B87F64C6826DB3EC72F4B5599834BB4EDB02F7C90E9A496D3A55D535BEBFC45D4F619F63F3DEDBB873925C2F224E07731296DA887EC1E4748F87EFB5FDEB75484316B2232DEE553DDAF02112B0D1F02DA30973224FE27AEDA8B9D4B2922D9BA8BE39ED9E103A63C52810BC688B7E2ED4316E1EF17DBDE020204000382010500028201003C5E58C025A003D2A89AFB760B76CE13EFBB6E784277B1006E59F6069ECD95BE8DA4C04707B4B53CC2A21974FBD1229628D2AA32F2376C9E642B1A1008FA6B691AE56F9EFE0706A55845E08D238101E0B55973303BB0D984BBA94F02EE6E043460CB8BFA63AE91B54A31BD82FE28FFA4D23DE10806BC696802D347BB5A2F7B7A4B3A8B7C760069CAAB668A4D5E88DC6A083E1D1FEBCCAEFA915F7915DF0A15D2AC8496ABC6448344096514935E43C5B7A3DD20140979D38511DB7012DC7B6804FDF776FB897C71D0D9A4ABCE60A81EFCB7957F32F74525073223DC4DF4FFF2E8C6A86C375724C339A3B9CE4143D6D4974530A794B21D537BFE2604E0F92D3AC8';
const serverPublicKeyIOS = "4574465278075164336047183874171023076765331841330455915161000406915548786643646665807433675027101586240976652029257400508880033810091047676411226334964142105183321215864124572842626842872829179479093396795843035450679157872532633767516848970716710947300745807593080558148474336832837618497909254994624371139390541797102423104112945260618683277171871079141629694154675378439370951211683458748324724719607508090159961465037587541637177367682157360084547529039946345047551340763369019373289025926436875291678038458330625750539822520598097518575514294333982890091663719199120940860318337608593575386120026253497280340545";

export default function App() {
  const [payload, setPayload] = React.useState('');
  const [decryptedData, setDecryptedData] = React.useState('');
  const [encryptDataObj, setEncryptedData] = React.useState({});
  const [clientScret, setClientScecretKey] = React.useState('');

  const generateSecretKey = async () => {
    //For Android with Hex value
    // const { clientPrivateKey, clientPublicKey } = await DhKeys.getEncodedPublicKeyFromPg(PGHex.p, PGHex.g );
    //   const sharedKey = await DhKeys.getSharedSecretHex(serverPublicKey, clientPrivateKey);
    //     setClientScecretKey(sharedKey);
    const iOSPlatform = Platform.OS === 'ios';
    const PGFinal =  iOSPlatform ? PGHex : PG;
    const serverPublicKey = iOSPlatform ? serverPublicKeyIOS : serverPublicKeyAndroid;

    const { clientPrivateKey, clientPublicKey } = await DhKeys.getEncodedPublicKeyFromPg(PGHex.p, PGHex.g);
    // const sharedKey = await DhKeys.getSharedSecretHex(serverPublicKey, clientPrivateKey, iOSPlatform ? PGFinal.p : '');
    // setClientScecretKey(sharedKey);
  }
  const encryptMeClick = () => {
    alert(payload);
  }
  const decryptMeClick = () => {
  }
  const resetAll = () => {
    setPayload('');
    setDecryptedData('');
    setEncryptedData({});
    setClientScecretKey('')
  }

  return (
    <SafeAreaView >
      <View style={{ flex: 1, marginTop: 40, alignItems: 'center' }}>
        <TouchableOpacity onPress={generateSecretKey}
          style={{ padding: 10, marginTop: 10, height: 50, backgroundColor: 'black', justifyContent: 'center', }}>
          <Text style={{ color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}> Generate Keys </Text>
        </TouchableOpacity>
        {clientScret ?
          (<>
            <View style={{ flexDirection: 'row', padding: 20, height: 40, alignItems: 'center' }}>
              <Text style={{ height: 35, marginTop: 10, color: 'black', padding: 10, alignSelf: 'center' }}>
                Cient Secret Key:
        </Text>
              <Text style={{ height: 35, width: 250, marginTop: 10, color: 'black', padding: 10, alignSelf: 'center' }}>
                {clientScret}
              </Text>
            </View>
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
                {encryptDataObj?.cipher}
              </Text>
            </> : null
        }
        {
          encryptDataObj?.cipher ?
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
      <View style={{ marginTop: 550 }}>
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