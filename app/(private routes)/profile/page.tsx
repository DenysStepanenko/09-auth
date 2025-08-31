'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { userApi } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await userApi.getMe();
        setProfileUser(userData);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const displayUser = profileUser || user;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={displayUser?.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {displayUser?.username || 'Not set'}
          </p>
          <p>
            Email: {displayUser?.email || 'Not available'}
          </p>
        </div>
      </div>
    </main>
  );
}

