type user = {
  id: number;
  name: string;
  age: number;
  email: string;
};

export class User implements user {
  constructor(public id: number, public name: string, public age: number, public email: string) {}
}
