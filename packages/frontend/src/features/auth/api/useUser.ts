import { User } from '@entities/user';
// import { getToken } from '@shared/lib/token';

export const useUser = (): User => {
  // Token > API > User
  // const token = getToken()
  return { id: 1, name: 'Martin Leonard', email: 'martinleonard21@gmail.com', subscription: 'Free' };
};
