import { HiOutlineMicrophone, HiOutlineLightBulb, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const features = [
  {
    title: 'Accurate Transcriptions',
    description:
      'Orato provides high-quality transcriptions in multiple languages, ensuring every word is captured with precision.',
    icon: HiOutlineMicrophone,
  },
  {
    title: 'Intelligent Querying',
    description:
      'Search through your transcriptions effortlessly with context-aware querying powered by AI.',
    icon: HiOutlineMagnifyingGlass,
  },
  {
    title: 'Real-Time Insights',
    description: 'Get instant feedback and insights as you record or upload audio.',
    icon: HiOutlineLightBulb,
  },
];

function FeaturesSection() {
  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='font-inter font-semibold text-3xl text-gray-900 text-center mb-12'>
          Why Choose Orato?
        </h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white p-6 rounded-lg shadow-md'>
              <feature.icon className='w-12 h-12 text-blue-600 mb-4' />
              <h3 className='font-roboto font-bold text-xl text-gray-800 mb-2'>{feature.title}</h3>
              <p className='font-roboto text-gray-600 leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
