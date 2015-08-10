define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var beakerImage = require( 'image!CELL_STRUCTURE/beaker.svg' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  function Beaker( location, size ) {
    Apparatus.call( this, { location: new Vector2(300, 300), size: new Dimension2(100, 100), visibility: true} );
    this.image = this.kitImage = beakerImage;
    this.onDragEnd = function() {
      CS.model.apparatusKit.removeChild(this);
      CS.onDrop(this);
    };
  }

  return inherit( Apparatus, Beaker );
} );
