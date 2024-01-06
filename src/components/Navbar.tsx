'use client';
import React from 'react';
import { Layout } from 'antd';
import Image from 'next/image';
import UserAvatar from './UserAvatar';

const Navbar: React.FC = () => {
  const { Header } = Layout;
  return (
    <Header className="header-bg fixed-top">
      <div className="container-fluid d-flex justify-content-between">
        <div className='my-auto'>
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={500}
            height={500}
            style={{ width: '50px', height: 'auto' }}
          />
        </div>

        <div>
          <UserAvatar />
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
