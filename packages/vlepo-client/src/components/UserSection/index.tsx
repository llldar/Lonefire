import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Dropdown from 'src/components/Dropdown';
import { NavItem } from 'src/components/Navbar/style';
import NavLink from 'src/components/NavLink';
import { deleteCookie } from 'src/hooks/useCookie';
import { CurrentUserContext } from 'src/pages/_app';

import { Dashboard, Logout, Settings } from '@emotion-icons/material-outlined';
import { OAuthConsts } from '@vlepo/shared';

import { GreyText, LoginButton, NavbarAvatar } from './style';

type UserSectionProps = {
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserSection = (props: UserSectionProps) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { setShowLoginModal } = props;
  const router = useRouter();

  return (
    <>
      {currentUser ? (
        <Dropdown variant="right" mt="12px">
          <NavbarAvatar
            size={32}
            imageUrl={currentUser.profileImageUrl ?? '/images/avatar/bot.svg'}
          />
          <NavLink
            active={router.pathname.split('/').slice(-1)[0] === 'profile'}
            href={`/user/${currentUser.id}/profile`}
          >
            <NavItem>
              {currentUser.name}
              <GreyText>{currentUser.roles}</GreyText>
            </NavItem>
          </NavLink>
          <NavLink
            active={router.pathname.split('/').slice(-1)[0] === 'settings'}
            href={`/user/${currentUser.id}/settings`}
          >
            <NavItem>
              <Settings size={24} /> Settings
            </NavItem>
          </NavLink>
          {currentUser.roles.includes(OAuthConsts.roles.admin.value) && (
            <NavLink active={router.pathname.split('/')[1] === 'dashboard'} href="/dashboard/blog">
              <NavItem>
                <Dashboard size={24} /> Dashboard
              </NavItem>
            </NavLink>
          )}
          <NavLink
            onClick={() => {
              deleteCookie('idToken');
              deleteCookie('accessToken');
              deleteCookie('idToken.sig');
              deleteCookie('accessToken.sig');
              router.reload();
            }}
          >
            <NavItem>
              <Logout size={24} /> Logout
            </NavItem>
          </NavLink>
        </Dropdown>
      ) : (
        <LoginButton onClick={() => setShowLoginModal(true)}>Login</LoginButton>
      )}
    </>
  );
};

export default UserSection;
