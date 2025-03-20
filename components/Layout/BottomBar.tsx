import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconHome, IconCompass, IconCategory } from '@tabler/icons-react';

const BottomBar = () => {
  const router = useRouter();
  const path = router.pathname;

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

  return (
    <div className="dock desktop:hidden large:hidden xtraLarge:hidden">
      {menu.map((value) => (
        <Link
          key={value.label}
          href={value.link}
          className={path === value.link ? 'dock-active' : ''}
        >
          <value.Icon size={25} />
          <span className="dock-label">{value.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;
