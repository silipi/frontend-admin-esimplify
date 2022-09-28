import { Tooltip, UnstyledButton } from '@mantine/core';
import { IconType } from 'react-icons';
import useStyles from './styles';

interface NavbarLinkProps {
  icon: IconType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavbarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size={22} />
      </UnstyledButton>
    </Tooltip>
  );
};

NavbarLink.defaultProps = {
  active: false,
  onClick: () => {},
};

export default NavbarLink;
