import CryptoJS from 'react-native-crypto-js';

export const encryptKey = (key, data) => {
  // return CryptoJS.AES.encrypt(key, data).toString();
  return key;
};

export const decryptKey = (key, data) => {
  // return CryptoJS.AES.decrypt(key, data).toString(CryptoJS.enc.Utf8);
  return key;
};
