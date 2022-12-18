export interface StoryObject {
  key?: string;
  userId?: string;
  username: string;
  avatar: string;
}

export function StoryCreator(
  userId: string,
  username: string,
  avatar: string
): StoryObject {
  return {
    userId,
    username,
    avatar,
  };
}

export type StoriesTuble = StoryObject[];

//// post interface

type commentDocument = {
  username: string;
  comment: string;
};

export interface PostDocument {
  id: string;
  username: string;
  profilePic?: any;
  postPhoto?: any;
  caption: string;
  comments?: commentDocument[];
  timestamp?: any;
  likes: number;
  likedUsers: string[];
}

export type TPosts = PostDocument[];

//Suggestions

export interface Suggestion {
  id: string;
  username: string;
  profilePhoto: any;
}

export type suggestionTuble = Suggestion[];

export const SuggestionCreator = (
  id: string,
  username: string,
  profilePhoto: any
): Suggestion => {
  return {
    id,
    username,
    profilePhoto,
  };
};

///login - signup objects

export type TformValues = {
  fullname: string;

  email: string;
  password: string;
  passwordConfirm?: string;
};

///USER

export interface userState {
  displayName: string;
  photoURL: string;
  email: string;
  status: boolean;
  uid: string;
}

export function RandomUserCreator(
  displayName: string,
  fakeImage: string,
  uid: string
): userState {
  return {
    displayName: displayName,
    uid: uid,
    email: 'guest',
    photoURL: fakeImage,
    status: true,
  };
}
