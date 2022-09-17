import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import logoImg from './assets/logo-nlw-esports.svg';

import './styles/main.css';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data);
      })
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img
        src={logoImg}
        alt="Logo NLW eSports"
      />

      <h1 className="text-6xl text-white font-black mt-20 mx-6">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text ">duo</span> está aqui.
      </h1>

        {
          games.length ?
          // <div className="grid grid-cols-6 gap-6 mt-16">
          <div className={`grid grid-cols-3 gap-6 mt-16 mx-6 md:grid-cols-6 xl:mx-0`}>
            {
              games.map(game => {
                return (
                  <GameBanner
                    key={game.id}
                    bannerUrl={game.bannerUrl}
                    title={game.title}
                    adsCount={game._count.ads}
                  />
                )
                }
              )
            }
          </div>
           :
          <span className='mt-8 text-2xl text-white'>Sem jogos cadastrados até o momento 😢</span>
      }

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App;
