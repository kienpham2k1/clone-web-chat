// tokenUtils.ts

import { UserResponse } from "@/models/response/UserResponse";

export const storeUser = (user: UserResponse): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};

export const retrieveUser = (): UserResponse | null => {
  if (typeof window !== 'undefined') {
    const user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as UserResponse;
    }
  }
  return null;
};

export const deleteUser = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('user');
  }
};
