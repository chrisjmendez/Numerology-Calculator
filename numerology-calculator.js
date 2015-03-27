;(function ( $, window, document, undefined ) {

    "use strict";

    var pluginName = "numerologyCalculator",
        defaults = {
            conversionMatrix:  {
                1: ["a", "j", "s"],
                2: ["b", "k", "t"],
                3: ["c", "l", "u"],
                4: ["d", "m", "v"],
                5: ["e", "n", "w"],
                6: ["f", "o", "x"],
                7: ["g", "p", "y"],
                8: ["h", "q", "z"],
                9: ["i", "r"]
            },
            output: "output_number h2"
        };

    function Plugin ( element, options ) {
        this.element = element;

        this.settings = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var that = this;

            console.log(this.settings.greg);

            $(this.element).bind('input', function(){
                var magicalNumber = that.convertStringToNumber( this.value ) || 0;

                $("#" + that.settings.output).html(magicalNumber);

            });

        },

        convertStringToNumber: function(inputString) {
            var charArray = inputString.toLowerCase().split(''),
                magicalNumber = 0;

            for(var index in charArray){
                magicalNumber += this.convertCharToInt( charArray[index] );
            }


            while (magicalNumber > 9) {
                magicalNumber = this.sumMagicNumberDigits(magicalNumber);
            }

            return magicalNumber;
        },

        convertCharToInt: function ( char ) {
            var charConvertedToNumber = 0;

            for( var key in this.settings.conversionMatrix ){
                var value = this.settings.conversionMatrix[key];

                if( value.indexOf(char) > -1 ){
                    charConvertedToNumber = key;
                    break;
                }
            }

            return parseInt( charConvertedToNumber );
        },

        sumMagicNumberDigits: function ( number ){
            var magicNumberSummed = 0,
                digits = number.toString().split('');

            for(var index in digits){
                magicNumberSummed += parseInt( digits[index] );
            }

            return magicNumberSummed;
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );