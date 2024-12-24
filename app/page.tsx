import FeaturesSection from './components/FeaturesSection';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
