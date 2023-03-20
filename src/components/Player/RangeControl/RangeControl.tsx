import "./RangeControl.css";

const RangeControl = () => {
  return (
    <div className="range-control-container">
      <p>00:00</p>
      <input type="range" />
      <p>03:54</p>
    </div>
  );
};

export default RangeControl;
