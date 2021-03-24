import styled from '@emotion/styled';

import Avatar from '../Avatar';
import GradientButton from '../GradientButton';
import Logo from '../Logo';
import SearchBar from '../SearchBar';

export const BaseNavbar = styled.nav`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-flow: row nowrap;
  box-shadow: ${(props) => props.theme.shadows.Navbar};
  background-color: ${(props) => props.theme.colors.background};
  backdrop-filter: saturate(180%) blur(5px);
  height: 3.5rem;
  z-index: ${(props) => props.theme.zIndices.Navbar};
`;

export const NavBrand = styled.a`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
`;

export const NavbarCollapse = styled.div`
  flex-basis: 100%;
  flex-grow: 1;
`;

export const LeftNavCollapse = styled(NavbarCollapse)`
  flex-grow: 0;
  flex-basis: auto;
`;

export const RightNavCollapse = styled(NavbarCollapse)`
  flex-grow: 0;
`;

export const NavbarNav = styled.div`
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`;

export const NavItem = styled.li`
  text-decoration: none;
`;

export const NavLogo = styled(Logo)`
  margin-left: 1rem;
  margin-right: 0.3rem;
  margin-top: 0.3rem;
`;

export const NavSearchBar = styled(SearchBar)`
  margin-left: auto;
  margin-right: 0.5rem;
`;

export const LoginButton = styled(GradientButton)`
  border-radius: ${(props) => props.theme.radii.default};
  margin-right: 1rem;
  height: 100%;
`;

export const NavbarAvatar = styled(Avatar)`
  & > div {
    border-radius: 50%;
  }
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 1.25rem;
  margin-right: 1.75rem;
`;

export const GreyText = styled.h5`
  color: ${(props) => props.theme.colors.muted};
  font-weight: 400;
  padding: 0;
  margin: 0;
`;
