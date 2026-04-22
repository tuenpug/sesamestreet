import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: any;
}

export default function TransparentCharacter({ src, alt, className, style, animate }: Props) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setProcessedSrc(null);

    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      if (!isMounted) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx || img.width <= 10 || img.height <= 10) {
        setProcessedSrc(src);
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;

      const stack: [number, number][] = [];
      const visited = new Uint8Array(width * height);
      
      const addSeed = (x: number, y: number) => {
         const idx = (y * width + x) * 4;
         if (data[idx] > 230 && data[idx+1] > 230 && data[idx+2] > 230) {
           stack.push([x, y]);
         }
      };
      
      for(let x = 0; x < width; x++) { addSeed(x, 0); addSeed(x, height - 1); }
      for(let y = 0; y < height; y++) { addSeed(0, y); addSeed(width - 1, y); }

      while (stack.length > 0) {
        const [x, y] = stack.pop()!;
        const gridIdx = y * width + x;
        
        if (visited[gridIdx]) continue;
        visited[gridIdx] = 1;
        
        const px = gridIdx * 4;
        const r = data[px];
        const g = data[px+1];
        const b = data[px+2];

        if (r > 180 && g > 180 && b > 180) {
          const avg = (r + g + b) / 3;
          
          if (avg > 235) {
            data[px + 3] = 0;
          } else {
            const alpha = Math.floor((235 - avg) * (255 / 55));
            data[px + 3] = Math.max(0, Math.min(255, alpha));
          }
          
          if (x > 0) stack.push([x - 1, y]);
          if (x < width - 1) stack.push([x + 1, y]);
          if (y > 0) stack.push([x, y - 1]);
          if (y < height - 1) stack.push([x, y + 1]);
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
    };
    
    img.onerror = () => {
      if (isMounted) setProcessedSrc(src);
    };

    if (src.includes('pollinations.ai')) {
      img.src = src;
    } else {
      const cleanUrl = src.replace(/^https?:\/\//, '');
      img.src = `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&output=png`;
    }

    return () => { isMounted = false; };
  }, [src]);

  if (!processedSrc) {
    if (animate) {
       return <motion.img src={src} alt={alt} className={className} style={{...style, opacity: 0}} animate={animate} />;
    }
    return <img src={src} alt={alt} className={className} style={{...style, opacity: 0}} />;
  }

  if (animate) {
     return <motion.img src={processedSrc} alt={alt} className={className} style={style} animate={animate} draggable={false} />;
  }
  return <img src={processedSrc} alt={alt} className={className} style={style} draggable={false} />;
}
