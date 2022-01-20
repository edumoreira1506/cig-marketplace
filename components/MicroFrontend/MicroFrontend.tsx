import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

import 'react-image-gallery/styles/css/image-gallery.css';

export interface MicroFrontendProps {
  name: string;
  host: string;
  containerId: string;
  breederId?: string;
  poultryId?: string;
}

export default function MicroFrontend({
  name,
  host,
  containerId,
  breederId,
  poultryId
}: MicroFrontendProps) {
  const router = useRouter();

  const handleViewPoultry = useCallback(({ poultryId, breederId }: { poultryId: string, breederId: string }) => {
    router.push(`/breeders/${breederId}/poultries/${poultryId}`);
  }, [router]);

  useEffect(() => {
    const renderMicroFrontend = () => {
      const windowRender = (window as any)?.[`render${name}`];

      if (windowRender) {
        if (breederId && !poultryId) {
          windowRender(containerId, breederId, handleViewPoultry);
        }
        
        if (breederId && poultryId) {
          windowRender(containerId, breederId, poultryId);
        }
      }
    };

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement('script');

        script.id = `script-${containerId}`;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      });

    return () => {
      (window as any)[`unmount${name}`] && (window as any)[`unmount${name}`](`${name}-container`);
    };
  }, [name, host, containerId, poultryId, handleViewPoultry]);

  return <main id={`${name}-container`} />;
}
