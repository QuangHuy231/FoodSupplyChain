import { Object, Property } from "fabric-contract-api";

export class User {
  @Property()
  docType: string;

  @Property()
  UserId: string;

  @Property()
  UserName: string;

  @Property()
  Email: string;

  @Property()
  UserType: string;

  @Property()
  Address: string;

  @Property()
  Password: string;

  @Property()
  RefreshToken: string;

  constructor(
    userId: string,
    userName: string,
    email: string,
    userType: string,
    address: string,
    password: string
  ) {
    this.docType = "User";
    this.UserId = userId;
    this.UserName = userName;
    this.Email = email;
    this.UserType = userType;
    this.Address = address;
    this.Password = password;
    this.RefreshToken = "refreshToken";
  }
}
