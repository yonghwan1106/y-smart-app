import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation as NavigationIcon, ChevronDown, ChevronUp, AlertCircle, X } from 'lucide-react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import { createMap, createMarker, geocodeAddress } from '../services/kakaoMapService';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [map, setMap] = useState<any>(null);

  const { route, departure, destination } = location.state || {
    departure: '수지구청역',
    destination: '용인시청',
    route: null
  };

  const steps = [
    { status: 'completed', label: '출발', icon: '🏁' },
    { status: 'completed', label: '도보', icon: '🚶‍♂️' },
    { status: 'current', label: '경전철 탑승 대기', icon: '🚋' },
    { status: 'pending', label: '버스 환승', icon: '🚌' },
    { status: 'pending', label: '도착', icon: '🎯' },
  ];

  // Initialize Kakao Map
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      // 용인시청 기본 좌표 (37.2411, 127.1776)
      let centerCoord = { lat: 37.2411, lng: 127.1776 };

      // 출발지 좌표 가져오기
      try {
        const departureCoord = await geocodeAddress(departure);
        if (departureCoord) {
          centerCoord = departureCoord;
        }
      } catch (error) {
        console.error('주소 변환 실패:', error);
      }

      // 지도 생성
      const kakaoMap = createMap(mapRef.current, {
        center: centerCoord,
        level: 5,
      });

      setMap(kakaoMap);

      // 마커 추가
      try {
        const departureCoord = await geocodeAddress(departure);
        const destinationCoord = await geocodeAddress(destination);

        if (departureCoord) {
          createMarker(kakaoMap, departureCoord, {
            title: departure,
          });
        }

        if (destinationCoord) {
          createMarker(kakaoMap, destinationCoord, {
            title: destination,
          });

          // 경로가 있으면 폴리라인 그리기
          if (departureCoord && window.kakao && window.kakao.maps) {
            const linePath = [
              new window.kakao.maps.LatLng(departureCoord.lat, departureCoord.lng),
              new window.kakao.maps.LatLng(destinationCoord.lat, destinationCoord.lng),
            ];

            const polyline = new window.kakao.maps.Polyline({
              path: linePath,
              strokeWeight: 5,
              strokeColor: '#14B8A6',
              strokeOpacity: 0.8,
              strokeStyle: 'solid',
            });

            polyline.setMap(kakaoMap);

            // 지도 범위 재설정하여 모든 마커 보이게
            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(new window.kakao.maps.LatLng(departureCoord.lat, departureCoord.lng));
            bounds.extend(new window.kakao.maps.LatLng(destinationCoord.lat, destinationCoord.lng));
            kakaoMap.setBounds(bounds);
          }
        }
      } catch (error) {
        console.error('마커 생성 실패:', error);
      }
    };

    initMap();
  }, [departure, destination]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header title="실시간 안내" showBack />

      {/* Map Area */}
      <div className="relative h-[420px] overflow-hidden">
        {/* Kakao Map Container */}
        <div ref={mapRef} className="w-full h-full"></div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => {
              if (map && window.kakao && window.kakao.maps) {
                // 현재 위치로 이동 (실제로는 geolocation API 사용)
                map.setLevel(3);
              }
            }}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-xl hover:bg-white transition-all active:scale-95"
          >
            <NavigationIcon size={22} className="text-teal-600" />
          </button>
        </div>

        {/* Real-time Location Indicator */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-800">📍 실시간 추적 중</span>
          </div>
        </div>
      </div>

      {/* Next Step Card */}
      <div className="px-4 -mt-20 relative z-10 mb-4">
        <Card padding="none" className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl border-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

          <div className="relative p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">🚶‍♂️</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">200m 직진</h2>
                <p className="text-lg opacity-95">
                  "수지구청역 3번 출구"까지
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-4 mb-2 overflow-hidden backdrop-blur-sm">
              <div
                className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full transition-all duration-300 shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm opacity-90 font-medium">⏱️ 약 2분 남음</p>

            {/* Next Action Preview */}
            <div className="mt-5 pt-5 border-t border-white/20">
              <p className="text-sm opacity-75 mb-2 font-semibold">다음 단계</p>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-2xl">🚋</div>
                <div>
                  <p className="font-semibold">경전철 탑승</p>
                  <p className="text-xs opacity-90">3분 후 도착 예정</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Real-time Alert */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 flex items-start gap-3 shadow-md">
          <div className="bg-yellow-400 p-2 rounded-lg">
            <AlertCircle size={20} className="text-yellow-900" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-yellow-900 mb-1">
              📢 실시간 정보
            </p>
            <p className="text-sm text-yellow-800 font-medium">
              경전철이 정시 운행 중입니다. <strong>2번 칸</strong>이 가장 여유로워요.
            </p>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="px-4 mb-4">
        <Card>
          <button
            onClick={() => setTimelineExpanded(!timelineExpanded)}
            className="w-full flex items-center justify-between"
          >
            <h3 className="font-semibold text-gray-800">여정 타임라인</h3>
            {timelineExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {timelineExpanded && (
            <div className="mt-4 space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-xl
                    ${step.status === 'completed' ? 'bg-green-100' : ''}
                    ${step.status === 'current' ? 'bg-blue-100 ring-4 ring-blue-200' : ''}
                    ${step.status === 'pending' ? 'bg-gray-100' : ''}
                  `}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      step.status === 'current' ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {step.label}
                    </p>
                    {step.status === 'completed' && (
                      <p className="text-xs text-green-600">✓ 완료</p>
                    )}
                    {step.status === 'current' && (
                      <p className="text-xs text-blue-600">● 진행 중</p>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute left-9 w-0.5 h-8 translate-y-8 ${
                      step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-[480px] mx-auto shadow-2xl">
        <div className="flex gap-3 mb-2">
          <button className="flex-1 py-3.5 border-2 border-red-400 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all active:scale-95 shadow-md">
            😞 놓쳤어요
          </button>
          <button
            onClick={() => navigate('/payment')}
            className="flex-1 py-3.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 shadow-md"
          >
            다음 단계 →
          </button>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors flex items-center justify-center gap-1 hover:bg-gray-50 rounded-lg"
        >
          <X size={16} />
          경로 나가기
        </button>
      </div>
    </div>
  );
};

export default Navigation;
