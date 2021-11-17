export class StudentQuery {
  public constructor(init?: Partial<StudentQuery>) {
    Object.assign(this, init);
  }

  public username: string = "";
  public place: string = "";
  public isFailed: boolean = false;
  public isComplete: boolean = false;

}
