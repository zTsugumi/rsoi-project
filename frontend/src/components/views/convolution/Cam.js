import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

function Cam(props) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    props.onCapture(imageSrc);
  }, [webcamRef, props]);

  return (
    <>
      <div>
        <Webcam mirrored={true} width='100%' height='100%' ref={webcamRef} />
      </div>
      <div>
        <button onClick={capture}>Capture</button>
      </div>
    </>
  );
}

export default Cam;
