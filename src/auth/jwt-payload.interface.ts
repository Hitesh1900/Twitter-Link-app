export interface JwtPayload {
    username: string;
    sub: number; // Ensure this matches the type of user ID in your system
  }