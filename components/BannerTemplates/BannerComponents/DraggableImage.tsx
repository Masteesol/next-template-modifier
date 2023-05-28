import React, { useRef, useState } from 'react';



interface DraggableImageProps {
  imageSrc: string;
  scale: number;
  position: { x: number; y: number };
  onDrag: (newPosition: { x: number; y: number }) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  imageSrc,
  position,
  onDrag,
  scale
}) => {
  const [dragging, setDragging] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: any) => {
    setDragging(true);
    e.target.setPointerCapture(e.pointerId);
  };

  const handleMouseMove = (e: any) => {
    if (!dragging) return;
    const newPosition = {
      x: position.x + e.movementX,
      y: position.y + e.movementY,
    };
    onDrag(newPosition);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      ref={imgRef}
      className="absolute z-10 cursor-grab"
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerCancel={handleMouseUp}
      onPointerLeave={handleMouseUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
      }}
    >
      <img
        src={imageSrc}
        crossOrigin="anonymous"
        alt=""
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DraggableImage;
