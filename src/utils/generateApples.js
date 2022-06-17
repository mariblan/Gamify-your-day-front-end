import appleColor from "../images/apple-color.png";
import appleBW from "../images/apple-bw.png";

export default function renderApples(num, className) {
  let apples = [];
  for (let i = 0; i < num; i++) {
    apples.push(
      <img src={appleColor} alt="A red apple" className={className} />
    );
  }
  return apples;
}
