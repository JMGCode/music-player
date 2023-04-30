import { usePlayer } from "../../PlayerContext";
import "./Footer.css";

import { PropsWithChildren } from "react";

//TODO: Verificar que se respeten los tamaños de cada componente 1fr 3fr 1fr aprox
// con un minimo para el primero donde solo se vea la imagen, el segundo que se van todos los controles
// y el volumen puede cambiar a vertical oculto
const Footer: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className="footer">{children}</div>;
};

export default Footer;
