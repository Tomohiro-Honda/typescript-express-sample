export class authUser {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public email: string,
    public password: string,
    public department: string,
    public hire_date: string,
    public retirement_flag: number,
  ) {}
}
