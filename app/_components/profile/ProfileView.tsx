"use client";
import ResponsiveIframe from './ResponsiveIFrame';

export default function ProfileView({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 w-full">
      <ResponsiveIframe username={username}/>
    </div>
  );
}