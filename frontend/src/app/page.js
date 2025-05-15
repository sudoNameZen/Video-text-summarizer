'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Dynamically import MediaUploader with no SSR
const MediaUploader = dynamic(() => import('@/components/MediaUploader'), {
  ssr: false,
  loading: () => <div className="text-center py-12">Loading media uploader...</div>
});

const metadata = {
  title: 'LightScript - Video to Text Summaries',
  description: 'Upload videos and get concise text summaries instantly',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4 py-8 max-w-3xl mx-auto">
        <MediaUploader />
      </main>
      <Footer />
    </div>
  );
}
