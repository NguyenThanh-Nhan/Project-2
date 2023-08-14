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
export interface IOverview {
  name: string;
  percent1: number;
  percent2: number;
  percent3?: number;
  total: string;
  color: string;
  color2: string;
  color3?: string;
  status1: string;
  status2: string;
  status3?: string;
  number1: string;
  number2: string;
  number3?: string;
  icon: React.ReactNode;
}