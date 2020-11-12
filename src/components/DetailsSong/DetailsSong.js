import React from 'react';

class DetailsSong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
    };
  }


  render() {
    return (
      <section>
        <div>
          {this.props.children}
        </div>
      </section>
    )
  }
}

export default DetailsSong;
