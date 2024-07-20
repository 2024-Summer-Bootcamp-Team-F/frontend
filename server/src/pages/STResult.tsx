import React, { useState, useEffect } from 'react';
import ResultImage from '../components/ResultImage';
import ResultButton from '../components/ResultButton';
import { useLocation, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';

const STResult: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const location = useLocation();

  // Parse state passed from the previous component
  const { user_id, image_id } = location.state || {};

  // Determine the generation type based on the route
  const gen_type = location.pathname.includes('theme') ? 'concept' : 'simple';

  useEffect(() => {
    if (user_id && image_id) {
      backgroundHandler();
    }
  }, [user_id, image_id]);

  const backgroundHandler = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/backgrounds/', {
        user_id,
        image_id,
        gen_type,
      });
      const { image_url } = response.data;
      setPhotos((prevPhotos) => [...prevPhotos, image_url]);
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  };

  const getResultTitle = () => {
    if (location.pathname.includes('theme')) {
      return '테마 결과 이미지';
    }
    if (location.pathname.includes('simple')) {
      return '심플 결과 이미지';
    }
    return '결과 이미지';
  };

  const getResizingLink = () => {
    if (location.pathname.includes('theme')) {
      return '/theme/result/resizing';
    }
    if (location.pathname.includes('simple')) {
      return '/simple/result/resizing';
    }
    return '/result/resizing';
  };

  return (
    <div className="flex flex-col justify-start min-h-screen bg-black">
      <NavBar />
      <header className="flex items-center justify-center text-4xl text-white font-PR_BL my-14">{getResultTitle()}</header>
      <div className="flex flex-row items-start justify-center w-full shrink-0">
        <div className="grid grid-cols-3 gap-10 shrink-0">
          {photos.map((photo, index) => (
            <div key={index} className="flex flex-wrap items-center justify-center shrink-0">
              <ResultImage 
                src={photo} 
                onClick={() => setSelectedPhoto(photo)}
                isSelected={selectedPhoto === photo}
                width="64"
                height="64"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center shrink-0">
          {selectedPhoto && 
          <div className="ml-24">
            <img src={selectedPhoto} alt="selected" className="w-64 h-64 mb-5 border border-gray-300" />
            <div className="flex flex-col gap-10 space-y-2 mt-14">
              <ResultButton value="이미지 재생성" />
              <Link to={getResizingLink()}> {/*로딩컴포넌트 만든 후 다시 수정*/}
                <ResultButton value="이미지 크기 조절" />
              </Link>
              <ResultButton value="다운로드" />
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default STResult;
