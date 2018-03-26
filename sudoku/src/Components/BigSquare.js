import React from 'react';

export default function BigSquare(props) {
  return (
    <div className={`big-square ${props.color}`} >
      {props.squares}
    </div>
    );
}