export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserProfile {
  fullName: string;
  initials: string;
}
