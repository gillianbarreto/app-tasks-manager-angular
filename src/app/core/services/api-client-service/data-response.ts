export class DataResponse {
  private code: number ;
  private message: string;
  private payload: any = {};

  constructor(code: number, message: string, payload: any) {
    this.code = code;
    this.message = message;
    this.payload = payload;
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public getPayload(): any {
    return this.payload;
  }
}
