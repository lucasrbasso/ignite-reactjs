import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

import { Button } from './Button';

import '../styles/sidebar.scss'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar({ selectedGenreId, setSelectedGenreId }: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>WatchMe</span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => { handleClickButton(genre.id) }}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}