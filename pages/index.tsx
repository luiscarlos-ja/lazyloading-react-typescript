import { useState } from "react";
import type { MouseEventHandler } from "react";
import type { NextPage } from "next";
import Head from "next/head";

// Ejemplo utilizando una librería sin tipos.
// Realmente no hace falta su uso.
import { random } from "lodash";

import { LazyImage } from "@/components/RandomFox";

// generate simple unique id
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// random number from 1 to 122
const myRandom = () => random(1, 122);

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const id = generateId();
    const url = `https://randomfox.ca/images/${myRandom()}.jpg`;
    setImages([...images, { id, url }]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>
          React with TypeScript 🦑
        </title>
        <meta
          name="description"
          content="React con TypeScript para crear un componente genérico para cargar imágenes con lazy loading."
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦊</text></svg>"
        />
      </Head>

      <main className="text-center">
        <PageContent />
        <div className="m-4">
          <button
            onClick={addNewFox}
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Adding a new Fox
          </button>
        </div>
        {images.map(({ id, url }, index) => (
          <div className="p-4" key={id}>
            <LazyImage
              src={url}
              width="320"
              height="auto"
              className="mx-auto rounded-md bg-gray-300"
              onClick={() => {
                console.log("holi!");
              }}
              onLazyLoad={(img) => {
                console.log(`Image #${index + 1} cargada. Nodo:`, img);
              }}
            />
          </div>
        ))}
      </main>

      <footer className="text-center mt-auto p-6 text-sm text-gray-500">
        <p>
          Images from{" "}
          <a href="https://randomfox.ca" target="_blank" rel="noreferrer">
            randomfox.ca
          </a>{" "}
        </p>
      </footer>
    </div>
  );
};

function PageContent() {
  return (
    <div className="pt-10 pb-4 px-4 sm:px-6 lg:px-8">
      <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
        React with TypeScript
      </p>
      <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        Component Lazy Image
      </h3>
      <div className="max-w-xl mx-auto text-xl text-gray-500 leading-7">
        <p className="mt-4">
          Generic Component that loads images with lazy loading.
        </p>
        <p className="mt-4">✨✨</p>
        <p className="mt-4">
          Images added will not displayed until they are visible on the screen.
        </p>
        <p className="mt-4">✨✨</p>
      </div>
    </div>
  );
}

export default Home;
