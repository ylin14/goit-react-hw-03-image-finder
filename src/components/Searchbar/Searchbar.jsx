import React from 'react';

class Searchbar extends React.Component {
  state = {
  q: '',
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    // props.onSubmit(this.state.q)
  };

  render() {
    return (
      <>
        <header className="searchbar">
          <form className="form" onSubmit={this.onSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>
            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    )
  }
}

export default Searchbar;
