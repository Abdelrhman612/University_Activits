export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}
export interface Activity {
  name?: string;
  description?: string | null;
  status?: string;
  userId?: string | null;
}
