define([
    'core/js/adapt'
], function(Adapt) {

    var ExitButton = Backbone.Controller.extend({

        _$html: null,

        initialize: function() {
            this.listenTo(Adapt, "app:dataReady", this._onDataReady);
        },

        _onDataReady: function() {
            var config = Adapt.config.get("_exitButton");
            if (!config || !config._isEnabled) return;
            this._$html = $("html");
           
            this.listenTo(Adapt, {
                'router:menu router:page': this._onRouterEvent
            });
        },

        _onRouterEvent: function(model) {
            this._config = model.get("_exitButton");
            var isEnabled = (this._config && this._config._isEnabled);
            if (!isEnabled) return this._disabled();
            this._enabled();
            
        },
        _disabled: function() {
            this._$html.removeClass("hide-exit-button");
            if (this._dataEvent) {
                $(".navigation-exit-button").attr("data-event", this._dataEvent);
                this._dataEvent = null;
            }
        },

        _enabled: function() {
            this._$html.toggleClass("hide-exit-button", !!this._config._hideExitButton);
          
            if (!$(".navigation-exit-button")[0]) {
                // if exit button doesn't exist create exit button
                this._createExitButton();
            }
           
        },
        _createExitButton: function() {
            var course = Adapt.course.get("_exitButton");
            var altText = (course && course.alt);
            var $location =(course.showInPageHeader)?$('.page-header'):$('.navigation-inner');
             debugger;
            var $exitButton = $('<button>', {
                attr: {
                    'data-event': 'exitButton'
                },
                'class': 'base navigation-exit-button icon',
                'aria-label': altText,
                "onClick": "window.top.close();"
            }).text(course.title);
            $location.append($exitButton);
            
        }

    });

    return new ExitButton();

});
