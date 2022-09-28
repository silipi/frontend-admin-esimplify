import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  icon: any;
  label: string;
  path: string;
  exact?: boolean;
}

const useNavbar = (links: Props[]) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const index = links.findIndex((link) => {
      if (link.exact) {
        return location.pathname === link.path;
      }

      return location.pathname.startsWith(link.path);
    });
    setActive(index);
  }, [location.pathname]);

  const onClick = (index: number) => {
    setActive(index);
    navigate(links[index].path);
  };

  return [active, onClick] as const;
};

export default useNavbar;
