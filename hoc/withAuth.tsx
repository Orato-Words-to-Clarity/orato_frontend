'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    }, []);

    if (loading)
      return (
        <div className='min-h-screen w-full flex items-center justify-center'>
          <HashLoader color='black' size={50} />
        </div>
      );

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
