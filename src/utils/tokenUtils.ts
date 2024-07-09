// tokenUtils.ts

export const storeToken = (token: string): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('authToken', token);
    }
  };
  
  export const retrieveToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('authToken');
    }
    return null;
  };
  
  export const deleteToken = (): void => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
    }
  };
  