import { useStore } from '@nanostores/react';
import { generatedResponseStore } from './store';

export default function Gallery() {
  const $response = useStore(generatedResponseStore);

  return (
    <>
    </>
  );
}