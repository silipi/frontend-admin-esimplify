import styled from '@emotion/styled';

export const Container = styled.div``;

type ImageProps = {
  src: string;
  isDeleted?: boolean;
};

export const Image = styled.div<ImageProps>`
  width: 150px;
  height: 100px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: 4px;

  ${({ isDeleted }) =>
    isDeleted &&
    `
    opacity: 0.5;
  `}
`;

export const ImagesContainer = styled.div`
  display: flex;

  & > div {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  margin-bottom: 12px;
`;

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;

  & > button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
`;
