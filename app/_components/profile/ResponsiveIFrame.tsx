'use client';
import { selectViewMode } from '@/redux/viewModeSlice';
import { useSelector } from 'react-redux';

export default function ResponsiveIframe({ username }: { username: string }) {
  const viewMode = useSelector(selectViewMode);
  
  return (
    <div className={`relative border rounded-lg overflow-hidden
      ${viewMode === 'mobile' ? 
        'w-[375px] h-[667px] mx-auto' : 
        'w-full h-[800px]'}
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