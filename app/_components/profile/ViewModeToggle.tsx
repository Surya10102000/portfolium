// components/ViewModeToggle.tsx
'use client';
import { Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { selectViewMode, toggleViewMode } from '@/redux/viewModeSlice';

export function ViewModeToggle() {
  const dispatch = useDispatch();
  
  const viewMode = useSelector(selectViewMode);

  return (
    <div className="bottom-4 right-4 z-50 hidden md:block">
      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(toggleViewMode())}
        className="gap-2"
      >
        {viewMode === 'mobile' ? (
          <>
            <Monitor className="h-4 w-4" />
            <span>Desktop</span>
          </>
        ) : (
          <>
            <Smartphone className="h-4 w-4" />
            <span>Mobile</span>
          </>
        )}
      </Button>
    </div>
  );
}