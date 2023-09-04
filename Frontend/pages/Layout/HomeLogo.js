import React from 'react';

export default function HomeLogo({ applePath }) {
  return (
    <div className="HomeLogo">
      <header>
        <div className="avatar indicator py-3">
          <div className="w-20 h-20 rounded-lg">
            <img src={applePath} width={70} height={70} alt="Apple" style={{ borderRadius: '50%' }} />
          </div>
        </div>
      </header>
    </div>
  );
}
