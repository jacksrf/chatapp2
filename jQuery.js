$(  ).click(function () {
  if ( $( "div:first" ).is( ":hidden" ) ) {
    $( "div" ).slideDown( "slow" );
  } else {
    $( "div" ).hide();
  }
});
