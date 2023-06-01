import { useRouter } from 'next/navigation';
import useUser from '../../lib/useUser'
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter();
  const { user } = useUser({});

  useEffect(() => {
    if (user === undefined || user.isLoggedIn === false) {
      router.replace('/dashboard/login')
    }
  
  }, [user, router])

  return (
    <div>Home</div>
  );
}