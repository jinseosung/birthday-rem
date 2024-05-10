const BtnRose = ({ prop, style, onclick }) => {
  return (
    <button onClick={onclick} className={`btnRose ${style}`}>
      {prop}
    </button>
  );
};

export default BtnRose;
