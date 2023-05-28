import { CardBaseLight, FlexColContainer } from '@/components/styled-global-components';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FaGripHorizontal } from 'react-icons/fa';



interface DraggableSliderProps {
    position: { x: number; y: number };
    onDrag: (newPosition: { x: number; y: number }) => void;
    children: any
}

const DraggableSlider: React.FC<DraggableSliderProps> = ({
    children,
    position,
    onDrag,
}) => {
    const [dragging, setDragging] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: any) => {
        if (!dragging) return;
        const newPosition = {
            x: position.x + e.movementX,
            y: position.y + e.movementY,
        };
        onDrag(newPosition);
    }, [dragging, position, onDrag]);

    const handleMouseUp = useCallback(() => {
        setDragging(false);
        document.removeEventListener('pointermove', handleMouseMove);
        document.removeEventListener('pointerup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e: any) => {
        setDragging(true);
        e.target.setPointerCapture(e.pointerId);
        document.addEventListener('pointermove', handleMouseMove);
        document.addEventListener('pointerup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    useEffect(() => {
        return () => {
            document.removeEventListener('pointermove', handleMouseMove);
            document.removeEventListener('pointerup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <CardBaseLight
            ref={imgRef}
            className="absolute z-[9999] p-4"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            <div className="cursor-grab"
                onPointerDown={handleMouseDown}
                onPointerMove={handleMouseMove}
                onPointerUp={handleMouseUp}
                onPointerCancel={handleMouseUp}
                onPointerLeave={handleMouseUp}>
                <FaGripHorizontal />
            </div>
            <FlexColContainer className="gap-2"
            >
                {children}
            </FlexColContainer>
        </CardBaseLight>
    );
};

export default DraggableSlider;
