export class User {
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private _tokenExiprationDate: Date
  ) {}

  get token() {
    if (!this._tokenExiprationDate || new Date() > this._tokenExiprationDate) {
      return null;
    }
    return this._token;
  }
}
