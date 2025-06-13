'use client';
import { selectViewMode } from '@/redux/viewModeSlice';
import { useSelector } from 'react-redux';

export default function ResponsiveIframe({ username }: { username: string }) {
  const viewMode = useSelector(selectViewMode);
  
  return (
    <div className={`relative border rounded-lg overflow-hidden max-w-[100vw] w-full h-[80vh] mx-auto
      ${viewMode === 'mobile' ? 
        'md:max-w-[600px]' : 
        'w-full '}
    `}>
      <iframe
        src={`/${username}`}
        className="absolute top-0 left-0 w-full h-full border-none"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
}