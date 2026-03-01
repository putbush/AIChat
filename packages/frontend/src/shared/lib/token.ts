let _token: string | null = null;

export const setToken = (token: string | null) => { _token = token; };
export const getToken = () => _token;