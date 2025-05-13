
export interface Warden {
  id: string;
  name: string;
  position: string;
  area: string;
  contact: string;
  created_at?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  is_admin: boolean;
}
