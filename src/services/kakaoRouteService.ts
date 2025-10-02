import { env } from '../config/env';
import { Route, RouteStep } from '../types';

// 카카오 경로 검색 API (REST API)
export const searchRoute = async (
  origin: { lat: number; lng: number; name: string },
  destination: { lat: number; lng: number; name: string }
): Promise<Route[]> => {
  try {
    const response = await fetch(
      `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.lng},${origin.lat}&destination=${destination.lng},${destination.lat}&priority=RECOMMEND`,
      {
        headers: {
          Authorization: `KakaoAK ${env.kakaoRestApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('경로 검색 실패');
    }

    const data = await response.json();

    // 카카오 API 응답을 우리 Route 형식으로 변환
    return convertKakaoRouteToAppRoute(data, origin, destination);
  } catch (error) {
    console.error('경로 검색 에러:', error);
    // 에러 발생 시 Mock 데이터 반환
    return getMockRoutes(origin, destination);
  }
};

// 카카오 API 응답을 앱 Route 형식으로 변환
const convertKakaoRouteToAppRoute = (
  kakaoData: any,
  origin: { name: string },
  destination: { name: string }
): Route[] => {
  const routes: Route[] = [];

  if (kakaoData.routes && kakaoData.routes.length > 0) {
    kakaoData.routes.forEach((route: any, index: number) => {
      const duration = Math.round(route.summary.duration / 60); // 초 -> 분
      const distance = route.summary.distance; // 미터
      const fare = route.summary.fare?.taxi || 0;

      const steps: RouteStep[] = [];

      // 도보 구간 추가
      steps.push({
        type: 'walk',
        duration: 3,
        distance: 200,
        name: `${origin.name}에서 출발`,
      });

      // 주요 구간을 교통수단으로 변환 (실제로는 더 복잡한 로직 필요)
      if (distance > 5000) {
        // 5km 이상이면 대중교통 조합
        steps.push({
          type: 'bus',
          duration: Math.round(duration * 0.6),
          busNumber: '5-3',
          stations: Math.round(distance / 1000),
          congestion: 'low',
        });
        steps.push({
          type: 'metro',
          duration: Math.round(duration * 0.3),
          stations: 4,
          congestion: 'low',
        });
      } else {
        // 짧은 거리는 버스
        steps.push({
          type: 'bus',
          duration: Math.round(duration * 0.8),
          busNumber: '5-3',
          stations: Math.round(distance / 500),
        });
      }

      // 도착 도보
      steps.push({
        type: 'walk',
        duration: 2,
        distance: 150,
        name: `${destination.name}까지`,
      });

      routes.push({
        id: `route-${index}`,
        duration: duration,
        price: fare > 0 ? Math.min(fare, 15000) : 2400,
        recommended: index === 0,
        congestion: 'low',
        steps: steps,
      });
    });
  }

  return routes.length > 0 ? routes : getMockRoutes(origin, destination);
};

// Mock 데이터 (API 실패 시 또는 개발용)
const getMockRoutes = (
  origin: { name: string },
  destination: { name: string }
): Route[] => {
  return [
    {
      id: '1',
      duration: 35,
      price: 2400,
      recommended: true,
      congestion: 'low',
      steps: [
        { type: 'walk', duration: 5, name: `${origin.name}에서 출발` },
        {
          type: 'metro',
          duration: 12,
          stations: 4,
          startTime: '14:20',
          endTime: '14:32',
          congestion: 'low',
        },
        {
          type: 'bus',
          duration: 15,
          stations: 3,
          busNumber: '5-3',
          congestion: 'low',
        },
        { type: 'walk', duration: 3, name: `${destination.name}까지` },
      ],
    },
    {
      id: '2',
      duration: 42,
      price: 1950,
      steps: [
        { type: 'walk', duration: 7, name: `${origin.name}에서 출발` },
        {
          type: 'tabayong',
          duration: 32,
          name: '타바용 이용',
          startTime: '14:25',
          endTime: '14:57',
        },
        { type: 'walk', duration: 3, name: `${destination.name}까지` },
      ],
    },
    {
      id: '3',
      duration: 28,
      price: 15000,
      congestion: 'medium',
      steps: [
        {
          type: 'taxi',
          duration: 28,
          name: '택시',
          startTime: '14:20',
          endTime: '14:48',
        },
      ],
    },
  ];
};
