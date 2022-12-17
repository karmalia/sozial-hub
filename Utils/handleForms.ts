import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import { TformValues } from '../Interfaces/interfaces';

export async function handleSignUp(auth: any, formDocument: TformValues) {
  if (formDocument.password === formDocument.passwordConfirm) {
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        formDocument.email,
        formDocument.password
      );
      const update = await updateProfile(cred.user, {
        displayName: formDocument.fullname,
      });
      return 'Success';
    } catch (err) {
      console.log(err);

      return 'Error' + err;
    }
  }
}

export async function handleLogin(auth: any, formDocument: TformValues) {
  try {
    const response = signInWithEmailAndPassword(
      auth,
      formDocument.email,
      formDocument.password
    );
    const result = await response;
    if (result) {
      return 'Success';
    }
  } catch (error) {
    const regex: RegExp = /\(([^)]+)\)/;
    const match: RegExpMatchArray | null = error?.message?.match(regex);
    console.log(error?.message);

    if (match && match[0] === '(auth/wrong-password)') {
      console.log(match[0]);

      toast.error('Your password is wrong');
    }

    if (match && match[0] === '(auth/too-many-requests)') {
      console.log(match[0]);

      toast.error(
        'Access to this account has been temporarily disabled due to many failed login attempts.'
      );
    }
  }
}
