'use client';

import { useState } from 'react';

export default function Page() {
  const [message, setMessage] = useState('');

  const checkConnection = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/test');
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage('연결 실패');
    }
  };

  return (
    <div className="p-10">
      <button
        onClick={checkConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        서버 테스트
      </button>
      <p className="mt-4 text-xl">{message}</p>
    </div>
  );
}