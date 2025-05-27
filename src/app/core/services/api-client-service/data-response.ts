export class DataResponse {
  private _code: number;
  private _message: string;
  private _payload: any = {};

  constructor(code: number, message: string, payload: any) {
    this._code = code;
    this._message = message;
    this._payload = payload;
  }

  public getCode(): number {
    return this._code;
  }

  public getMessage(): string {
    return this._message;
  }

  public getPayload(): any {
    return this._payload;
  }
}
