import ProcessCard from '@/components/ProcessCard';
import { LightningBoltIcon, SpeakerphoneIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/outline';

export const metadata = {
  title: 'About LightScript - Video to Text Summaries',
  description: 'Learn how LightScript transforms your videos into concise text summaries using AI technology',
};

export default function AboutPage() {
  const features = [
    {
      title: "Fast Processing",
      description: "Get summaries in seconds, not hours. Our AI works quickly to deliver results.",
      icon: <LightningBoltIcon className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Accurate Transcripts",
      description: "Industry-leading speech-to-text technology ensures high accuracy.",
      icon: <SpeakerphoneIcon className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Concise Summaries",
      description: "We extract key points so you don't have to watch the whole video.",
      icon: <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
    },
    {
      title: "Smart Analysis",
      description: "Our AI understands context to provide meaningful summaries.",
      icon: <SparklesIcon className="h-6 w-6 text-indigo-600" />
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-600">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-indigo-700" />
        </div>
        <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          <div className="bg-indigo-600 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                About LightScript
              </h1>
              <p className="mt-3 text-lg leading-6 text-indigo-200">
                Transforming video content into actionable insights through AI-powered summarization.
              </p>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <div className="prose prose-lg text-gray-500">
                <p>
                  In today's digital landscape, video content dominates but remains largely inaccessible 
                  to quick scanning and reference. LightScript bridges this gap by converting video 
                  content into concise, searchable text summaries.
                </p>
                <p>
                  Our technology processes user-provided video files or URLs, extracts the audio, 
                  transcribes it with industry-leading accuracy, and generates summaries that highlight 
                  the essential points - saving you hours of viewing time.
                </p>
                <h2 className="text-gray-900">How It Works</h2>
                <ol>
                  <li>Upload your video or paste a URL</li>
                  <li>Our system processes the content</li>
                  <li>Receive a transcript and summary</li>
                  <li>Save, share, or integrate with your workflow</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose LightScript
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <ProcessCard 
                  key={index}
                  step={index + 1}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Technology
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powered by Advanced AI
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              LightScript combines cutting-edge speech recognition with natural language processing to deliver the most accurate summaries.
            </p>
          </div>

          <div className="mt-10 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              We leverage transformer-based models specifically fine-tuned for summarization tasks. 
              Our system doesn't just transcribe - it understands context, identifies key concepts, 
              and presents them in a coherent, condensed format.
            </p>
            <p>
              The technology is continuously improved through machine learning, with each processed 
              video helping to enhance our algorithms' accuracy and comprehension capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}