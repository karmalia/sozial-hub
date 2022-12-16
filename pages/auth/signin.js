import { app } from '../../Features/firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();

  const Firebase_Auth = getAuth(app);
  const Firebase_Provider = new GoogleAuthProvider();

  //providers : [...nextAuth].js > providers

  async function loginFunc() {
    const { user } = await signInWithPopup(Firebase_Auth, Firebase_Provider);
    const { refreshToken, providerData } = user;

    localStorage.setItem('user', JSON.stringify(providerData));
    localStorage.setItem('accessToken', JSON.stringify(refreshToken));

    router.push('/');
  }

  //signIn takes second object argument to redirect after login

  return (
    <div>
      <button onClick={() => loginFunc()}>Sign in with</button>
    </div>
  );
}
