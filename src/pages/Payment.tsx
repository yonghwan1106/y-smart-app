import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Coins, Gift, TrendingDown, ChevronRight } from 'lucide-react';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import { Payment as PaymentType } from '../types';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<string>('point');
  const [autoPayment, setAutoPayment] = useState(false);

  const paymentMethods: PaymentType[] = [
    { method: 'card', name: '신용카드', identifier: 'KB *1234' },
    { method: 'point', name: '용인시티포인트', balance: 25400 },
    { method: 'kakaopay', name: '카카오페이' },
    { method: 'ypay', name: '와이페이', balance: 150000 },
  ];

  const getPaymentIcon = (method: PaymentType['method']) => {
    const icons = {
      card: <CreditCard size={20} />,
      point: <Gift size={20} />,
      kakaopay: <Smartphone size={20} />,
      ypay: <Coins size={20} />,
    };
    return icons[method];
  };

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      alert('결제가 완료되었습니다! 🎉');
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32">
      <Header title="통합 결제" showBack />

      {/* Trip Summary */}
      <div className="p-4">
        <Card padding="none" className="bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-xl overflow-hidden border-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative p-6 text-center">
            <h2 className="text-sm text-teal-100 mb-2 font-medium">수지구청역 → 용인시청</h2>
            <p className="text-5xl font-bold mb-6">2,000원</p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-teal-100">🚋 경전철</span>
                <span className="font-semibold">1,450원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-teal-100">🚌 버스 5-3번</span>
                <span className="font-semibold">1,200원</span>
              </div>
              <div className="flex justify-between text-sm text-yellow-300">
                <span>💰 환승 할인</span>
                <span className="font-bold">-250원</span>
              </div>
              <div className="flex justify-between text-sm text-yellow-300">
                <span>🎫 처인구 통근패스 할인</span>
                <span className="font-bold">-400원</span>
              </div>
              <div className="border-t border-white/20 mt-2 pt-2.5 flex justify-between font-bold text-base">
                <span>최종 금액</span>
                <span className="text-yellow-300">2,000원</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Payment Methods */}
      <div className="px-4 mb-4">
        <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
          💳 결제 수단 선택
        </h3>
        <Card padding="none" className="shadow-lg border border-gray-200">
          {paymentMethods.map((payment, index) => (
            <button
              key={index}
              onClick={() => setSelectedPayment(payment.method)}
              className={`
                w-full p-4 flex items-center gap-3 transition-all active:scale-98
                ${index !== 0 ? 'border-t border-gray-200' : ''}
                ${selectedPayment === payment.method ? 'bg-gradient-to-r from-teal-50 to-blue-50' : 'hover:bg-gray-50'}
              `}
            >
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${selectedPayment === payment.method
                  ? 'border-teal-500 bg-teal-500 shadow-lg shadow-teal-200'
                  : 'border-gray-300'
                }
              `}>
                {selectedPayment === payment.method && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>

              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all
                ${payment.method === 'ypay' ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg' :
                  payment.method === 'point' ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg' :
                  payment.method === 'kakaopay' ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-800 shadow-lg' :
                  'bg-gradient-to-br from-blue-400 to-indigo-400 text-white shadow-lg'}
              `}>
                {getPaymentIcon(payment.method)}
              </div>

              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">{payment.name}</p>
                {payment.identifier && (
                  <p className="text-xs text-gray-500 mt-0.5">{payment.identifier}</p>
                )}
                {payment.balance !== undefined && (
                  <p className="text-xs text-teal-600 font-semibold mt-0.5">
                    잔액: {payment.balance.toLocaleString()}P
                  </p>
                )}
              </div>

              {payment.method === 'ypay' && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  +10% 적립
                </div>
              )}
            </button>
          ))}

          <button className="w-full p-4 border-t border-gray-200 flex items-center justify-center gap-2 text-teal-600 font-bold hover:bg-teal-50 transition-all active:scale-95">
            <span>결제 수단 추가</span>
            <ChevronRight size={18} />
          </button>
        </Card>
      </div>

      {/* Benefits */}
      <div className="px-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3 px-1">적용 혜택</h3>
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Gift size={20} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">그린 마일리지 30P 적립</p>
                <p className="text-xs text-gray-500">대중교통 이용 포인트</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingDown size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">알뜰교통카드 12% 할인</p>
                <p className="text-xs text-gray-500">연계 혜택 자동 적용</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Stats */}
      <div className="px-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3 px-1">이용 내역</h3>
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">이번 달 교통비</span>
            <button className="text-sm text-teal-600 font-medium flex items-center gap-1">
              상세 보기
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">45,300원</span>
            <span className="text-sm text-green-600 font-medium flex items-center gap-0.5">
              <TrendingDown size={14} />
              전월 대비 12% ⬇️
            </span>
          </div>
          <p className="text-xs text-gray-500">
            💡 월정액 패스 가입 시 월 5,000원 추가 절감 가능
          </p>
        </Card>
      </div>

      {/* Bottom Payment */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 max-w-[480px] mx-auto shadow-2xl">
        <div className="flex items-center gap-2 mb-3 bg-gray-50 p-3 rounded-xl">
          <input
            type="checkbox"
            id="auto-payment"
            checked={autoPayment}
            onChange={(e) => setAutoPayment(e.target.checked)}
            className="w-5 h-5 text-teal-500 rounded focus:ring-2 focus:ring-teal-500"
          />
          <label htmlFor="auto-payment" className="text-sm text-gray-700 font-medium">
            다음 결제부터 자동 결제하기
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-4 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl transition-all shadow-xl active:scale-95"
        >
          💳 2,000원 결제하기
        </button>
      </div>
    </div>
  );
};

export default Payment;
