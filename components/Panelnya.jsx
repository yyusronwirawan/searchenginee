import Image from 'next/image';
import { useState } from 'react';
import Karya from './Karya';

export default function Panel({ panel }) {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="card flex w-full flex-col md:border rounded-md md:border-slate-300 pt-3 md:p-5 pb-4 border-b-2 border-slate-100">
          <div className="card-header w-full">
            <h2 className="tittle text-3xl text-black">{panel.title}</h2>
            <p className="text-sm text-slate-500">{panel.type}</p>
          </div>
          <div className="card-body mt-2 w-full">
            <div className="flex flex-row gap-1 overflow-x-scroll scrollbar-hide">
              {panel.images &&
                panel.images.map((a, i) => {
                  return (
                    <div key={i}>
                      <div key={i} className="image h-24  w-2/3">
                        <Image
                          src={a.url}
                          width="100"
                          height="100"
                          layout="fixed"
                          alt="images"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="description mt-2">
              <p className="text-xs">
                {panel.description !== 'N/A' && panel.description}
              </p>
              <div className="flex flex-col gap-1 mt-3">
                {panel.metadata?.map((a, i) => {
                  if (a !== undefined) {
                    return (
                      <p key={i} className="text-xs text-black">
                        <span className="font-semibold capitalize">
                          {a.title}: {''}
                        </span>
                        {a.value}
                      </p>
                    );
                  }
                })}

                {panel.ratings.length > 0 && (
                  <p className="text-sm py-2">
                    <span className="font-semibold">Rating: </span>
                    {panel.ratings[0]?.rating}
                  </p>
                )}

                {panel.lyrics?.length > 0 && (
                  <div
                    className={`${
                      seeMore ? 'h-full' : 'h-48'
                    } overflow-hidden relative`}
                  >
                    <div className="h-10 w-full bg-white/60 absolute bottom-0 left-0 right-0 text-center">
                      <button
                        type="button"
                        className="bg-blue-500 rounded-full text-xs text-white px-2 py-1 mt-4 shadow-lg"
                        onClick={() => setSeeMore((prev) => !prev)}
                      >
                        See More
                      </button>
                    </div>
                    <p className="text-sm py-2 whitespace-pre-line">
                      {panel.lyrics}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Karya
            karya={
              panel.tv_shows_and_movies.length > 0
                ? panel.tv_shows_and_movies
                : panel.books.length > 0
                ? panel.books
                : panel.songs.length > 0
                ? panel.songs
                : []
            }
          />
        </div>
      </div>
    </>
  );
}
