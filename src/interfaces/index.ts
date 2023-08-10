export interface IUser {
  key?: string;
  _id: string;
  photoURL?: string;
  userName: string;
  password: string;
  displayName: string;
  email: string;
  phone: string;
  role: string;
  status?: string;
}
export interface IUpdateProps {
  id: string;
  payload: any;
}