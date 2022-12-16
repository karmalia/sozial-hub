import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db, storage } from './firebase/firebase';

const postsCollection = collection(db, 'posts');

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(postsCollection);
          let postData = [];

          querySnapshot?.forEach((doc) => {
            postData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: postData };
        } catch (error) {
          return { data: error };
        }
      },
      transformResponse: (res) => res.sort((a, b) => a.timestamp - b.timestamp),
      providesTags: ['posts'],
    }),
    addPost: builder.mutation({
      async queryFn(post) {
        console.log('Mutasyona gelen post: ', post);
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
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = firebaseApi;
