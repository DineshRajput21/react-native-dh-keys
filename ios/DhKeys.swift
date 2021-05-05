import Foundation
import BigNumber

@objc(DhKeys)
class DhKeys: NSObject {
    let P = "18111848663142005571178770624881214696591339256823507023544605891411707081617152319519180201250440615163700426054396403795303435564101919053459832890139496933938670005799610981765220283775567361483662648340339405220348871308593627647076689407931875483406244310337925809427432681864623551598136302441690546585427193224254314088256212718983105131138772434658820375111735710449331518776858786793875865418124429269409118756812841019074631004956409706877081612616347900606555802111224022921017725537417047242635829949739109274666495826205002104010355456981211025738812433088757102520562459649777989718122219159982614304359";
        let G = "2859278237642201956931085611015389087970918161297522023542900348087718063098423976428252369340967506010054236052095950169272612831491902295835660747775572934757474194739347115870723217560530672532404847508798651915566434553729839971841903983916294692452760249019857108409189016993380919900231322610083060784269299257074905043636029708121288037909739559605347853174853410208334242027740275688698461842637641566056165699733710043802697192696426360843173620679214131951400148855611740858610821913573088059404459364892373027492936037789337011875710759208498486908611261954026964574111219599568903257472567764789616958430";
    @objc(getEncodedPublicKeyFromPg:withB:withResolver:withRejecter:)
    func getEncodedPublicKeyFromPg(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let dhKeys = createDHKeysFromPG(generator: G, primeNumber: P);
        resolve(dhKeys.privateKey);
    }
     func createDHKeysFromPG(generator: String, primeNumber : String) -> DHKeys {
        // let privateKey = getDHPrivateKey()
        // let publicKey = String(getDHPublicKey(base: generator, power: privateKey, modulus: primeNumber))
        // let dhKeys = DHKeys(privateKey: privateKey, publicKey: publicKey)
        let dhKeys = DHKeys(privateKey: "hello", publicKey: "hello")
        return dhKeys
    }
    private static func getDHPrivateKey() -> String {
        var privateKey = ""
        for _ in 1...30 {
            privateKey += String(Int(arc4random_uniform(UInt32(42949672)) + UInt32(10)))
        }
        return privateKey
    }
    // private static func getDHPublicKey(base: String, power: String, modulus : String) -> BigInt{
    //     let G = BigInt(base)
    //     let privateKey = BigInt(power)
    //     let P = BigInt(modulus )
    //     let key = G!.power(privateKey!, modulus: P!)
    //     return key
    // }
    static func genrateSharedKey(privateKey: String, serverPublicKey: String, primeNumber : String) -> String {
        // let sharedKey = String(getDHPublicKey(base: serverPublicKey, power: privateKey, modulus: primeNumber))
        // return sharedKey

        return serverPublicKey;
    }
}
struct DHKeys {
    var privateKey: String?
    var publicKey: String?
    init(privateKey: String, publicKey: String) {
        self.privateKey = privateKey
        self.publicKey = publicKey
    }
}
