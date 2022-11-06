import { appleColor, appleBW } from '../images';

export default function renderApples(className, progress, maxcap) {
  let apples = [];
  for (let i = 0; i < progress; i++) {
    apples.push(
      <img key={i} src={appleColor} alt='A red apple' className={className} />
    );
    if (maxcap && apples.length === maxcap) {
      return apples;
    }
  }

  if (maxcap) {
    for (let i = progress; i < maxcap; i++) {
      apples.push(
        <img
          key={i}
          src={appleBW}
          alt='A black and white apple'
          className={className}
        />
      );
    }
  }
  return apples;
}
