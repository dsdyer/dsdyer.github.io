import React from 'react';

export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {candidates: [1, 2, 3, 4, 5, 6, 7, 8, 9] || []};
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.input.focus();
  }

  componentDidUpdate() {
    this.input && this.focusInput();
  }

  render() {
    const editing  = this.props.editing,
          onClick  = this.props.onClick,
          onBlur   = this.props.onBlur,
          value    = this.props.value,
          locked   = this.props.locked,
          cssClass = locked ? 'locked' : 'unlocked',
          showCandidates   = this.props.showCandidates;

    if (editing) {
      return (
        <input type="text" maxLength="1"
                           size="1"
                           pattern="[0-9]"
                           className={`square ${cssClass}`}
                           onBlur={onBlur}
                           ref={(i) => {this.input = i}}
                           tabIndex={this.props.tabIndex}
        />
      );
    } else if (value) {
        return  (
          <button className = {`square ${cssClass}`}
                  onClick   = {onClick}
                  onFocus   = {onClick} // Focus via tab should behave the same as via click
                  tabIndex  = {this.props.tabIndex}>
            { value }
          </button>
        );
    } else {
        const candidates = this.state.candidates.map(c => <li key = {c.toString()}
                                                              className = 'candidate hide'
                                                              onClick = { (e) => {
                                                                if (e.shiftKey) {
                                                                  e.preventDefault();
                                                                  e.stopPropagation();
                                                                  e.target.classList.toggle('hide');
                                                                  // do stuff
                                                                } else {
                                                                  onClick();
                                                                }
                                                              }
                                                            } >
                                                            {c}
                                                          </li>);
        return (
          <ol className = "square">
            { candidates }
          </ol>
        );
    }
  }
}
