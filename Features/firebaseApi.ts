import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

type CustomErrorType = { reason: 'Could not fetched' | 'too hot' };

import { db, storage } from './firebase/firebase';

const postsCollection = collection(db, 'posts');
const q = query(postsCollection, orderBy('timestamp', 'desc'));
import { PostDocument, TPosts } from '../Interfaces/interfaces';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery<CustomErrorType>(),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<TPosts, void>({
      async queryFn(arg) {
        try {
          const querySnapshot = await getDocs(q);
          let postData: TPosts = [];

          querySnapshot?.forEach((doc) => {
            postData.push({
              id: doc.id,
              caption: doc.data().caption,
              comments: doc.data().comments,
              username: doc.data().username,
              likedUsers: doc.data().likedUsers,
              likes: doc.data().likes,
              timestamp: doc.data().timestamp,
              postPhoto: doc.data().postPhoto,
              profilePic: doc.data().postPhoto,
            });
          });
          return { data: postData };
        } catch (error) {
          return { error: { reason: 'Could not fetched' } };
        }
      },

      providesTags: ['posts'],
    }),
    addPost: builder.mutation({
      async queryFn(post) {
        try {
          const docRef = await addDoc(collection(db, 'posts'), {
            ...post,
            timestamp: serverTimestamp(),
          });

          updateDoc(doc(db, 'posts', docRef.id), {
            id: docRef.id,
          });

          return { data: 'Success!' };
        } catch (error) {
          console.log('Yüklemede hata: ', error);
          return { data: 'Error' };
        }
      },
      invalidatesTags: ['posts'],
    }),
    handleLike: builder.mutation({
      async queryFn({ type, USER_ID, docId: id, likes, likedUsers }) {
        console.log('Gelenler: ', type, USER_ID, id);
        try {
          //decrease the number of likes by one and remove user's id from the array
          console.log('Gelen Bilgiler');
          console.log(type, USER_ID, id, likes, likedUsers);
          const postRef = doc(db, 'posts', id);

          if (type === 'decrease') {
            updateDoc(postRef, {
              likes: (likes -= 1),
              likedUsers: [
                ...likedUsers.filter((id: string) => id !== USER_ID),
              ],
            });
          }

          //increase the number of likes by one and add user's id into the array
          if (type === 'increase') {
            updateDoc(postRef, {
              likes: (likes += 1),
              likedUsers: [...likedUsers, USER_ID],
            });
          }

          return { data: 'Success!' };
        } catch (error) {
          console.log('Something went wrong: ', error);
          return { data: 'Error' };
        }
      },
      invalidatesTags: ['posts'],
    }),
    addComment: builder.mutation({
      async queryFn({ id, comment }) {
        try {
          //takes posts id and comment to add

          return { data: 'Success!' };
        } catch (error) {
          console.log('Something went wrong: ', error);
          return { data: 'Error' };
        }
      },
      invalidatesTags: ['posts'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useHandleLikeMutation } =
  firebaseApi;
