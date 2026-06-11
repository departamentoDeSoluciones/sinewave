import { useState, useEffect } from 'react';
import type { SinWaveConfig } from './types/wave'

const WIDTH: number = 800;
const HEIGHT: number = 600;


const defaulWave: SinWaveConfig = {
  amplitud: 100,
  frecuencia: 0.05,
  velocidad: 2 * Math.PI
};

const dibujarLineaCoordenada = (x1: number, y1: number, x2: number, y2: number) => {
  const mathX1: number = (WIDTH / 2) + x1;
  const mathY1: number = (HEIGHT / 2) - y1;
  const mathX2: number = (WIDTH / 2) + x2;
  const mathY2: number = (HEIGHT / 2) - y2;
  return (
    <line x1={mathX1} y1={mathY1} x2={mathX2} y2={mathY2} stroke="black"
      strokeWidth={1} />
  );
}
const DibujarPlano = () => {
  return (
    <>
      {dibujarLineaCoordenada(-WIDTH, 0, WIDTH, 0)}
      {dibujarLineaCoordenada(0, HEIGHT, 0, -HEIGHT)}
    </>
  );
};

const CalcularSin = ({ tiempo }: { tiempo: number }) => {
  const sinwave: SinWaveConfig = defaulWave;
  let coordenadasPath = "";

  // Iterar desde el extremo izquierdo hasta el extremo derecho del plano
  for (let x = -WIDTH / 2; x <= WIDTH / 2; x++) {
    // 1. Calcular matemática pura de la onda
    const y = sinwave.amplitud * Math.sin((sinwave.frecuencia * x) - (tiempo + sinwave.velocidad));

    // 2. Transformar a píxeles de pantalla (como lo hacías en tu función)
    const screenX = (WIDTH / 2) + x;
    const screenY = (HEIGHT / 2) - y;

    // 3. Armar el string de dibujo (M = inicio, L = trazo continuo)
    if (x === -WIDTH / 2) {
      coordenadasPath += `M ${screenX} ${screenY} `;
    } else {
      coordenadasPath += `L ${screenX} ${screenY} `;
    }
  }

  return <path d={coordenadasPath} fill="none" stroke="blue" strokeWidth={2} />;
};

const Cuadrante = () => {

  const [tiempo, setTiempo] = useState(0);
  useEffect(() => {
    let frameId: number;
    const animar = () => {
      setTiempo((t) => t + 0.01);
      frameId = requestAnimationFrame(animar);
    };
    animar();
    return () => cancelAnimationFrame(frameId);
  }, []);


  return (
    <div className="Master">
      <svg width={WIDTH} height={HEIGHT}>
        <DibujarPlano />
        <CalcularSin tiempo={tiempo} />
      </svg>
    </div>

  );
};
export default Cuadrante;
