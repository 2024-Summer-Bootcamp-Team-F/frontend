import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResultImageBanner from '../components/ResultImageBanner';
import ResultButton3 from '../components/ResultButton3';
import LastImage, { LastImageRef } from '../components/LastImage';
import NavBar from '../components/NavBar';

interface BannerResponse {
  code: number;
  message: string;
  data: {
    maintext: string;
    servetext: string;
    maintext2: string;
    servetext2: string;
  };
}

interface BackgroundResponse {
  id: number;
  user: number;
  image_url: string;
  output_h: number;
  output_w: number;  
}

const BannerResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { backgroundids = [] } = location.state || { backgroundids: [] }; 
  const { bannerid } = location.state || { };
  const { takeMaintext, takeServetext, Index } = location.state || {};


  // 배너 텍스트 배열 상태 변수
  const [MainText, setMainText] = useState<string[]>(new Array(backgroundids.length).fill(''));
  const [ServeText, setServeText] = useState<string[]>(new Array(backgroundids.length).fill(''));


  // 메세지 상태 변수
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  // 사진 배열 상태 변수
  const [photos, setPhotos] = useState<string[]>(new Array(backgroundids.length).fill(''));
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [selectedBackgroundId, setSelectedBackgroundId] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectMainText, setSelectMainText] = useState<string>('');
  const [selectserveText, setSelectServeText] = useState<string>('');
  const [index, setindex] = useState<number>(0);



  const lastImageRef = useRef<LastImageRef>(null);
  const [isImageVisible, setIsImageVisible] = useState<boolean>(false);

  const goToResizingBanner = () => {
    if (selectedBackgroundId !== null) {
      navigate('/banner/result/resizing', { state: { backgroundid: selectedBackgroundId, Maintext:selectMainText, Servetext: selectserveText } });
    }
  };
  
  const goToBannerEdit = () => {
    if (selectedBackgroundId !== null) {
      console.log("index=",index);
    
      console.log(MainText);
      console.log(ServeText);
      navigate('/banner/result/edit', { state: { backgroundids: backgroundids, banner_id:bannerid ,Photo:selectedPhoto, Maintext:selectMainText, Servetext: selectserveText, index:index } });
    }
  };
  
  useEffect(() => {
    const fetchBackgrounds = async () => {
      if (!Array.isArray(backgroundids) || backgroundids.length === 0) {
        setMessage('배경 ID가 제공되지 않았습니다.');
        setIsError(true);
        return;
      }

      try {
        const responses = await Promise.all(
          backgroundids.map((id) => axios.get<BackgroundResponse>(`http://localhost:8000/api/v1/backgrounds/${id}/`))
        );

        const newPhotos = responses.map((response, index) => {
          if (response.data) {
            if (index === 0) {
              setWidth(response.data.output_w);
              setHeight(response.data.output_h);
            }
            return response.data.image_url;
          } else {
            console.log(`ID ${backgroundids[index]}에 대한 유효한 데이터를 받지 못했습니다.`);
            setMessage('유효한 데이터를 받지 못했습니다.');
            setIsError(true);
            return '';
          }
        });

        setPhotos(newPhotos);
      } catch (error) {
        console.log('배경 데이터를 가져오는 중 오류가 발생했습니다:', error);
        setMessage('배경 데이터를 가져오는 중 오류가 발생했습니다.');
        setIsError(true);
      }
    };

    fetchBackgrounds();
  }, [backgroundids]);
  

  useEffect(() => {
    const fetchBanner = async () => {
      console.log("Result페이지 베너 아이디",bannerid);
      try {
        const response = await axios.get<BannerResponse>(`http://localhost:8000/api/v1/banners/${bannerid}/`);
        if (response.data && response.data.data) {
          // 동일한 값을 배열의 모든 요소에 설정
          const mainTextArray = new Array(backgroundids.length).fill(response.data.data.maintext);
          const serveTextArray = new Array(backgroundids.length).fill(response.data.data.servetext);  
          setMainText(mainTextArray);
          setServeText(serveTextArray);
          
          setMainText(prevMainText => {
            const newMainText = [...prevMainText];
            if (Index !== undefined) {
                newMainText[Index] = takeMaintext;
            }
            return newMainText;
        });
        
        setServeText(prevServeText => {
            const newServeText = [...prevServeText];
            if (Index !== undefined) {
                newServeText[Index] = takeServetext;
            }
            return newServeText;
        });


        }else {
          setMessage('유효한 데이터를 가져오지 못했습니다.');
          setIsError(true);
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
        setMessage('배너 데이터를 가져오는 중 오류가 발생했습니다.');
        setIsError(true);
      }
    };

    fetchBanner();
  }, [backgroundids, bannerid, Index, takeMaintext, takeServetext]);




  const handleDownloadClick = async () => {
    if (lastImageRef.current) {
      setIsImageVisible(true); // Show the image component
      // Allow time for the component to render before capturing
      setTimeout(async () => {
        if (lastImageRef.current) { // Double-check if the ref is still non-null
          await lastImageRef.current.downloadImage();
        }
        setIsImageVisible(false); // Hide the image component
      }, 500); // Small delay to ensure the component is visible
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen px-10 pb-12 bg-black">
      <NavBar />
      <header className="flex justify-center items-center my-6 text-4xl font-PR_BL">
        <span className="text-white">배너 </span>
        <span className="text-green-Normal ml-2">결과 이미지</span>
      </header>
      <div className="flex flex-row items-start justify-center w-full h-full">
        <div className="grid grid-cols-2 gap-10 h-full">
          {photos.map((photo, index) => (
            <div key={index} className="flex flex-wrap items-center justify-center h-full">
              
              <ResultImageBanner 
                src={photo} 
                onClick={() => {
                  setSelectedPhoto(photo);
                  setSelectedBackgroundId(backgroundids[index]); // Update selected background id
                  setSelectMainText(MainText[index]);
                  setSelectServeText(ServeText[index]);
                  setindex(index);
                }}
                isSelected={selectedPhoto === photo}
                width={270}
                height={270}
                maintext={MainText[index]}
                servetext={ServeText[index]}
              />
            </div>
          ))}
        </div>
       
        {selectedPhoto && 
          <div className="flex flex-col minHeight ml-24 gap-10">
            <ResultImageBanner
              src={selectedPhoto}
              isSelected={false}
              width={270}
              height={270}
              maintext={selectMainText}
              servetext={selectserveText} />
            
            <div className="flex flex-col gap-10 mt-[4px]">
              <div onClick={goToBannerEdit}>
                <ResultButton3 value='문구 편집' />
              </div>
              <button
                className="flex justify-center items-center w-full h-full min-h-[60px] rounded-[10px] border-2 border-green-Light hover:border-green-Normal active:border-green-Normal hover:bg-green-Normal active:bg-green-Normal hover:font-PR_BO active:font-PR_BO text-max-xl font-PR_M text-center text-green-Light hover:text-black active:text-black"
                onClick={handleDownloadClick}
              >
                다운로드
              </button>
              <div onClick={goToResizingBanner}>
                <ResultButton3 value='이미지 크기 조절' />
              </div>
            </div>
          </div>
        }
      </div>
      {/* The component for invisible rendering */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', visibility: isImageVisible ? 'visible' : 'hidden', pointerEvents: 'none' }}>
        <LastImage
          ref={lastImageRef}
          src={selectedPhoto || ''} // Ensure src is always provided
          width={width}
          height={height}
          maintext={selectMainText}
          servetext={selectserveText}
        />
      </div>
    </div>
  );
};

export default BannerResult;
