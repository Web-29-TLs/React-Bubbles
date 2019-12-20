import React, { useState, useEffect } from "react";
import { Pack, Chord } from "@potion/layout";
import { Svg, Circle, Rect, Ribbon } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  const [bubbles, setBubbles] = useState(true);
  const [rect, setRect] = useState(false);

  //toggles display type
  const rectanglesSetter = () => {
    setRect(true);
    setBubbles(false)
  }
  
  const bubblesSetter = () => {
    setRect(false);
    setBubbles(true)
  }

  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <button onClick = {bubblesSetter}><p>bubbles</p></button>
      <button onClick = {rectanglesSetter}><p>rectangles</p></button>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length && bubbles) {
                  return (
                    
                      <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                 
                  );
                } else if (i < colors.length && rect){
                  return (
                      <Rect 
                      key = {key}
                      x = {x}
                      y = {y}
                      width = {r}
                      height = {r}
                      fill = {colors[i].code.hex}
                    />
                  )
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
