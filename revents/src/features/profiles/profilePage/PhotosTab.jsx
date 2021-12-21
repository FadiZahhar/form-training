import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import React, { useState } from 'react';
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserPhotos } from '../../../app/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { listentoUserPhotos } from '../profileAction';

export default function PhotosTab({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listentoUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Photos`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button basic color="green" content="Main" />
                    <Button basic color="red" icon="trash" />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
