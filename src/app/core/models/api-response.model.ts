export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  message: string;
  details?: string[];
  timestamp: string;
}
