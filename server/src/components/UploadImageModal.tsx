import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Uploadcloud from '../assets/uploadcloud.svg?react';
import axios from 'axios';

interface UploadImageModalProps {
  onClose: () => void;
  onUpload: (file: File) => void;
  redirectPath: string;
  user_id: number;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({ onClose, onUpload, redirectPath, user_id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Determine the generation type based on the redirect path
  const gen_type = redirectPath.includes('theme') ? 'concept' : 'simple';

  // Debugging purpose
  console.log('Received user_id:', user_id);

  const imagehandler = async () => {
    if (!file) return;

    const formData = new FormData();
    if (user_id !== undefined) {
      formData.append('user_id', user_id.toString());
    } else {
      formData.append('user_id', '1'); // 기본값 설정
    }
    formData.append('file', file);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:8000/api/v1/images/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { image_id } = response.data;
      console.log('Image upload initiated with ID:', image_id);
      navigate(redirectPath, {
        state: {
          user_id: `${user_id}`,
          image_id: `${image_id}`,
          gen_type: `${gen_type}`,
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      const isValid = ['image/jpg', 'image/png', 'image/jpeg'].includes(selectedFile.type);
      if (!isValid) {
        setUploadError('JPG, PNG가 아닙니다.');
        setFile(null);
        setPreview(null);
        return;
      }

      setUploadError(null);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      imagehandler();
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setUploadError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center w-7/12 h-auto bg-white rounded-lg shadow-lg">
        <h2 className="flex items-center justify-center m-6 text-2xl font-PR_BL">
          변경하고 싶은 이미지를 업로드 해주세요
        </h2>

        {!preview ? (
          <div className="flex flex-col items-center justify-center w-5/6 p-4 mb-4 text-center border border-dashed rounded-lg h-4/6">
            <Uploadcloud className="mx-auto mt-10 mb-6" />
            <p className="mb-2 text-xl text-black font-PR_BO">
              파일을 선택하거나 여기로 드래그 앤 드롭합니다.
            </p>
            <p className="text-base text-gray-300 font-PR_M">
              JPG, PNG 크기는 10MB 이하입니다.
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            {uploadError && (
              <p className="mt-2 text-red font-PR_BL text-">{uploadError}</p>
            )}
            <label
              htmlFor="fileInput"
              className="inline-block px-4 py-3 my-8 border-2 border-solid rounded-lg cursor-pointer font-PR_BO text-green-Dark border-green-Dark hover:bg-green-Normal hover:text-black"
            >
              파일 선택하기
            </label>
          </div>
        ) : (
          <div className="relative flex flex-col items-center mb-4">
            <img src={preview} alt="미리보기" className="object-contain w-64 h-64 mb-2" />
            <div className="mt-2 text-gray-400 font-PR_M">
              {file?.name}
            </div>
            <button onClick={handleRemoveFile} className="flex px-2 py-1 text-gray-300 rounded">
              삭제
            </button>
          </div>
        )}

        <div className="flex items-end justify-end w-full px-4 py-4 mt-4 space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-black font-PR_BO px-8 py-2 rounded hover:bg-[#EFF0F1] drop-shadow-lg"
          >
            닫기
          </button>
          {preview && (
            <button
              onClick={handleUpload}
              className="px-6 py-2 text-black bg-blue-500 rounded font-PR_BO hover:bg-green-Normal drop-shadow-lg" 
              disabled={uploadError !== null || uploading}
            >
              {uploading ? '업로드 중...' : '업로드'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageModal;
