import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={(theme) => css`
      html,
      body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        text-align: left;
        font-family: ${theme.fonts.content};
      }
      *,
      ::after,
      ::before {
        box-sizing: border-box;
      }
      *:focus {
        outline: none;
      }
      #__next {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        width: 100%;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      textarea:-webkit-autofill,
      textarea:-webkit-autofill:hover,
      textarea:-webkit-autofill:focus,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus {
        appearance: none;
        color: ${theme.colors.background} !important;
        background-color: ${theme.colors.background} !important;
      }
    `}
  />
);

export const animations = {};

export const spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
`;
