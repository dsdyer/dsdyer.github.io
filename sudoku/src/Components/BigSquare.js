import React from 'react';

export default function BigSquare(props) {
  return (
    <div className={`big-square ${props.color}`} >
      <div className="square-row">
        {props.squares[0]}
        {props.squares[1]}
        {props.squares[2]}
      </div>
      <div className="square-row">
        {props.squares[3]}
        {props.squares[4]}
        {props.squares[5]}
      </div>
      <div className="square-row">
        {props.squares[6]}
        {props.squares[7]}
        {props.squares[8]}
      </div>
    </div>
  );
}