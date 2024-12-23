import './globals.css';
import { Inter, Poppins, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Orato - Turn Words into Insights',
  description: 'Seamlessly transcribe and query your audio files with Orato.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${poppins.variable} ${roboto.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
