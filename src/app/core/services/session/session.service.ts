import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { EncryptService } from '../encrypt/encrypt.service';

export const KEYS = {
  user: 'user',
  token: 'token',
};

@Injectable()
export class SessionService {
  private secretKey = environment.SECRET_KEY_SESSION_STORAGE;

  constructor(protected encryptService: EncryptService) {}

  public setData(key: string, data: any): void {
    let item = environment.production
      ? this.encryptService.encrypt(
          data,
          this.secretKey,
          typeof data === 'object'
        )
      : typeof data === 'object'
      ? JSON.stringify(data)
      : data;

    sessionStorage.setItem(key, item);
  }

  public getData(key: string): any {
    const item = sessionStorage.getItem(key);
    return item && environment.production
      ? this.encryptService.decrypt(item, this.secretKey, false)
      : item;
  }

  public getDataObject(key: string): any {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    return environment.production
      ? this.encryptService.decrypt(item, this.secretKey)
      : JSON.parse(item);
  }

  public deleteItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public initStorage() {
    sessionStorage.clear();
  }

  public isLogged(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }

  public getToken(): string {
    return this.getData(KEYS.token);
  }

  public getUserID(): number {
    return parseInt(this.getData(KEYS.user), 10);
  }
}
