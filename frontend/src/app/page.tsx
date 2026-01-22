'use client';

import { useState } from 'react';

export default function Page() {
  const [pokemonId, setPokemonId] = useState(''); // 입력값 저장
  const [data, setData] = useState<any>(null);    // 결과 저장

  const fetchPokemon = async () => {
    if (!pokemonId) return alert("ID나 이름을 입력하세요!");

    try {
      // 백엔드의 @GetMapping("/{id}") 경로로 요청을 보냄
      const res = await fetch(`http://localhost:8080/api/pokemon/${pokemonId}`);
      const json = await res.json(); // 이번엔 객체 데이터이므로 .json() 사용
      setData(json);
    } catch (err) {
      console.error(err);
      alert('데이터를 가져오지 못했습니다.');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">포켓몬 검색</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="번호 또는 이름 (예: 25, pikachu)"
          className="border p-2 rounded text-black"
          value={pokemonId}
          onChange={(e) => setPokemonId(e.target.value)}
        />
        <button
          onClick={fetchPokemon}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          검색
        </button>
      </div>

      {data && (
        <div className="border p-4 rounded bg-gray-100 text-black">
          <p>이름: <strong>{data.name}</strong></p>
          <p>번호: {data.id}</p>
          {/* 포켓몬 이미지 경로 출력 */}
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
      )}
    </div>
  );
}