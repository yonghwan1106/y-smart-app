export interface Location {
  name: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export interface Route {
  id: string;
  duration: number; // minutes
  price: number;
  steps: RouteStep[];
  recommended?: boolean;
  congestion?: 'low' | 'medium' | 'high';
}

export interface RouteStep {
  type: 'walk' | 'bus' | 'metro' | 'taxi' | 'tabayong';
  name?: string;
  duration: number;
  distance?: number;
  startTime?: string;
  endTime?: string;
  stations?: number;
  busNumber?: string;
  congestion?: 'low' | 'medium' | 'high';
  wheelchairAccessible?: boolean;
}

export interface Payment {
  method: 'card' | 'point' | 'kakaopay' | 'ypay';
  name: string;
  identifier?: string;
  balance?: number;
}

export interface UserStats {
  monthlySpent: number;
  previousMonthSpent: number;
  greenMileage: number;
  carbonSaved: number;
}
