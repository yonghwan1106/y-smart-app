import React, { useState, useEffect } from 'react';
import { MapPin, Home as HomeIcon, Briefcase, Star, Bus, Train, Smartphone, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { searchPlaces } from '../services/kakaoMapService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState('현재 위치');
  const [destination, setDestination] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 목적지 자동완성
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (destination.length >= 2) {
        const results = await searchPlaces(destination);
        setDestinationSuggestions(results.slice(0, 5)); // 상위 5개만
        setShowSuggestions(true);
      } else {
        setDestinationSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms 디바운싱

    return () => clearTimeout(searchTimeout);
  }, [destination]);

  const handleSearch = () => {
    if (destination) {
      navigate('/routes', {
        state: {
          departure,
          destination,
        }
      });
    }
  };

  const handleSelectSuggestion = (place: any) => {
    setDestination(place.place_name);
    setShowSuggestions(false);
  };

  const quickAccess = [
    { icon: <Bus size={24} />, label: '실시간버스', color: 'bg-blue-500' },
    { icon: <Train size={24} />, label: '경전철', color: 'bg-purple-500' },
    { icon: <Smartphone size={24} />, label: '타바용', color: 'bg-green-500' },
  ];

  const favorites = [
    { icon: <HomeIcon size={20} />, label: '집', address: '수지구 죽전동' },
    { icon: <Briefcase size={20} />, label: '직장', address: '기흥구 구갈동' },
    { icon: <Star size={20} />, label: '즐겨찾기', address: '' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header showBack={false} />

      {/* Hero Section with Search */}
      <div className="relative pt-6 pb-12 px-4 bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Logo & Title */}
        <div className="relative z-10 text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Y-SMART</h1>
          <p className="text-teal-100 text-sm">용인 스마트 모빌리티</p>
        </div>

        {/* Search Box */}
        <div className="relative z-10 space-y-3 max-w-md mx-auto">
          <div className="relative">
            <Input
              value={departure}
              onChange={setDeparture}
              icon={<MapPin size={20} className="text-teal-500" />}
              className="bg-white shadow-xl border-0 ring-2 ring-white/20 focus:ring-white/40"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-teal-50 rounded-full transition-all active:scale-95">
              <ArrowUpDown size={20} className="text-teal-600" />
            </button>
          </div>

          <div className="relative">
            <Input
              value={destination}
              onChange={setDestination}
              placeholder="어디로 가시나요?"
              icon={<MapPin size={20} className="text-teal-500" />}
              className="bg-white shadow-xl border-0 ring-2 ring-white/20 focus:ring-white/40"
            />

            {/* 자동완성 결과 */}
            {showSuggestions && destinationSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-60 overflow-y-auto z-50">
                {destinationSuggestions.map((place, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSuggestion(place)}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-semibold text-gray-900">{place.place_name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{place.address_name}</div>
                    {place.category_name && (
                      <div className="text-xs text-teal-600 mt-1">{place.category_name}</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Search Button */}
          <button
            onClick={handleSearch}
            disabled={!destination}
            className={`
              w-full py-3.5 rounded-xl font-bold text-base shadow-lg
              transition-all duration-200 active:scale-95
              ${destination
                ? 'bg-white text-teal-600 hover:shadow-xl'
                : 'bg-white/50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {destination ? '경로 검색 🚀' : '목적지를 입력하세요'}
          </button>
        </div>
      </div>

      {/* Favorites */}
      <div className="px-4 -mt-8 mb-6">
        <Card className="shadow-xl border border-gray-100">
          <div className="flex justify-around items-center py-2">
            {favorites.map((fav, index) => (
              <button
                key={index}
                onClick={() => fav.address && navigate('/routes')}
                className="flex flex-col items-center gap-2 px-3 py-2 hover:bg-gradient-to-b hover:from-teal-50 hover:to-blue-50 rounded-xl transition-all active:scale-95"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-200">
                  {fav.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800">{fav.label}</span>
                {fav.address && (
                  <span className="text-xs text-gray-500">{fav.address}</span>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="px-4 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          ⚡ 빠른 액세스
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {quickAccess.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate('/routes')}
              className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl border border-gray-100 flex flex-col items-center gap-3 transition-all active:scale-95"
            >
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="px-4 mb-24">
        <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          🤖 AI 추천
        </h2>
        <Card className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl border-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Star size={28} fill="white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">오늘의 스마트 추천</h3>
              <p className="text-sm opacity-95 mb-4 leading-relaxed">
                오늘 출근 시간이 <strong>15분</strong> 늦어질 것 같아요. <br />
                <strong>8시</strong> 대신 <strong>7시 45분</strong> 출발을 권장합니다.
              </p>
              <button
                onClick={() => navigate('/routes')}
                className="bg-white text-purple-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95"
              >
                경로 보기 →
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
