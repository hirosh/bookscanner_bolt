import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';

interface BarcodeScannerProps {
  onDetected: (result: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected }) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              width: 640,
              height: 480,
              facingMode: 'environment',
            },
          },
          decoder: {
            readers: ['ean_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Error initializing Quagga:', err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((result) => {
        const code = result.codeResult.code;
        if (code && code.startsWith('978')) {
          onDetected(code);
        }
      });
    }

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div ref={scannerRef} className="w-full h-64 bg-gray-200" />;
};

export default BarcodeScanner;