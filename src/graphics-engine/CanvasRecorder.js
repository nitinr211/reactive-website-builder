import React, { useRef, useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';

const CanvasRecorder = () => {
  const canvasRef = useRef(null);
  const recorderRef = useRef(null);
  const [recordingDone, setRecordingDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Animation function
    let x = 0;
    const animationDuration = 5000; // Animation duration in milliseconds
    const startTime = Date.now();

    const animate = () => {
      if (recordingDone) return; // Stop animation if recording is done

      const elapsedTime = Date.now() - startTime;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'red';
      context.fillRect(x, 50, 50, 50);
      x += 2;
      if (x > canvas.width) x = -50;

      if (elapsedTime < animationDuration) {
        requestAnimationFrame(animate);
      } else {
        if (recorderRef.current) {
          recorderRef.current.stopRecording(() => {
            const blob = recorderRef.current.getBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'animation.mp4';
            a.click();
            setRecordingDone(true); // Mark recording as done
          });
        }
      }
    };

    // Start animation
    if (!recordingDone) {
      const stream = canvas.captureStream(30); // 30 fps
      recorderRef.current = RecordRTC(stream, { type: 'video' });
      recorderRef.current.startRecording();
      animate();
    }

    // Cleanup on component unmount
    return () => {
      if (recorderRef.current && !recordingDone) {
        recorderRef.current.stopRecording(() => {
          const blob = recorderRef.current.getBlob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'animation.mp4';
          a.click();
        });
      }
    };
  }, [recordingDone]);

  const startRecording = () => {
    setRecordingDone(false); // Reset recording status
  };

  const Restart = () => {
    setRecordingDone(false); // Reset recording status
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="800"
        height="600"
        style={{ border: '1px solid black' }}
      ></canvas>
      <div>
        <button onClick={startRecording}>Import into website builder</button>
        <button onClick={startRecording}>Save as video</button>
        <button onClick={Restart}>Restart</button>
      </div>
    </div>
  );
};

export default CanvasRecorder;
