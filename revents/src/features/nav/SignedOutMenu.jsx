import { openModal } from '../../app/common/modals/modalReducer';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
export default function SignedOutMenu({ setAuthenticated }) {
  const dispatch = useDispatch();
  return (
    <>
      <Menu.Item position="right">
        <Button
          onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
          basic
          inverted
          content="Login"
        />
        <Button
          basic
          inverted
          content="Register"
          style={{ marginLeft: '0.5em' }}
        />
      </Menu.Item>
    </>
  );
}
