import React from 'react';

interface SelectionModeProps {
    category: {
        title: string;
        icon: string;
    };
    onBack: () => void;
    onSelect: (mode: 'manual' | 'recommend') => void;
}

export default function SelectionMode({ category, onBack, onSelect }: SelectionModeProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl animate-in fade-in zoom-in duration-300">

            {/* Header with Back Button */}
            <div className="relative w-full flex items-center justify-center mb-12">
                <button
                    onClick={onBack}
                    className="absolute left-0 p-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                    <span>뒤로</span>
                </button>
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">{category.icon}</span>
                    {category.title}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Manual Selection Option */}
                <button
                    onClick={() => onSelect('manual')}
                    className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md"
                >
                    <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors box-border border border-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <span className="text-4xl">👆</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">내가 고를래</h3>
                        <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                            직접 식당 리스트를 보고<br />마음에 드는 곳을 선택해요
                        </p>
                    </div>
                </button>

                {/* Recommendation Option */}
                <button
                    onClick={() => onSelect('recommend')}
                    className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md"
                >
                    <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors box-border border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            <span className="text-4xl">🎲</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">추천 받을래</h3>
                        <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                            고민하지 말고<br />딱 맞는 곳을 추천받아요
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}
