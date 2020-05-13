import CryptoJS from 'react-native-crypto-js';

export const encryptKey = (key, data) =>
  CryptoJS.AES.encrypt(key, data).toString();

export const decryptKey = (key, data) =>
  CryptoJS.AES.decrypt(key, data).toString(CryptoJS.enc.Utf8);
