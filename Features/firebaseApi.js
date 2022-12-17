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

import { db, storage } from './firebase/firebase';

const postsCollection = collection(db, 'posts');
const q = query(postsCollection, orderBy('timestamp', 'desc'));

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(q);
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
              likedUsers: [...likedUsers.filter((id) => id !== USER_ID)],
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
