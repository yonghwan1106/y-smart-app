import { env } from '../config/env';

// 카카오맵 초기화 확인
export const initKakaoMap = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window.kakao && window.kakao.maps);
};

// 주소를 좌표로 변환
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  if (!initKakaoMap()) {
    console.error('카카오맵 SDK가 로드되지 않았습니다.');
    return null;
  }

  return new Promise((resolve) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        });
      } else {
        console.error('주소 검색 실패:', address);
        resolve(null);
      }
    });
  });
};

// 좌표를 주소로 변환
export const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  if (!initKakaoMap()) {
    console.error('카카오맵 SDK가 로드되지 않았습니다.');
    return null;
  }

  return new Promise((resolve) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;
        resolve(address);
      } else {
        console.error('좌표 변환 실패:', lat, lng);
        resolve(null);
      }
    });
  });
};

// 키워드로 장소 검색
export const searchPlaces = async (keyword: string): Promise<any[]> => {
  if (!initKakaoMap()) {
    console.error('카카오맵 SDK가 로드되지 않았습니다.');
    return [];
  }

  return new Promise((resolve) => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        console.error('장소 검색 실패:', keyword);
        resolve([]);
      }
    });
  });
};

// 두 지점 간 거리 계산 (미터 단위)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  if (!initKakaoMap()) {
    console.error('카카오맵 SDK가 로드되지 않았습니다.');
    return 0;
  }

  const point1 = new window.kakao.maps.LatLng(lat1, lng1);
  const point2 = new window.kakao.maps.LatLng(lat2, lng2);

  const polyline = new window.kakao.maps.Polyline({
    path: [point1, point2],
  });

  return Math.round(polyline.getLength());
};

// 지도 생성
export const createMap = (container: HTMLElement, options?: {
  center?: { lat: number; lng: number };
  level?: number;
}): any => {
  if (!initKakaoMap()) {
    console.error('카카오맵 SDK가 로드되지 않았습니다.');
    return null;
  }

  const center = options?.center || { lat: 37.2411, lng: 127.1776 }; // 용인시청 기본 좌표
  const level = options?.level || 3;

  const mapOptions = {
    center: new window.kakao.maps.LatLng(center.lat, center.lng),
    level: level,
  };

  return new window.kakao.maps.Map(container, mapOptions);
};

// 마커 생성
export const createMarker = (map: any, position: { lat: number; lng: number }, options?: {
  title?: string;
  image?: string;
}): any => {
  if (!initKakaoMap()) {
    console.error('카카오맵 SDK가 로드되지 않았습니다.');
    return null;
  }

  const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);

  const markerOptions: any = {
    position: markerPosition,
    map: map,
  };

  if (options?.title) {
    markerOptions.title = options.title;
  }

  if (options?.image) {
    const imageSize = new window.kakao.maps.Size(40, 40);
    const markerImage = new window.kakao.maps.MarkerImage(options.image, imageSize);
    markerOptions.image = markerImage;
  }

  return new window.kakao.maps.Marker(markerOptions);
};
