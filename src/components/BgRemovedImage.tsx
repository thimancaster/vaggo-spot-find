
import { useEffect, useState, useRef } from 'react';
import { loadImageAndRemoveBg } from '../lib/image';
import { Skeleton } from './ui/skeleton';

interface BgRemovedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export function BgRemovedImage({ src, className, alt, ...props }: BgRemovedImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const processedSrcRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const cleanup = () => {
      if (processedSrcRef.current && processedSrcRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(processedSrcRef.current);
        processedSrcRef.current = null;
      }
    };

    cleanup();
    setProcessedSrc(null);
    setError(false);

    if (!src) return;

    loadImageAndRemoveBg(src)
      .then(newSrc => {
        if (isMounted) {
          processedSrcRef.current = newSrc;
          setProcessedSrc(newSrc);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
        }
      });

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [src]);

  if (error) {
    return <img src={src} className={className} alt={alt} {...props} />;
  }

  if (!processedSrc) {
    const loaderClassName = className?.replace('w-auto', 'w-32') || 'h-12 w-32';
    return <Skeleton className={`${loaderClassName} bg-gray-700 rounded-md`} />;
  }
  
  return <img src={processedSrc} className={className} alt={alt} {...props} />;
}
