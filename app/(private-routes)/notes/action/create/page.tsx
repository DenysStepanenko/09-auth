import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Создать заметку | NoteHub',
  description: 'Создайте новую заметку в NoteHub. Добавьте заголовок, содержание и выберите категорию для вашей заметки.',
  openGraph: {
    title: 'Создать заметку | NoteHub',
    description: 'Создайте новую заметку в NoteHub. Добавьте заголовок, содержание и выберите категорию для вашей заметки.',
    url: 'https://notehub.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Создать заметку',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

