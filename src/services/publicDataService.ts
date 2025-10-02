import { env } from '../config/env';

// 경기도 버스 정보 시스템 (GBIS) API 기본 URL
const GBIS_BASE_URL = 'https://apis.gg.go.kr/GGITS';

// 버스 도착 정보 조회 (경기도 GBIS API 사용)
export const getBusArrivalInfo = async (stationId: string): Promise<any[]> => {
  try {
    const url = `${GBIS_BASE_URL}/BusArrivalInfo/Station`;
    const params = new URLSearchParams({
      KEY: env.gbisApiKey,
      TYPE: 'json',
      pSize: '10',
      STATION_ID: stationId,
    });

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error('버스 도착정보 조회 실패');
    }

    const data = await response.json();

    // GBIS API 응답 구조
    if (data.BusArrivalInfo) {
      return Array.isArray(data.BusArrivalInfo)
        ? data.BusArrivalInfo
        : [data.BusArrivalInfo];
    }

    return [];
  } catch (error) {
    console.error('버스 도착정보 에러:', error);
    // 에러 발생 시 Mock 데이터 반환
    return getMockBusArrivalInfo();
  }
};

// 경기도 버스 정보 시스템 (GBIS) - 버스 위치 정보
export const getBusLocationInfo = async (routeId: string): Promise<any[]> => {
  try {
    const url = `${GBIS_BASE_URL}/BusLocationInfo`;
    const params = new URLSearchParams({
      KEY: env.gbisApiKey,
      TYPE: 'json',
      ROUTE_ID: routeId,
    });

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error('버스 위치정보 조회 실패');
    }

    const data = await response.json();

    // GBIS API 응답 구조
    if (data.BusLocationInfo) {
      return Array.isArray(data.BusLocationInfo)
        ? data.BusLocationInfo
        : [data.BusLocationInfo];
    }

    return [];
  } catch (error) {
    console.error('버스 위치정보 에러:', error);
    return getMockBusLocationInfo();
  }
};

// 버스 노선 조회 (경기도 GBIS API)
export const getBusRouteInfo = async (routeName: string): Promise<any[]> => {
  try {
    const url = `${GBIS_BASE_URL}/BusRouteInfo`;
    const params = new URLSearchParams({
      KEY: env.gbisApiKey,
      TYPE: 'json',
      ROUTE_NM: routeName,
    });

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error('버스 노선 조회 실패');
    }

    const data = await response.json();

    // GBIS API 응답 구조
    if (data.BusRouteInfo) {
      return Array.isArray(data.BusRouteInfo)
        ? data.BusRouteInfo
        : [data.BusRouteInfo];
    }

    return [];
  } catch (error) {
    console.error('버스 노선 조회 에러:', error);
    return getMockBusRouteInfo();
  }
};

// Mock 버스 도착 정보
const getMockBusArrivalInfo = (): any[] => {
  return [
    {
      routeno: '5-3',
      arrprevstationcnt: '2',
      arrtime: '5',
      vehicletp: '일반',
      congestion: 'low',
    },
    {
      routeno: '5-3',
      arrprevstationcnt: '5',
      arrtime: '15',
      vehicletp: '일반',
      congestion: 'medium',
    },
    {
      routeno: '66',
      arrprevstationcnt: '1',
      arrtime: '3',
      vehicletp: '저상',
      congestion: 'low',
    },
  ];
};

// Mock 버스 위치 정보
const getMockBusLocationInfo = (): any[] => {
  return [
    {
      stationSeq: 5,
      plateNo: '경기70사1234',
      remainSeatCnt: 10,
      stationId: 'station001',
    },
    {
      stationSeq: 8,
      plateNo: '경기70사5678',
      remainSeatCnt: 3,
      stationId: 'station002',
    },
  ];
};

// Mock 버스 노선 정보
const getMockBusRouteInfo = (): any[] => {
  return [
    {
      routeid: 'route001',
      routeno: '5-3',
      routetp: '간선',
      startpoint: '수지구청',
      endpoint: '용인시청',
    },
    {
      routeid: 'route002',
      routeno: '66',
      routetp: '지선',
      startpoint: '죽전역',
      endpoint: '신갈오거리',
    },
  ];
};

// 실시간 버스 도착 정보를 앱에서 사용하는 형식으로 변환 (GBIS API 응답 기준)
export const formatBusArrivalInfo = (busData: any) => {
  return {
    busNumber: busData.ROUTE_NM || busData.routeNm || busData.routeno,
    arrivalTime: parseInt(busData.PREDICT_TIME || busData.predictTime || busData.arrtime || '0'),
    stationsLeft: parseInt(busData.LOCATION_NO || busData.locationNo || busData.arrprevstationcnt || '0'),
    busType: busData.BUS_TYPE || busData.busType || busData.vehicletp || '일반',
    congestion: determineCongestion(busData.REMAIN_SEAT || busData.remainSeatCnt),
    plateNumber: busData.PLATE_NO || busData.plateNo,
    stationId: busData.STATION_ID || busData.stationId,
    routeId: busData.ROUTE_ID || busData.routeId,
  };
};

// 잔여 좌석 수로 혼잡도 판단
const determineCongestion = (remainSeats?: number): 'low' | 'medium' | 'high' => {
  if (!remainSeats) return 'medium';
  if (remainSeats > 15) return 'low';
  if (remainSeats > 5) return 'medium';
  return 'high';
};
