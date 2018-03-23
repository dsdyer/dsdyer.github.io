import React from 'react';
// import Square from './Square';

export default function BigSquare(props) {
  // constructor(props) {
  //   super(props);
  //   // this.focusInput = this.focusInput.bind(this);
  // }

  // render() {
    return (
      <div className={`big-square ${props.color}`} >
        {props.squares}
      </div>
      );
  // }
}

//   componentDidMount(){
//    this.nameInput.focus(); 
// }