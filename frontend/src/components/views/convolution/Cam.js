import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

function Cam(props) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    props.onCapture(imageSrc);
  }, [webcamRef, props]);

  return (
    <div className='w-full text-center border bg-white shadow-sm rounded-lg'>
      <div>
        <Webcam mirrored={true} width='100%' height='100%' ref={webcamRef} />
        <button className='bg-blue-500 text-white p-2 justify-center' onClick={capture}>
          Capture
        </button>
      </div>
    </div>
  );
}

export default Cam;
