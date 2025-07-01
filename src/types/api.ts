// API configuration adapted from CAR FOR YOU
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// WebSocket types for live auctions
export interface AuctionWebSocketMessage {
  type: 'bid' | 'timer' | 'status' | 'watcher_count';
  auctionId: string;
  data: any;
  timestamp: string;
}
