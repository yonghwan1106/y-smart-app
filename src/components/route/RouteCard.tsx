import React, { useState } from 'react';
import { Clock, DollarSign, ChevronDown, ChevronUp, Star, Footprints, Bus, Train, Car } from 'lucide-react';
import { Route, RouteStep } from '../../types';
import Card from '../common/Card';

interface RouteCardProps {
  route: Route;
  onSelect: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  const getStepIcon = (type: RouteStep['type']) => {
    const icons = {
      walk: <Footprints size={18} className="text-gray-600" />,
      bus: <Bus size={18} className="text-blue-600" />,
      metro: <Train size={18} className="text-purple-600" />,
      taxi: <Car size={18} className="text-yellow-600" />,
      tabayong: <Bus size={18} className="text-green-600" />,
    };
    return icons[type];
  };

  const getCongestionColor = (congestion?: 'low' | 'medium' | 'high') => {
    if (!congestion) return '';
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600',
    };
    return colors[congestion];
  };

  const getCongestionText = (congestion?: 'low' | 'medium' | 'high') => {
    if (!congestion) return '';
    const texts = {
      low: '여유',
      medium: '보통',
      high: '혼잡',
    };
    return texts[congestion];
  };

  return (
    <Card
      padding="none"
      className={`overflow-hidden ${
        route.recommended
          ? 'ring-2 ring-teal-500 shadow-xl shadow-teal-100'
          : 'border border-gray-200'
      }`}
    >
      {route.recommended && (
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 flex items-center gap-2 text-sm font-bold">
          <Star size={16} fill="white" />
          <span>AI 추천 경로</span>
        </div>
      )}

      <div className="p-4">
        {/* Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-teal-50 px-3 py-2 rounded-lg">
              <Clock size={20} className="text-teal-600" />
              <span className="font-bold text-lg text-gray-900">{route.duration}분</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <DollarSign size={20} className="text-blue-600" />
              <span className="font-bold text-lg text-gray-900">{route.price.toLocaleString()}원</span>
            </div>
          </div>
          {route.congestion && (
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
              route.congestion === 'low' ? 'bg-green-100 text-green-700' :
              route.congestion === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {getCongestionText(route.congestion)}
            </div>
          )}
        </div>

        {/* Timeline Preview */}
        <div className="space-y-3 mb-4">
          {route.steps.slice(0, expanded ? undefined : 3).map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-0.5">{getStepIcon(step.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {step.type === 'walk' && `🚶 ${step.duration}분 도보`}
                    {step.type === 'bus' && `🚌 ${step.busNumber}번 버스`}
                    {step.type === 'metro' && '🚇 경전철'}
                    {step.type === 'taxi' && '🚕 택시'}
                    {step.type === 'tabayong' && '🚐 타바용'}
                  </span>
                  {step.stations && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {step.stations}정거장
                    </span>
                  )}
                </div>
                {step.name && (
                  <div className="text-xs text-gray-600 mt-1">{step.name}</div>
                )}
                {step.startTime && step.endTime && (
                  <div className="text-xs text-gray-500 mt-1">
                    ⏰ {step.startTime} → {step.endTime}
                  </div>
                )}
                {step.congestion && (
                  <div className={`inline-block text-xs mt-1.5 px-2 py-0.5 rounded-full ${
                    step.congestion === 'low' ? 'bg-green-50 text-green-700' :
                    step.congestion === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    혼잡도: {getCongestionText(step.congestion)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expand/Collapse */}
        {route.steps.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2.5 text-sm text-teal-600 font-semibold flex items-center justify-center gap-1 hover:bg-teal-50 rounded-lg transition-all active:scale-95 mb-3"
          >
            {expanded ? (
              <>
                접기 <ChevronUp size={16} />
              </>
            ) : (
              <>
                상세보기 <ChevronDown size={16} />
              </>
            )}
          </button>
        )}

        {/* Select Button */}
        <button
          onClick={onSelect}
          className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all active:scale-95 shadow-md"
        >
          이 경로로 출발 🚀
        </button>
      </div>
    </Card>
  );
};

export default RouteCard;
