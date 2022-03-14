import Foundation
import BigInt

@objc(DhKeys)
class DhKeys: NSObject {
    @objc(getEncodedPublicKeyFromPg:withB:withResolver:withRejecter:)    
    func getEncodedPublicKeyFromPg(P: String, G: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let dhKeys = createDHKeysFromPG(generator: G, primeNumber: P);
        let dhKeysObj: [String: Any] = [
        "clientPrivateKey" : dhKeys.privateKey,         
        "clientPublicKey" : dhKeys.publicKey,             
    ]
        resolve(dhKeysObj);
    }
    @objc(getSharedSecretHex:withB:withC:withResolver:withRejecter:)
    func getSharedSecretHex(serverPublicKey: String, clientPrivateKey: String, P: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        let sharedKey = String(getDHPublicKey(base: serverPublicKey, power: clientPrivateKey, modulus: P))
        resolve(sharedKey);
    }
    func createDHKeysFromPG(generator: String, primeNumber : String) -> DHKeys {
        let privateKey = getDHPrivateKey()
        let publicKey = String(getDHPublicKey(base: generator, power: privateKey, modulus: primeNumber))
        let dhKeys = DHKeys(privateKey: privateKey, publicKey: publicKey)
        return dhKeys;
    }
    private  func getDHPrivateKey() -> String {
        var privateKey = ""
        for _ in 1...30 {
            privateKey += String(Int(arc4random_uniform(UInt32(42949672)) + UInt32(10)))
        }
        return privateKey
    }
    private  func getDHPublicKey(base: String, power: String, modulus : String) -> BigInt{
        let G = BigInt(base)
        let privateKey = BigInt(power)
        let P = BigInt(modulus )
        let key = G!.power(privateKey!, modulus: P!)
        return key
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
