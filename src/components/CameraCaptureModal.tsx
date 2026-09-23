import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';

interface CameraCaptureModalProps {
  onCapture: (photoDataUrl: string) => void;
  onClose: () => void;
  lang?: 'gu' | 'en';
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  onCapture,
  onClose,
  lang = 'gu',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
          audio: false,
        });
        currentStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setError(
          lang === 'gu'
            ? 'કેમેરા શરૂ થઈ શક્યો નથી. કૃપા કરીને બ્રાઉઝરમાં કેમેરા પરવાનગી ચકાસો.'
            : 'Could not access camera. Please allow camera permissions in your browser.'
        );
      }
    }

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [lang]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crop to square passport ratio
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = 400;
    canvas.height = 480; // slight vertical passport portrait

    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;

    ctx.drawImage(video, startX, startY, size, size, 0, 0, 400, 480);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedPhoto(dataUrl);
  };

  const retake = () => {
    setCapturedPhoto(null);
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      onCapture(capturedPhoto);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">
              {lang === 'gu' ? 'વિદ્યાર્થી ફોટો કેપ્ચર' : 'Student Photo Capture'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col items-center">
          {error ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs text-center">
              {error}
            </div>
          ) : (
            <div className="relative w-64 h-76 bg-black rounded-lg overflow-hidden border-2 border-blue-500 shadow-md">
              {!capturedPhoto ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  {/* Passport photo alignment guide overlay */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <div className="w-40 h-52 border-2 border-dashed border-white/60 rounded-full opacity-60" />
                    <span className="text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded mt-2">
                      {lang === 'gu' ? 'ચહેરો અહીં ગોઠવો' : 'Align face in oval'}
                    </span>
                  </div>
                </>
              ) : (
                <img
                  src={capturedPhoto}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />

          <div className="flex items-center gap-3 mt-5">
            {!capturedPhoto ? (
              <button
                type="button"
                onClick={takePhoto}
                disabled={Boolean(error)}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                <Camera className="w-4 h-4" />
                {lang === 'gu' ? 'ફોટો પાડો (Capture)' : 'Capture Photo'}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={retake}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {lang === 'gu' ? 'ફરીથી પાડો' : 'Retake'}
                </button>
                <button
                  type="button"
                  onClick={confirmPhoto}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  {lang === 'gu' ? 'આ ફોટો રાખો' : 'Use Photo'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
