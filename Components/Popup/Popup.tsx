import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Features/hooks';
import {
  selectOpenStatus,
  CHANGE_POPUP_STATE,
} from '../../Features/uploadSlice';

import { db, storage } from '../../Features/firebase/firebase';

import media from '../../public/assets/media.png';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { useAddPostMutation } from '../../Features/firebaseApi';
import { PostDocument } from '../../Interfaces/interfaces';
import { selectUserStatus } from '../../Features/userSlice';
export default function Popup() {
  let currentPopupStatus = useAppSelector(selectOpenStatus);
  const userDetails = useAppSelector(selectUserStatus);
  const [file, setFile] = useState<null | File>(null);
  const [post, setPost] = useState<PostDocument>({
    id: '',
    username: 'string',
    likes: 0,
    caption: '',
    likedUsers: [],
  });
  const [addPost] = useAddPostMutation();

  const [progress, setProgress] = useState<Boolean>(false);

  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(CHANGE_POPUP_STATE(false));
  }

  function uploadPost() {
    console.log('Yollanan post: ', post);

    addPost(post);
    dispatch(CHANGE_POPUP_STATE(false));
  }

  useEffect(() => {
    async function uploadFile() {
      if (!file) return;

      if (userDetails.displayName) {
        setProgress(true);
        const storageRef = ref(
          storage,
          `postImages/${userDetails?.displayName}/${file.name}`
        );

        const snapshot = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setProgress(false);

        setPost({
          id: '',
          username: userDetails.displayName,
          profilePic: userDetails.photoURL ?? 'null',
          caption: '',
          postPhoto: downloadURL,
          comments: [],
          likes: 0,
          likedUsers: [],
        });
        console.log('current storage Ref: ', storageRef);
      } else {
        alert('you have to login first');
      }
    }

    file && uploadFile();
  }, [file]);

  //create a data post and add it to the collection

  return (
    <>
      <Transition appear show={currentPopupStatus} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='flex flex-col justify-between items-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all '>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Create New Post
                  </Dialog.Title>

                  <div className='flex items-center w-40 h-40 hover:scale-75 ease-in duration-300  cursor-pointer'>
                    <label
                      htmlFor='postImage'
                      className='block w-40 h-40 absolute z-10 cursor-pointer'
                    ></label>
                    <input
                      id='postImage'
                      name='postImage'
                      className='hidden '
                      type='file'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0] as File);
                        }
                      }}
                    />
                    <Image
                      className='cursor:pointer'
                      src={media}
                      alt='Upload image input'
                    />
                  </div>

                  <div className='mt-2'>
                    <input
                      className='text-sm outline-0 '
                      type='text'
                      placeholder='Please enter a caption'
                      value={post.caption}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPost((prev) => ({
                          ...prev,
                          caption: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-sky-200 px-4 py-2 text-sm font-medium text-dark hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:bg-slate-100'
                      onClick={() => uploadPost()}
                      disabled={progress ? true : false}
                    >
                      {progress ? 'loading' : 'Upload Post'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
