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
  comments: commentDocument[];
}
