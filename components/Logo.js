import { useEffect, useState } from "react";

export default function Logo({ loading }) {
  const [fade, setFade] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setFade("uk-animation-fade uk-animation-reverse");
      setTimeout(() => {
        setHidden(true);
      }, 800);
    }, 2000);
  }, "loading");
  return (
    <div
      className={"uk-section-default uk-width-1-1 uk-position-fixed " + fade}
      style={{ top: 0, left: 0, zIndex: 990 }}
      uk-height-viewport={""}
      id={"logo-container"}
      hidden={hidden}
    >
      <img
        src={"/images/intro.png"}
        alt={"Power Trip Fitness"}
        className={!loading ? "logo-animation" : undefined}
        id={"logo"}
      />
    </div>
  );
}
