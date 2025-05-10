import { CheckIcon, BoltIcon, ChartBarIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export const metadata = {
  title: 'Our Services - LightScript',
  description: 'Explore our video-to-text services with transparent pricing and clear roadmaps',
};

const services = [
  {
    name: 'Basic Transcription',
    description: 'Accurate text conversion from your video/audio files',
    features: [
      'Up to 60 minutes of content',
      '90%+ accuracy guarantee',
      'Standard turnaround (24-48 hrs)',
      'Text-only output'
    ],
    price: '$0.10/minute',
    popular: false
  },
  {
    name: 'Advanced Summary',
    description: 'AI-powered summaries of your video content',
    features: [
      'Up to 120 minutes of content',
      'Key point extraction',
      'Bullet-point summaries',
      '12-24 hour turnaround',
      'Highlight timestamps'
    ],
    price: '$0.25/minute',
    popular: true
  },
  {
    name: 'Enterprise Solution',
    description: 'Custom solutions for large-scale needs',
    features: [
      'Unlimited content length',
      '98%+ accuracy guarantee',
      'Multiple speaker identification',
      'Custom summary formats',
      'API access available',
      'Priority support'
    ],
    price: 'Custom pricing',
    popular: false
  }
];

const roadmap = [
  {
    name: 'Q3 2023',
    description: 'Launch core transcription engine',
    status: 'complete',
    features: ['Basic transcription', 'Web interface']
  },
  {
    name: 'Q4 2023',
    description: 'Enhance accuracy and add features',
    status: 'complete',
    features: ['Speaker identification', 'Summary generation']
  },
  {
    name: 'Q1 2024',
    description: 'Expand platform capabilities',
    status: 'current',
    features: ['API access', 'Bulk processing']
  },
  {
    name: 'Q2 2024',
    description: 'Advanced analytics dashboard',
    status: 'upcoming',
    features: ['Sentiment analysis', 'Content insights']
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-indigo-700 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-200">
              Professional video-to-text solutions tailored to your needs
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Simple, transparent pricing
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Choose the perfect plan for your video processing needs
          </p>
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {services.map((service, serviceIdx) => (
              <div
                key={service.name}
                className={classNames(
                  service.popular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 xl:p-10'
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={service.name}
                    className={classNames(
                      service.popular ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {service.name}
                  </h3>
                  {service.popular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{service.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {service.price.split('/')[0]}
                  </span>
                  {service.price.includes('/') && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      {service.price.split('/')[1]}
                    </span>
                  )}
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Development Roadmap
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-gray-600">
              See what we've built and where we're heading next
            </p>
            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-4">
              {roadmap.map((item) => (
                <div
                  key={item.name}
                  className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <div className="flex items-center">
                    {item.status === 'complete' && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                      </span>
                    )}
                    {item.status === 'current' && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                        <BoltIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                      </span>
                    )}
                    {item.status === 'upcoming' && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <ClockIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                      </span>
                    )}
                    <h3 className="ml-3 text-lg font-semibold leading-6 text-gray-900">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-base text-gray-600">{item.description}</p>
                  <ul role="list" className="mt-6 space-y-3">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex">
                        <CheckIcon
                          className="h-5 w-5 flex-none text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Feature Comparison
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See how our services stack up against each other
            </p>
          </div>
          <div className="mt-16 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Feature
                      </th>
                      {services.map((service) => (
                        <th
                          key={service.name}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {service.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Max Duration
                      </td>
                      {services.map((service) => (
                        <td
                          key={service.name}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {service.features.find(f => f.includes('minutes')) || 'Custom'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Accuracy
                      </td>
                      {services.map((service) => (
                        <td
                          key={service.name}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {service.features.find(f => f.includes('%')) || 'Premium'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        Output Format
                      </td>
                      {services.map((service) => (
                        <td
                          key={service.name}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {service.features.find(f => f.includes('output') || 'Multiple')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}