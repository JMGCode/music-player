import "./RangeControl.css";

import { FC, useEffect, useRef, useState } from "react";

import useThrottle from "../../../hooks/useThrottle";

interface Props {
  width?: any;
  onChange?: any;
  onStart?: any;
  onEnd?: any;
  value: number;
}
const RangeControl: FC<Props> = ({
  width = "100%",
  onChange,
  onStart,
  onEnd,
  value = 0,
}) => {
  // const [volumeLevel, setVolumeLevel] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  // const volumeLevelRef = useRef<number>(50);
  const dragRef = useRef<boolean>(false);

  const throttle = useThrottle();
  useEffect(() => {
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchend", endDrag);
    document.addEventListener("touchmove", handleDrag);

    return () => {
      document.removeEventListener("mouseup", endDrag);
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchend", endDrag);
      document.removeEventListener("touchmove", handleDrag);
    };
  }, [onChange, value]);

  // update the width of the volume slider based on the volume level
  function updateVolume(value: number) {
    // setVolumeLevel(value);
    onChange(value);
    // volumeLevelRef.current = value;
  }

  // handle the start of the drag event
  function startDrag(event: any) {
    setIsDragging(true);
    dragRef.current = true;
    handleDrag(event);
    onStart && onStart();
  }

  // handle the end of the drag event
  function endDrag(event: any) {
    dragRef.current = false;
    setIsDragging(false);
    onEnd && onEnd();
  }

  // handle the drag event
  function handleDrag(event: any) {
    throttle(dragCallback, 30, event);
  }

  function dragCallback(event: any) {
    if (dragRef.current && volumeRef.current) {
      const clientX = event.clientX ?? event.touches[0].clientX;
      var position = clientX - volumeRef.current.getBoundingClientRect().left;

      var containerWidth = volumeRef.current.clientWidth;
      const newVolumeLevel = Math.min(
        Math.max(0, (position / containerWidth) * 100),
        100
      );
      updateVolume(newVolumeLevel);
    }
  }

  return (
    <div className="range-main-container">
      <div
        ref={volumeRef}
        className="range-container"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        style={{ width }}
      >
        <div
          className={`range-slider ${isDragging ? "active" : ""}`}
          style={{ width: value + "%" }}
          // style={{ width: volumeLevelRef.current + "%" }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        ></div>
      </div>
    </div>
  );
};

export default RangeControl;
