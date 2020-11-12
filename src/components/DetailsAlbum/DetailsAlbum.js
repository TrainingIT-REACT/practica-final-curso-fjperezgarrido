import React from 'react';

const DetailsAlbum = ({ match }) => (
  <div>
    {match.params.id};
  </div>
)

export default DetailsAlbum;
