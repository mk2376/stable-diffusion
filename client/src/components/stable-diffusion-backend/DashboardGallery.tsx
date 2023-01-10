import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useStore } from '@nanostores/react';
import { SpinnerDotted } from 'spinners-react';
import { generatedResponseStore, generateLoadingStore } from './store';
import 'react-photo-view/dist/react-photo-view.css';

export default function Gallery() {
  const $response = useStore(generatedResponseStore);
  const $generateLoading = useStore(generateLoadingStore);

  return (
    <div className='grid place-items-center justify-items-center min-h-full'>
    
      <div className={`grid grid-cols-1 gap-4 ${$response.images.length > 1 ? $response.images.length > 2 ? "2xl:grid-cols-3": "xl:grid-cols-2": ""} ${$generateLoading ? "hidden": ""}`}>
        <PhotoProvider>
          {$response.images.map((image, index) => (
            <PhotoView src={image} key={index}>
              <img src={image} alt={$response.prompt} className="min-w-[300px]" />
            </PhotoView>
          ))}
        </PhotoProvider>
      </div>

      { /*<DominoSpinner color="#36d7b7" loading={$generateLoading} size={200} /> */ }
      <SpinnerDotted color="#2563eb" enabled={$generateLoading} size={150} />
    </div>
  )
}