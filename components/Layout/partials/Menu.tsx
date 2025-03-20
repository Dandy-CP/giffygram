import React from 'react';
import Link from 'next/link';
import { IconProps, Icon } from '@tabler/icons-react';

interface MenuProps {
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  link: string;
}

const Menu = ({ label, link, Icon }: MenuProps) => {
  return (
    <Link
      href={link}
      className="flex flex-row gap-3 items-center hover:dark:bg-gray-600 hover:bg-slate-200 w-full rounded-lg p-2"
    >
      <Icon size={30} />
      <p className="font-semibold">{label}</p>
    </Link>
  );
};

export default Menu;
