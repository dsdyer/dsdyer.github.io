import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.input.focus();
  }

  componentDidUpdate() {
    this.input && this.focusInput();
  }

  render() {
    const id       = this.props.id,
          editing  = this.props.editing,
          activeCandidates  = this.props.candidates,
          onClick  = this.props.onClick,
          onBlur   = this.props.onBlur,
          updateCandidate = this.props.updateCandidate,
          value    = this.props.value,
          locked   = this.props.locked,
          cssClass = locked ? 'locked' : 'unlocked';

    if (editing) {
      return (
        <input type="text"
               maxLength="1"
               size="1"
               pattern="[0-9]"
               className={`square ${cssClass}`}
               onBlur={onBlur}
               ref={(i) => {this.input = i}}
        />
      );
    } else if (value) {
        return  (
          <button className = {`square ${cssClass}`}
                  onClick   = {onClick}
                  onFocus   = {onClick} // Focus via tab should behave the same as via click
                  >
            { value }
          </button>
        );
    } else {
        function clickHandler(e) {
          if (e.shiftKey) {
            updateCandidate(id, e.target.textContent);
          } else {
            onClick();
          }
        }
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => {
          const visibility = activeCandidates.has(c.toString()) ? '' : 'hide';
            return (<li key = {c.toString()} className= {`candidate ${visibility}`} onClick = {(e) => clickHandler(e)} >{c}</li>)
          });
        return (
          <ol className = "square">
            { candidates }
          </ol>
        );
    }
  }
}
