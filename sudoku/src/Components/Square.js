import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    // this.editing = this.props.editing;
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.input.focus(); 
  }

  componentDidUpdate() {
    this.input && this.focusInput();
  }

  render() {
    const onClick = this.props.onClick;
    const onBlur = this.props.onBlur;
    const value = this.props.value;
    const locked = this.props.locked;
    const cssClass = locked ? 'locked' : 'unlocked';


    if (this.props.editing) {
      return (
        <input type="text" maxLength="1"
                           length="1"
                           pattern="[0-9]"
                           className={`square ${cssClass}`}
                           onBlur={onBlur}
                           ref={(i) => {this.input = i}}
                          />
      );
    }

    return (
      <button className={`square ${cssClass}`} onClick={onClick}
                                  >
        {value ? value : null}
      </button>
    );
  }
}
