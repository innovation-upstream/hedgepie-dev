import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 320 320" {...props}>
      <circle cx="160" cy="160" r="160" fill="white"/>
      <path
        d="M186.821 44.2279C184.658 42.2383 181.811 41.1632 178.876 41.227C175.941 41.2908 173.144 42.4886 171.069 44.5704L45.5251 170.449C43.3926 172.589 42.1948 175.491 42.1948 178.516C42.1948 181.541 43.3926 184.443 45.5251 186.583L63.0993 204.202C63.1562 204.221 63.2891 204.278 63.5548 204.278C64.1241 204.278 64.8833 204.069 65.6044 203.593C72.5406 198.954 80.8661 196.868 89.1638 197.69C97.4614 198.512 105.218 202.192 111.114 208.103C117.01 214.014 120.681 221.79 121.501 230.109C122.321 238.427 120.241 246.774 115.613 253.727C115.201 254.329 114.964 255.034 114.93 255.763C114.93 256.03 114.968 256.163 114.987 256.201L132.144 273.42C133.222 274.503 134.506 275.357 135.92 275.933C137.334 276.509 138.849 276.793 140.376 276.77C141.902 276.747 143.408 276.417 144.804 275.799C146.2 275.181 147.458 274.288 148.503 273.172L273.743 139.778C274.777 138.677 275.583 137.38 276.113 135.963C276.643 134.547 276.887 133.039 276.83 131.527C276.774 130.015 276.418 128.529 275.784 127.156C275.15 125.784 274.249 124.551 273.136 123.53L256.321 108.08L256.264 108.061C255.993 108.014 255.716 108.021 255.448 108.08C254.377 108.304 253.402 108.856 252.658 109.66C249.486 113.264 245.63 116.197 241.314 118.289C236.998 120.381 232.309 121.59 227.522 121.843C222.735 122.097 217.945 121.392 213.433 119.768C208.921 118.144 204.777 115.634 201.244 112.386C197.711 109.137 194.86 105.215 192.857 100.849C190.854 96.4824 189.739 91.7595 189.578 86.9562C189.418 82.1529 190.214 77.3657 191.92 72.8745C193.627 68.3834 196.21 64.2785 199.518 60.7999C200.247 59.9835 200.705 58.9593 200.827 57.8698C200.862 57.596 200.843 57.318 200.77 57.0517V57.0136L186.84 44.2279H186.821ZM160.346 33.8015C165.188 28.9477 171.711 26.1552 178.557 26.0063C185.403 25.8574 192.041 28.3636 197.088 33.0023L211 45.7881C215.156 49.5933 216.314 54.7875 215.934 59.2397C215.536 63.6158 213.619 67.8777 210.658 71.1122C208.805 73.1385 207.368 75.5109 206.43 78.0939C205.491 80.677 205.07 83.42 205.188 86.1664C205.307 88.9128 205.965 91.6089 207.123 94.1006C208.281 96.5924 209.918 98.831 211.939 100.689C213.96 102.546 216.327 103.987 218.903 104.928C221.48 105.868 224.216 106.291 226.956 106.172C229.695 106.053 232.384 105.394 234.87 104.233C237.355 103.071 239.588 101.431 241.441 99.4044C244.383 96.1509 248.463 93.8677 252.772 93.0877C255.202 92.6013 257.713 92.6884 260.104 93.3423C262.495 93.9961 264.702 95.1987 266.55 96.8549L283.384 112.304C285.979 114.689 288.075 117.566 289.551 120.769C291.027 123.973 291.853 127.438 291.982 130.964C292.111 134.49 291.54 138.007 290.302 141.31C289.064 144.613 287.183 147.636 284.77 150.205L159.53 283.618C157.091 286.216 154.157 288.296 150.901 289.735C147.645 291.175 144.135 291.944 140.577 291.997C137.019 292.05 133.486 291.387 130.189 290.045C126.892 288.704 123.897 286.712 121.383 284.189L104.226 266.97C97.6404 260.368 99.2346 250.873 102.954 245.28C105.623 241.254 106.82 236.427 106.341 231.618C105.863 226.808 103.739 222.313 100.33 218.895C96.9208 215.478 92.4369 213.348 87.6396 212.869C82.8422 212.389 78.0271 213.589 74.012 216.264C68.4133 219.994 58.9429 221.592 52.3574 214.971L34.7832 197.352C32.3156 194.879 30.3582 191.942 29.0228 188.71C27.6873 185.478 27 182.014 27 178.516C27 175.018 27.6873 171.554 29.0228 168.322C30.3582 165.09 32.3156 162.153 34.7832 159.68L160.346 33.8015Z"
        fill="#000080"
      />
      <path
        d="M121.093 178.363C120.521 176.985 119.809 175.614 119.601 174.127C116.858 154.951 132.502 139.404 146.702 133.499C160.902 127.594 177.252 136.988 186.945 126.905C189.367 124.17 191.831 121.581 195.513 121.561C197.048 121.637 198.326 122.359 198.979 123.631C211.095 148.447 193.785 177.872 174.237 188.328C161.831 194.459 148.994 195.808 136.979 191.649C133.637 190.856 130.959 187.362 127.496 187.317C125.107 188.657 123.123 193.023 121.503 195.428C119.615 198.704 115.855 199.571 113.151 196.703C105.262 188.929 121.656 182.029 121.093 178.363V178.363ZM131.635 175.186C133.33 176.555 135.774 176.167 137.075 174.801C147.478 162.197 161.564 156.667 176.884 157.087C179.142 157.218 180.783 155.39 180.928 153.428C180.973 151.099 179.181 149.524 177.173 149.385C158.657 148.355 142.593 156.52 131.25 169.699C129.814 171.493 130.074 173.88 131.635 175.186V175.186Z"
        fill="#000080"
      />
    </Svg>
  );
};

export default Icon;