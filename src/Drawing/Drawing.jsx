import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { SketchPicker } from 'react-color';

import './Drawing.scss';

function Drawing() {
  const [pickColor, setPickColor] = useState(false);
  const [color, setColor] = useState('#000000');
  const [radius, setRadius] = useState(12);

  const canvasRef = useRef();

  return (
    <div id="drawing" className="drawing">
      <h1>Express Yourself</h1>
      <div className="drawing__canvas">
        <CanvasDraw
          ref={canvasRef}
          canvasHeight="100%"
          canvasWidth="100%"
          brushColor={color}
          brushRadius={radius}
        />
      </div>
      <div className="drawing__controls">
        <div className="drawing__controls__group">
          <button type="button" onClick={() => setPickColor(true)}>
            Color
          </button>
          {pickColor && (
            <SketchPicker
              color={color}
              onChangeComplete={(newColor) => {
                setColor(newColor.hex);
                setPickColor(false);
              }}
            />
          )}
        </div>
        <div className="drawing__controls__group">
          <button type="button" onClick={() => setRadius(8)}>
            Small
          </button>
          <button type="button" onClick={() => setRadius(12)}>
            Medium
          </button>
          <button type="button" onClick={() => setRadius(16)}>
            Large
          </button>
        </div>
        <div className="drawing__controls__group">
          <button type="button" onClick={() => canvasRef.current.clear()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawing;
