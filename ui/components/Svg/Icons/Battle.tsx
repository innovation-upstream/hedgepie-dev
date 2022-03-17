import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 541.16 532" {...props}>
      <path
        fill="#010101"
        d="M552.54,34H448.64a18,18,0,0,0-13.71,6.49L165.25,360.86l-32.83-33a18.11,18.11,0,1,0-25.61,25.61l33.91,33.92-86.22,86A54.11,54.11,0,0,0,54.36,550l.14.13h0a54.12,54.12,0,0,0,76.53.14l.13-.14,86-86.22,33.92,33.91a18,18,0,0,0,25.51.11l.1-.11a18,18,0,0,0,.1-25.51l-.1-.1-33-32.83L564.08,169.65a18,18,0,0,0,6.5-13.71V52A18,18,0,0,0,552.54,34Z" transform="translate(-29.42 -34)"
      />
      <path
        fill="#010101"
        d="M276.37,172.54l-111.3-132A18,18,0,0,0,151.36,34H47.46a18,18,0,0,0-18,18v103.9a18,18,0,0,0,6.5,13.71L178.06,289.43Z" transform="translate(-29.42 -34)"
      />
      <path
        fill="#010101"
        d="M459.28,387.38l33.91-33.92a18.11,18.11,0,1,0-25.61-25.61l-32.83,33-18-20.57L326.52,415.7l28.14,23.63-33,32.83a18,18,0,0,0-.11,25.51l.11.1a18,18,0,0,0,25.51.11l.1-.11,33.91-33.91,86.05,86.22a54.21,54.21,0,0,0,76.66-76.66Z" transform="translate(-29.42 -34)"
      />
    </Svg>
  );
};

export default Icon;