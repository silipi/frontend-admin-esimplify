import styled from '@emotion/styled';
import {
  createPolymorphicComponent,
  Paper,
  PaperProps,
  Title as MantineTitle,
} from '@mantine/core';

export const Header = styled.div`
  display: flex;
  column-gap: 1rem;

  & > * {
    flex: 1;
  }
`;

export const Section = styled.section`
  display: flex;
  column-gap: 1rem;

  & > * {
    flex: 1;
  }
`;

export const Attributes = styled.div`
  & > div.body {
    display: flex;

    & > * {
      margin-right: 24px;
    }
  }
`;

const StyledProvider = styled(Paper)`
  .row {
    display: flex;
    column-gap: 1rem;
  }
`;

export const Provider = createPolymorphicComponent<'div', PaperProps>(
  StyledProvider,
);

export const Title = styled(MantineTitle)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

export const Color = styled.div`
  display: inline-block;
  margin-left: 1rem;
  width: 48px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ color }: { color: string }) => color};
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
`;

export const ImagesContainer = styled.div`
  display: flex;

  & > div {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
