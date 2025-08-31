'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { notesApi } from '@/lib/api/notes';
import css from './TagsMenu.module.css';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: notesApi.getTags,
  });

  return (
    <div className={css.menuContainer}>
      <button 
        className={css.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link 
              href="/notes/filter/All" 
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              All notes
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category} className={css.menuItem}>
              <Link 
                href={`/notes/filter/${category}`} 
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

