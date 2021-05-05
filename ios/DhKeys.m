#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DhKeys, NSObject)

RCT_EXTERN_METHOD(getEncodedPublicKeyFromPg:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
@end
