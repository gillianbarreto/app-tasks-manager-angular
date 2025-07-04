import { Injectable } from '@angular/core';

import { environment } from '@environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  public encryptPassword(password: string): string {
    return CryptoJS.HmacSHA512(
      password,
      environment.SECRET_KEY_PASSWORD,
    ).toString();
  }

  public encrypt(data: string | any, key: string, object = true): string {
    if (!data) return '';
    const baseData = object ? JSON.stringify(data) : data.toString();
    try {
      return CryptoJS.AES.encrypt(baseData, key).toString();
    } catch (error) {
      console.error('Encrypt Error: ', error);
      return '';
    }
  }

  public decrypt(data: string | any, key: string, object = true) {
    if (!data) return '';
    try {
      const decrypt = CryptoJS.AES.decrypt(data, key);
      const decryptToString = decrypt.toString(CryptoJS.enc.Utf8);
      return object ? JSON.parse(decryptToString) : decryptToString;
    } catch (error) {
      console.error('Decrypt Error: ', error);
      return '';
    }
  }
}
