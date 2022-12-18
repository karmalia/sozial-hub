import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import styles from './Stories.module.scss';
import { StoriesTuble, StoryCreator } from '../../../Interfaces/interfaces';
import Story from './Story/Story';

//fakerjs: To create random fake stories.

function Stories() {
  //StoriesTuble will only accept objects that has Story interface
  const [stories, setStories] = useState<StoriesTuble>([]);

  useEffect(() => {
    //creates 30 random person
    setStories(
      [...Array(30)].map((profile: any) => {
        return StoryCreator(
          faker.datatype.uuid(),
          faker.internet.userName(),
          faker.image.avatar()
        );
      })
    );
  }, []);

  return (
    <div className={styles.storiesContainer}>
      {stories?.map((profile, index) => {
        return (
          <Story
            username={profile.username}
            avatar={profile.avatar}
            key={profile.userId}
          />
        );
      })}
    </div>
  );
}

export default Stories;
