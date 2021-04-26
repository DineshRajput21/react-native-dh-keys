package com.reactlibrary;

import java.util.Base64;
import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.KeyAgreement;
import javax.crypto.spec.DHParameterSpec;
import java.security.spec.PKCS8EncodedKeySpec;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class RNDhKeysModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  private static final String AES_ALGO = "AES";
  private static final int AES_256_SIZE = 32;
  private static final String AES_ALGO_CIPHER = "AES/CBC/PKCS5Padding";
  private static final byte[] AES_DEFAULT_IV = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
  private static final String DH_ALGO = "DH";
  private final static char[] hexArray = "0123456789ABCDEF".toCharArray();

  public RNDhKeysModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNDhKeys";
  }
  
  @ReactMethod(isBlockingSynchronousMethod = true)
  public void getEncodedPublicKeyFromPg(String P, String G, Callback callback) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
    final DHParameterSpec paramFromPubKey = new DHParameterSpec(
            new BigInteger(P, 16),
            new BigInteger(G, 16)
    );
    final KeyPairGenerator kpairGen = KeyPairGenerator.getInstance(DH_ALGO);
    kpairGen.initialize(paramFromPubKey);
    final KeyPair kpair = kpairGen.generateKeyPair();
    String encodedPublicKey = bytesToHex(kpair.getPublic().getEncoded());
    String encodedPrivateKey = bytesToHex(kpair.getPrivate().getEncoded());
    WritableMap keysObject = Arguments.createMap();
    keysObject.putString("clientPrivateKey", encodedPrivateKey);
    keysObject.putString("clientPublicKey", encodedPublicKey);
    callback.invoke(keysObject);
  }
  @ReactMethod(isBlockingSynchronousMethod = true)
  public String getSharedSecretHex(
           final String serverHexPubKey, final String clientPrivateHexKey
   ) throws NoSuchAlgorithmException, InvalidKeyException, InvalidKeySpecException {
    final KeyFactory keyFac = KeyFactory.getInstance(DH_ALGO);
    
    final byte[] clientPrivateKeyBytes = hexStringToByteArray(clientPrivateHexKey);
    final PKCS8EncodedKeySpec keySpecPKCS8 = new PKCS8EncodedKeySpec(clientPrivateKeyBytes);
    final PrivateKey clientPrivateKey = keyFac.generatePrivate(keySpecPKCS8);

    final byte[] serverPubKeyBytes = hexStringToByteArray(serverHexPubKey);
    final X509EncodedKeySpec x509KeySpecPub = new X509EncodedKeySpec(serverPubKeyBytes);
    final PublicKey serverPubKey = keyFac.generatePublic(x509KeySpecPub);

    final KeyAgreement keyAgree = KeyAgreement.getInstance(DH_ALGO);
    keyAgree.init(clientPrivateKey);
    keyAgree.doPhase(serverPubKey, true);
    return bytesToHex(keyAgree.generateSecret());
   }

  public static String bytesToHex(byte[] bytes) {
    char[] hexChars = new char[bytes.length * 2];
    for (int j = 0; j < bytes.length; j++) {
      int v = bytes[j] & 0xFF;
      hexChars[j * 2] = hexArray[v >>> 4];
      hexChars[j * 2 + 1] = hexArray[v & 0x0F];
    }
    return new String(hexChars);
  }
  public static byte[] hexStringToByteArray(String s) {
    int len = s.length();
    byte[] data = new byte[len/2];
    for(int i = 0; i < len; i+=2){
        data[i/2] = (byte) ((Character.digit(s.charAt(i), 16) << 4) + Character.digit(s.charAt(i+1), 16));
    }
    return data;
 }
}