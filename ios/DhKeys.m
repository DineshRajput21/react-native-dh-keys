#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DhKeys, NSObject)

RCT_EXTERN_METHOD(getEncodedPublicKeyFromPg:(NSString)p withB:(NSString)g
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSharedSecretHex:(NSString)serverPublicKey withB:(NSString)clientPrivateKey withC:(NSString)P
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
@end

