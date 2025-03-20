import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const NavBar = () => {
  const [isClient, setIsClient] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10 large:hidden desktop:hidden xtraLarge:hidden">
      {isClient && (
        <Image
          src={resolvedTheme === 'dark' ? '/logo-white.png' : '/logo-black.png'}
          alt="logo"
          width={130}
          height={130}
          priority
          className="mx-auto"
        />
      )}
    </div>
  );
};

export default NavBar;
