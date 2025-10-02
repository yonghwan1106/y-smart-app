// 환경변수 타입 안전성을 위한 설정 파일

export const env = {
  // 카카오맵 API
  kakaoMapApiKey: import.meta.env.VITE_KAKAO_MAP_API_KEY || '',
  kakaoRestApiKey: import.meta.env.VITE_KAKAO_REST_API_KEY || '',

  // 공공데이터 포털 API
  publicDataApiKey: import.meta.env.VITE_PUBLIC_DATA_API_KEY || '',

  // 경기도 버스 정보 시스템
  gbisApiKey: import.meta.env.VITE_GBIS_API_KEY || '',

  // 용인시 버스 API
  yonginBusApiKey: import.meta.env.VITE_YONGIN_BUS_API_KEY || '',
} as const;

// 개발 환경에서 API 키 누락 체크
if (import.meta.env.DEV) {
  const missingKeys: string[] = [];

  if (!env.kakaoMapApiKey) missingKeys.push('VITE_KAKAO_MAP_API_KEY');
  if (!env.publicDataApiKey) missingKeys.push('VITE_PUBLIC_DATA_API_KEY');

  if (missingKeys.length > 0) {
    console.warn('⚠️ 다음 환경변수가 설정되지 않았습니다:');
    console.warn(missingKeys.join(', '));
    console.warn('.env.local 파일을 확인하세요.');
  }
}
