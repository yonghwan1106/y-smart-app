import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Zap, DollarSign, Heart } from 'lucide-react';
import Header from '../components/common/Header';
import RouteCard from '../components/route/RouteCard';
import { Route } from '../types';

const RouteSearch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'fast' | 'cheap' | 'comfortable'>('fast');

  // Mock data
  const routes: Route[] = [
    {
      id: '1',
      duration: 35,
      price: 2400,
      recommended: true,
      congestion: 'low',
      steps: [
        { type: 'walk', duration: 5, name: '수지구청역까지' },
        { type: 'metro', duration: 12, stations: 4, startTime: '14:20', endTime: '14:32', congestion: 'low' },
        { type: 'bus', duration: 15, stations: 3, busNumber: '5-3', congestion: 'low' },
        { type: 'walk', duration: 3, name: '용인시청까지' },
      ],
    },
    {
      id: '2',
      duration: 42,
      price: 1950,
      steps: [
        { type: 'walk', duration: 7, name: '타바용 정류장까지' },
        { type: 'tabayong', duration: 32, name: '타바용 이용', startTime: '14:25', endTime: '14:57' },
        { type: 'walk', duration: 3, name: '용인시청까지' },
      ],
    },
    {
      id: '3',
      duration: 28,
      price: 15000,
      congestion: 'medium',
      steps: [
        { type: 'taxi', duration: 28, name: '택시', startTime: '14:20', endTime: '14:48' },
      ],
    },
  ];

  const filters = [
    { key: 'fast' as const, icon: <Zap size={18} />, label: '빠른 순', color: 'bg-blue-500' },
    { key: 'cheap' as const, icon: <DollarSign size={18} />, label: '저렴한 순', color: 'bg-green-500' },
    { key: 'comfortable' as const, icon: <Heart size={18} />, label: '편한 순', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <Header title="경로 검색 결과" showBack />

      {/* Route Info Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-lg font-bold">수지구청역 → 용인시청</div>
            <div className="text-sm text-teal-100 flex items-center gap-2">
              ⏰ 오늘 오후 2:15 출발
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-1 text-sm font-medium transition-all active:scale-95">
            <Settings size={16} />
            옵션
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`
                flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap active:scale-95
                ${selectedFilter === filter.key
                  ? `${filter.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700 font-semibold text-sm border-2 border-teal-200 hover:border-teal-300 transition-all active:scale-95">
          ♿ 교통약자 경로
        </button>
      </div>

      {/* Route List */}
      <div className="p-4 space-y-4">
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onSelect={() => navigate('/navigation')}
          />
        ))}
      </div>

      {/* Info Banner */}
      <div className="mx-4 mb-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 shadow-md">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">절약 팁</p>
              <p className="text-sm text-blue-700">
                <strong>AI 추천 경로</strong>를 선택하면 이번 달 교통비를 약 <strong className="text-blue-900">12,000원</strong> 절약할 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSearch;
