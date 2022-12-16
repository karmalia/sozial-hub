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

import v4 from 'uuid';

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
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ['posts'],
    }),
    addPost: builder.mutation({
      async queryFn(post) {
        let customId = v4();

        try {
          await setDoc(doc(db, 'posts', customId), {
            id: customId,
            ...post,
            timestamp: serverTimestamp(),
          });

          return { data: 'Success!' };
        } catch (error) {
          return { data: 'Error' };
        }
      },
      invalidatesTags: ['posts'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = firebaseApi;
