export class Query {
  public constructor(init?: Partial<Query>) {
    Object.assign(this, init);
  }

  public sub: string = "";
  public fwrule: string = "";
  public desc: string = "";
  public penalty: number = 1;

}
