#import "DhKeys.h"

@implementation DhKeys

RCT_EXPORT_MODULE()

// Example method
// See // https://reactnative.dev/docs/native-modules-ios
RCT_REMAP_METHOD(multiply,
                 multiplyWithA:(nonnull NSNumber*)a withB:(nonnull NSNumber*)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
  NSNumber *result = @([a floatValue] + [b floatValue]);
  resolve(result);
}
RCT_EXPORT_METHOD(getEncodedPublicKeyFromPg:
                 (NSString*)P G:(NSString*)G
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *result = P;
  resolve(P);
}
@end
