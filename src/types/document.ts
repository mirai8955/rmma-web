export interface DocumentItem {
    filepath: string;
    filename: string;
    title: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    result: T;
  } 