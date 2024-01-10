import logo from "../public/winz-logo.png";
import matrixBackground from "../public/matrix.png";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

export default function App() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /* ALTERE O VALOR 330 (5 min e 30) PARA OS SEGUNDOS EM QUE AS SEÇÕES VÃO APARECER */
    const SECONDS_TO_DISPLAY = 330;

    /* DAQUI PARA BAIXO NAO PRECISA ALTERAR */
    let attempts = 0;
    let elsDisplayed = false;
    const alreadyDisplayedKey = `alreadyElsDisplayedVSLOF2024${SECONDS_TO_DISPLAY}`
    const alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

    const showHiddenElements = function () {
      elsDisplayed = true;
      setIsVisible(true);
      localStorage.setItem(alreadyDisplayedKey, true)
    }

    const startWatchVideoProgress = function () {
      if (typeof smartplayer === 'undefined' || !(smartplayer.instances && smartplayer.instances.length)) {
        if (attempts >= 10) return;
        attempts += 1;
        return setTimeout(function () { startWatchVideoProgress() }, 1000);
      }

      smartplayer.instances[0].on('timeupdate', () => {
        if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
        if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY) return;
        showHiddenElements();
      })
    }


    if (alreadyElsDisplayed === 'true') {
      setTimeout(function () { showHiddenElements(); }, 100);
    } else {
      startWatchVideoProgress()
    }
  }, [])

  return (
    <main>
      <div className="bg-red-600 text-xl p-1 text-center font-bold">
        Essa oferta sai do ar hoje, dia 10/01/2024
      </div>
      <header className="flex justify-center" style={{ position: 'relative' }}>
        <div style={{ background: `url(${matrixBackground})`, opacity: 0.2, width: '100%', height: '100%', position: 'absolute', backgroundRepeat: 'no-repeat' }}></div>
        <div className="p-6">
          <img width={90} src={logo} alt="Logo" />
        </div>
      </header>

      <h1 className="text-center text-2xl font-extrabold px-4 pb-2">
        GANHE <span className="text-yellow-500">20K POR MÊS</span> AGENCIANDO GAROTAS NO <span className="text-orange-400">ONLYFANS</span> <span className="text-red-600">EM 90 DIAS</span> OU MENOS
      </h1>

      <div className="mt-4 rounded-lg  mb-6 mx-8">
        <div dangerouslySetInnerHTML={{ __html: '<div id="vid_659dd6d2c8f0d7000af0b837" style="position:relative;width:100%;padding: 178.21782178217822% 0 0;"><img id="thumb_659dd6d2c8f0d7000af0b837" src="https://images.converteai.net/f1d1c45e-e3a4-4b36-af40-ed5737930f25/players/659dd6d2c8f0d7000af0b837/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"><div id="backdrop_659dd6d2c8f0d7000af0b837" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div></div>' }} />
        <Helmet>
          <script type="text/javascript" id="scr_659dd6d2c8f0d7000af0b837">var s=document.createElement("script");s.src="https://scripts.converteai.net/f1d1c45e-e3a4-4b36-af40-ed5737930f25/players/659dd6d2c8f0d7000af0b837/player.js",s.async=!0,document.head.appendChild(s);</script>
        </Helmet>
      </div>

      <div className="flex justify-center text-center pb-6 font-bold px-6 text-lg ">
        Assista até o final para liberar acesso.
      </div>


      {isVisible && (
        <a href="https://pay.kiwify.com.br/KQ1e0T4">
          <div className="flex justify-center px-6">
            <button className="bg-green-700 p-4 w-full font-bold text-2xl rounded-md">
              PARTICIPAR DO TREINAMENTO
            </button>
          </div>
        </a>
      )}

      <footer className=" text-white p-4 mb-10 mt-4 text-center">
        <div className="container mx-auto">
          <p className="text-sm">
            &copy; 2023 Treinamento Winz. Todos os direitos reservados.
          </p>
          <p className="text-xs mt-2">
            Desenvolvido com <span role="img" aria-label="Heart">❤️</span> por Você
          </p>
        </div>
      </footer>
    </main>
  );
}
