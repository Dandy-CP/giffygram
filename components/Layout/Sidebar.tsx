import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconHome, IconCompass, IconCategory } from '@tabler/icons-react';
import Menu from './partials/Menu';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const [isClient, setIsClient] = useState(false);
  const { resolvedTheme } = useTheme();

  const menu = [
    {
      Icon: IconHome,
      label: 'Home',
      link: '/',
    },
    {
      Icon: IconCompass,
      label: 'Explore',
      link: '/explore',
    },
    {
      Icon: IconCategory,
      label: 'Categories',
      link: '/categories',
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="h-screen w-[300px] border-r-[0.3px] border-white p-4 sticky top-0 phone:hidden tablet:hidden phone-xs:hidden">
      {isClient && (
        <Image
          src={resolvedTheme === 'dark' ? '/logo-white.png' : '/logo-black.png'}
          alt="logo"
          width={130}
          height={130}
          priority
        />
      )}

      <div className="flex flex-col gap-5 mt-10">
        {menu.map((value) => (
          <Menu key={value.label} {...value} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
