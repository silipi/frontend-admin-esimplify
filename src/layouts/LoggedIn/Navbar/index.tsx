import { Navbar as NavbarMantine, Stack } from '@mantine/core';
import {
  MdExitToApp,
  MdAccountBox,
  MdHome,
  MdLocalGroceryStore,
} from 'react-icons/md';
import { FaTruckLoading } from 'react-icons/fa';
import NavbarLink from './NavbarLink';
import { useNavbar } from '@/hooks';
import { methods } from '@/services/API';

const links = [
  { icon: MdHome, label: 'Início', path: '/', exact: true },
  { icon: MdLocalGroceryStore, label: 'Produtos', path: '/products' },
  { icon: FaTruckLoading, label: 'Fornecedores', path: '/providers' },
];

const Navbar = () => {
  const [active, onClick] = useNavbar(links);
  const {
    auth: { logout },
  } = methods();

  return (
    <NavbarMantine width={{ base: 80 }} p="md">
      <NavbarMantine.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links.map((link, index) => (
            <NavbarLink
              {...link}
              key={link.label}
              active={index === active}
              onClick={() => onClick(index)}
            />
          ))}
        </Stack>
      </NavbarMantine.Section>
      <NavbarMantine.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={MdAccountBox} label="Change account" />
          <NavbarLink icon={MdExitToApp} label="Logout" onClick={logout} />
        </Stack>
      </NavbarMantine.Section>
    </NavbarMantine>
  );
};

export default Navbar;
