let state = true

module.exports = function ( app ) {
  app.post( '/api/save', function( req, res ) {
    if ( state ) {
      res
        .status( 200 )
        .json( {
          state: 'ack'
        } )
    } else {
      res
        .status( 500 )
        .json( {
          state: 'server down'
        } )
    }
    
  } );

  app.post( '/api/toggle-state', function ( _, res ) {
    state = !state
    res.json( {
      state: state
    } )
  } )
}