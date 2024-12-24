import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='bg-white py-20 md:py-32 flex items-center justify-center min-h-[75vh]'>
      <div className='container mx-auto px-4 text-center'>
        <h1 className='font-inter font-bold text-4xl md:text-5xl text-gray-900 leading-tight mb-6'>
          Turn Words into Insights
        </h1>
        <p className='font-roboto text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto'>
          Seamlessly transcribe and query your audio files with Orato.
        </p>
        <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
          <Link
            href='/'
            className='font-poppins font-semibold text-lg px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300'
          >
            Get Started
          </Link>
          <Link
            href='/'
            className='font-poppins font-medium text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300'
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
