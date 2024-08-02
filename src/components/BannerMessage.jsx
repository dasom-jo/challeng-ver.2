import React, { useState, useEffect } from 'react';

const BannerMessage = () => {
    const [currentAd, setCurrentAd] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAd(randomChoiceAD());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const randomChoiceAD = () => {
        const advertisements = [
            "안녕하세요 challen.gg 입니다.여러분의 도전을 응원합니다",
            "한국장학재단tel:02-4252-1845",
            "8282런닝 크루 멤버 모집",
            "나이스윙 골프크루 32회 골프대회 우승",

        ];
        const idx = Math.floor(Math.random() * advertisements.length);
        return advertisements[idx];
    };

    return (
        <span className='first'>
            {currentAd}
        </span>
    );
}

export default BannerMessage;
