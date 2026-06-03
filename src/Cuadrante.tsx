import { useEffect, useState } from "react";
const Cuadrante = () => {
  const WIDTH = 900;
  const HEIGHT = 600;
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const ESCALAX = 50;
  const ESCALAY = 50;
  type Punto = {
    x: number;
    y: number;
  }
  const [punto, setPunto] = useState<Punto>({ x: centerX, y: centerY });

  useEffect(() => {
    let t = 0;
    const timer = setInterval(() => {
      t += 0.1;
      const currentPunto = obtenerPuntoSenoidal(t, 4, 1, 0);
      setPunto(currentPunto);
    }, 30);
    return () =>
      clearInterval(timer);
  }, []);

  const obtenerPuntoSenoidal = (
    t: number,
    A: number,
    omega: number,
    phi: number,
  ) => {
    const ymath = (A * ESCALAY) * Math.sin(omega * t + phi);
    const xpantalla = centerX + (t * ESCALAX);
    const ypantalla = centerY - ymath;

    return { x: xpantalla, y: ypantalla };
  }
  return (
    <svg className="cuadrante" width={WIDTH} height={HEIGHT}>
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="green" />
      <line x1={centerX} y1={0} x2={centerX} y2={HEIGHT} stroke="white" strokeWidth={2} />
      <line x1={0} y1={centerY} x2={WIDTH} y2={centerY} stroke="white" strokeWidth={2} />
      <circle cx={punto.x} cy={punto.y} r={5} fill="red" />
    </svg>
  );
};
export default Cuadrante;
