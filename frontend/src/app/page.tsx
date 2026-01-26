'use client';

import React, { useState } from 'react';
import SelectionMode from '../components/SelectionMode';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  icon: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: Category[] = [
    {
      id: 'solo',
      title: '혼밥',
      subtitle: '나만의 맛있는 시간',
      gradient: 'from-blue-500 to-cyan-400',
      icon: '🍜',
    },
    {
      id: 'date',
      title: '데이트',
      subtitle: '특별한 날, 특별한 곳',
      gradient: 'from-rose-500 to-pink-400',
      icon: '🍷',
    },
    {
      id: 'team',
      title: '회식',
      subtitle: '함께 즐기는 에너지',
      gradient: 'from-violet-600 to-purple-500',
      icon: '🍻',
    },
    {
      id: 'family',
      title: '가족',
      subtitle: '따뜻한 집밥 같은 한 끼',
      gradient: 'from-emerald-500 to-green-400',
      icon: '👨‍👩‍👧‍👦',
    },
  ];

  const handleModeSelect = async (mode: 'manual' | 'recommend') => {
    if (!selectedCategory) return;

    const payload = {
      category: selectedCategory.id,
      mode: mode,
    };

    console.log('Sending payload to backend:', payload);

    try {
      // 임의의 백엔드 URL - 실제 서버 주소로 변경 필요
      const response = await fetch('http://localhost:8080/api/selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
        alert(`선택 전송 성공!\nCategory: ${payload.category}\nMode: ${payload.mode}`);
      } else {
        console.error('Server error:', response.statusText);
        // 서버가 없으므로 테스트용으로 성공 메시지처럼 보여주되 실패했음을 알림
        alert(`서버로 전송을 시도했습니다.\n(URL: http://localhost:8080/api/selection)\n\n보낸 데이터:\nCategory: ${payload.category}\nMode: ${payload.mode}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      // 실제 서버가 없어서 에러가 날 경우에도 사용자가 동작을 확인하도록 알림
      alert(`서버 연결 실패 (예상된 동작)\nAPI 호출을 시도했습니다.\n\n보낸 데이터:\nCategory: ${payload.category}\nMode: ${payload.mode}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center gap-12">
        {/* Header */}
        <header className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            오늘 뭐 먹지?
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            상황에 딱 맞는 완벽한 식당을 찾아보세요
          </p>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCategory(item)}
              className="group relative h-64 md:h-80 w-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              {/* Hover Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 transition-transform duration-500 group-hover:scale-105">
                <span className="text-6xl md:text-7xl mb-6 drop-shadow-lg filter group-hover:drop-shadow-2xl transition-all">
                  {item.icon}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
                  {item.title}
                </h2>
                <p className="text-gray-300 group-hover:text-white/90 font-medium text-lg transition-colors">
                  {item.subtitle}
                </p>
              </div>

              {/* Glass Shine Effect */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[100%]" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay with Blur */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in"
            onClick={() => setSelectedCategory(null)}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl animate-in fade-in zoom-in duration-300">
            <SelectionMode
              category={selectedCategory}
              onBack={() => setSelectedCategory(null)}
              onSelect={handleModeSelect}
            />
          </div>
        </div>
      )}
    </main>
  );
}
