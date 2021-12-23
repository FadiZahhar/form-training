import {
  followUser,
  unfollowUser,
} from '../../../app/firestore/firestoreService';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Segment,
  Grid,
  Item,
  Header,
  Statistic,
  Divider,
  Reveal,
  Button,
} from 'semantic-ui-react';

export default function ProfileHeader({ profile, isCurrentUser }) {
  const [loading, setLoading] = useState(false);

  async function handleFollowUser() {
    setLoading(true);
    try {
      await followUser(profile);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleunFollowUser() {
    setLoading(true);
    try {
      await unfollowUser(profile);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign="middle">
                <Header
                  as="h1"
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label="Followers" value={profile.followerCount || 0} />
            <Statistic label="Following" value={profile.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated="move">
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button fluid color="teal" content="Following" />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button
                    basic
                    fluid
                    color="green"
                    content="Follow"
                    onClick={handleFollowUser}
                    loading={loading}
                  />
                </Reveal.Content>
              </Reveal>
              <Button
                basic
                fluid
                color="red"
                content="unFollow"
                onClick={handleunFollowUser}
                loading={loading}
              />
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
