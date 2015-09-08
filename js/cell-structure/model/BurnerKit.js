define(function (require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var burnerKitImage = require('image!CELL_STRUCTURE/burner-kit.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function BurnerKit(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 300),
            size: new Dimension2(80, 80),
            image: burnerKitImage,
            visibility: true,
            standImage: null,
            gauzeImage: null,
            burnerImage: null
        });

        this.name = "burner kit";
        this.image = this.kitImage = burnerKitImage;
        this.onDragEnd = function () {
            CS.onDrop(this);
            CS.addDroppable(this);
        };

        this.onReceiveDrop = function (model) {
            console.log(model);
        };

        this.onRemove = function () {

        };
    }

    return inherit(Apparatus, BurnerKit);
});
