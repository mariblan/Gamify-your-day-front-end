import appleColor from "../images/apple-color.png";
import appleBW from "../images/apple-bw.png";

export default function renderApples(className, progress, maxcap) {
  let apples = [];
  for (let i = 0; i < progress; i++) {
    apples.push(
      <img src={appleColor} alt="A red apple" className={className} />
    );
  }
  if (maxcap) {
    for (let i = progress; i < maxcap; i++) {
      apples.push(
        <img
          src={appleBW}
          alt="A black and white apple"
          className={className}
        />
      );
    }
  }
  return apples;
}
