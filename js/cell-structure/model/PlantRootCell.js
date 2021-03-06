/**
 * Model of an animal cell object.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define(function (require) {
    'use strict';

    // modules
    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');
    var Cutter = require('CELL_STRUCTURE/cell-structure/model/Cutter');
    var Cell = require('CELL_STRUCTURE/cell-structure/model/Cell');
    var MagnifiedImage = require('CELL_STRUCTURE/cell-structure/model/MagnifiedImage');

    var treeCellIcon = require('image!CELL_STRUCTURE/tree.svg');
    var treeRedImage = require('image!CELL_STRUCTURE/tree-red.svg');
    var treeRedCutImage = require('image!CELL_STRUCTURE/tree-red-cut.svg');
    var stemTransCutImage = require('image!CELL_STRUCTURE/stem-ts.png');
    var stemTransCutMagnifiedImage = new MagnifiedImage(stemTransCutImage, []);

    function PlantRootCell(properties) {
        Cell.call(this, _.merge({image: treeCellIcon, isDippedInLiquid: false}, properties));

        var onTimeout = function () {
            this.imageProperty.set(treeRedImage);
            this.isDippedInLiquidProperty.set(true);
        }.bind(this);

        this.onDippedInLiquid = function (liquid) {
            if (liquid.text === "Red Water") {
                if( this.image === treeRedImage || this.image === treeRedCutImage)
                    CS.showMessageBox("Plant is already dipped in Red Water", true, 3000);
                else
                    CS.model.experimentArea.createStopwatch(onTimeout);
                return true;
            }
            else
                return false;
        }.bind(this);

        this.onLiquidDropped = function ( liquid) {
            return false;
        };

        this.attachedToProperty.link(function (attachedTo) {
            if (!CS.model) return; // still initializing
            if (!attachedTo) {
                CS.model.experimentArea.stopStopwatch();
            }
        });

        CS.addDropListener(this);
    }

    return inherit(Cell, PlantRootCell, {
        collidesWith: function (model) {
            if (model instanceof Cutter)
                model.collidesWith(this);
            return false;
        },
        onCut: function () {
            if (this.isDippedInLiquid === true){
                this.imageProperty.set(treeRedCutImage);
                this.magnifiedImageProperty.set(stemTransCutMagnifiedImage);
            }
            else {
              var location = new Vector2(this.location.x + this.size.width, this.location.y);
              CS.showMessageBox("Plant root cell must be dipped in Red Water", true, 3000, location);
            }
        }

    });
});
