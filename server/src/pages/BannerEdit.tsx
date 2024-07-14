import React from 'react';
import NavBar from '../components/NavBar';
import RadioButton from '../components/RadioButton';
import ResultButton from '../components/ResultButton';

interface BannerEditProps {
  mainText1: string;
  mainText2: string;
  subText1: string;
  subText2: string;
}

const BannerEdit: React.FC<BannerEditProps> = ({ mainText1, mainText2, subText1, subText2 }) => {
  const [checkedMajor, setCheckedMajor] = React.useState<string | null>(null);
  const [hoveredMajor, setHoveredMajor] = React.useState<string | null>(null);

  const [checkedMinor, setCheckedMinor] = React.useState<string | null>(null);
  const [hoveredMinor, setHoveredMinor] = React.useState<string | null>(null);

  const handleToggleMajor = (id: string) => {
    setCheckedMajor(prevChecked => (prevChecked === id ? null : id));
  };

  const handleMouseEnterMajor = (id: string) => {
    setHoveredMajor(id);
  };

  const handleMouseLeaveMajor = () => {
    setHoveredMajor(null);
  };

  const handleToggleMinor = (id: string) => {
    setCheckedMinor(prevChecked => (prevChecked === id ? null : id));
  };

  const handleMouseEnterMinor = (id: string) => {
    setHoveredMinor(id);
  };

  const handleMouseLeaveMinor = () => {
    setHoveredMinor(null);
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen overflow-hidden gap-6 bg-[#111]">
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-full overflow-hidden px-8 py-2 bg-[#111]">
        <div className="relative flex items-center self-stretch justify-between flex-grow-0 flex-shrink-0 h-full">
          <NavBar />
        </div>
      </div>
      <div className="flex flex-col justify-start items-center flex-grow flex-shrink-0 w-full relative overflow-hidden gap-1 px-12 py-2 bg-[#111]">
        <div className="flex-grow-0 flex-shrink-0 w-[60%] h-20 relative overflow-hidden">
          <p className="absolute left-0 text-xl font-medium text-left text-white top-12">자유롭게 변경하세요</p>
          <div className="absolute left-0 overflow-hidden top-2">
            <p className="text-2xl font-black text-left text-[#00d54b]">문구 편집</p>
          </div>
        </div>
        <div className="relative flex items-start justify-center flex-grow-0 flex-shrink-0 w-full h-full gap-32">
          <div className="relative flex-grow-0 flex-shrink-0 mt-8 mr-3 w-96 h-96">
            <div className="absolute left-0 top-0 w-96 h-96 bg-[#d9d9d9]" />
            <img src="ThemeImage/office.png" className="absolute top-0 left-0 object-cover w-96 h-96" />
            <p className="absolute left-5 bottom-24 font-PR_BO text-sm font-medium text-left text-[#111]">
              <span>{subText1}</span>
              <br />
              <span>{subText2}</span>
            </p>
            <p className="absolute text-xl font-black text-left text-white left-5 bottom-8">
              <span>{mainText1}</span>
              <br />
              <span>{mainText2}</span>
            </p>
          </div>
          <div className="flex flex-col items-center justify-start flex-grow-0 flex-shrink-0 gap-8 p-1 h-80 w-80">
            <div className="flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 gap-0 overflow-hidden pt-7">
              <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 h-48 overflow-hidden w-76">
                <p className="flex-grow-0 flex-shrink-0 w-20 h-6 text-lg font-black text-left pb-7 text-[#e6fbed]">주요</p>
                <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 py-1 overflow-hidden">
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3">
                    <RadioButton
                      checked={checkedMajor === 'option1'}
                      hovered={hoveredMajor === 'option1'}
                      onToggle={() => handleToggleMajor('option1')}
                      onMouseEnter={() => handleMouseEnterMajor('option1')}
                      onResetHover={handleMouseLeaveMajor}
                      text='아무거나 아무거나'
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3 overflow-hidden">
                    <RadioButton
                      checked={checkedMajor === 'option2'}
                      hovered={hoveredMajor === 'option2'}
                      onToggle={() => handleToggleMajor('option2')}
                      onMouseEnter={() => handleMouseEnterMajor('option2')}
                      onResetHover={handleMouseLeaveMajor}
                      text='왜이래 왜이래'
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 overflow-hidden">
                    <RadioButton
                      checked={checkedMajor === 'option3'}
                      hovered={hoveredMajor === 'option3'}
                      onToggle={() => handleToggleMajor('option3')}
                      onMouseEnter={() => handleMouseEnterMajor('option3')}
                      onResetHover={handleMouseLeaveMajor}
                      text='적당히 적당히'
                    />
                  </div>
                </div>
                <div className="self-stretch flex-grow-0 flex-shrink-0 h-48 bg-[#111] border border-[#111]" style={{ boxShadow: '0px 4px 4px 0 rgba(0,0,0,0.25)' }} />
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-80 h-8 relative gap-0.5 px-1 py-0.5 rounded-md border border-[#e6fbed]">
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">손에 착 감기는 완벽함 중국산의 새로운 기준</p>
                </div>
              </div>
              <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 h-48 overflow-hidden">
                <p className="flex-grow-0 flex-shrink-0 w-16 h-6 text-lg font-medium pb-7 text-left text-[#e6fbed]">부가</p>
                <div className="relative flex flex-col items-start self-stretch justify-start flex-grow-0 flex-shrink-0 py-1 overflow-hidden">
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3 overflow-hidden">
                    <RadioButton
                      checked={checkedMinor === 'option4'}
                      hovered={hoveredMinor === 'option4'}
                      onToggle={() => handleToggleMinor('option4')}
                      onMouseEnter={() => handleMouseEnterMinor('option4')}
                      onResetHover={handleMouseLeaveMinor}
                      text='퍼블리싱 날 힘들게 하지마'
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 mb-3 overflow-hidden">
                    <RadioButton
                      checked={checkedMinor === 'option5'}
                      hovered={hoveredMinor === 'option5'}
                      onToggle={() => handleToggleMinor('option5')}
                      onMouseEnter={() => handleMouseEnterMinor('option5')}
                      onResetHover={handleMouseLeaveMinor}
                      text='그만 그만 그만'
                    />
                  </div>
                  <div className="relative self-stretch flex-grow-0 flex-shrink-0 h-10 overflow-hidden">
                    <RadioButton
                      checked={checkedMinor === 'option6'}
                      hovered={hoveredMinor === 'option6'}
                      onToggle={() => handleToggleMinor('option6')}
                      onMouseEnter={() => handleMouseEnterMinor('option6')}
                      onResetHover={handleMouseLeaveMinor}
                      text='기능 구현 언제쯤...'
                    />
                  </div>
                </div>
                <div className="self-stretch flex-grow-0 flex-shrink-0 h-48 bg-[#111] border border-[#111]" style={{ boxShadow: '0px 4px 4px 0 rgba(0,0,0,0.25)' }} />
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-80 h-8 relative gap-0.5 px-1 py-0.5 rounded-md border border-[#e6fbed]">
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">손에 착 감기는 완벽함 중국산의 새로운 기준</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-grow-0 flex-shrink-0 gap-4 px-4 py-2 mt-10 overflow-hidden">
          <div className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 w-32 h-8 gap-1 px-1 rounded-lg">
            <ResultButton value="확인" />
          </div>
          <div className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 w-32 h-8 gap-1 px-1 rounded-lg">
            <ResultButton value="닫기" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerEdit;