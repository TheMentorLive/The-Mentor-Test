import { useState } from 'react';

const videos = [
  {
    title: 'Measurement Units for Responsive Designs',
    duration: '10:45',
    src: '/path-to-video-1.mp4', // Video source link
  },
  {
    title: 'Understanding Media Queries',
    duration: '15:20',
    src: '/path-to-video-2.mp4', // Another video source
  },
];

export default function VideoSection() {
  const [activeTab, setActiveTab] = useState('Video');
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleNext = () => {
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  const handlePrev = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full bg-gray-900 text-white p-6 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          {/* Tabs */}
          <button
            className={`text-left font-semibold w-full p-3 rounded-lg transition ${
              activeTab === 'Video' ? 'bg-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('Video')}
          >
            Video
          </button>
          <button
            className={`text-left font-semibold w-full p-3 rounded-lg transition ${
              activeTab === 'Doubts' ? 'bg-gray-800' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('Doubts')}
          >
            Doubts
          </button>
        </div>

        {activeTab === 'Video' && (
          <div>
            <div className="mt-6">
              <div className="text-green-500">● {videos[currentVideo].title}</div>
              <div className="text-sm text-gray-400">{videos[currentVideo].duration}</div>
            </div>

            {/* Options */}
            <div className="mt-6 space-y-4">
              <button className="text-sm text-blue-400 underline">Download files</button>
              <button className="text-sm text-blue-400 underline">Send feedback</button>
            </div>
          </div>
        )}

        {activeTab === 'Doubts' && (
          <div className="mt-6 text-gray-300">
            <p>No doubts have been posted yet.</p>
          </div>
        )}
      </aside>

      {/* Main Video Section */}
      <main className="lg:w-3/4 w-full bg-gray-100 p-8 flex flex-col justify-center items-center space-y-8">
        {/* Video Player */}
        <div className="w-full relative">
          <video
            className="w-full h-auto rounded-lg shadow-lg"
            controls
            src={videos[currentVideo].src}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between w-full">
          <button
            className={`text-lg font-semibold p-2 rounded-lg transition ${
              currentVideo === 0 ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'
            }`}
            disabled={currentVideo === 0}
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            className={`text-lg font-semibold p-2 rounded-lg transition ${
              currentVideo === videos.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'
            }`}
            disabled={currentVideo === videos.length - 1}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
