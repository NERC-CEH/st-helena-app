import $ from 'jquery';
import Marionette from 'marionette';
import browser from '../../../helpers/browser';
import JST from '../../../JST';

export default Marionette.ItemView.extend({
  tagName: 'ul',
  className: 'table-view',
  template: JST['settings/menu/main'],

  events: {
    'toggle #use-gridref-btn': 'onSettingToggled',
    'click #use-gridref-btn': 'onSettingToggled',
    'toggle #use-autosync-btn': 'onSettingToggled',
    'click #use-autosync-btn': 'onSettingToggled'
  },

  triggers: {
    'click #delete-all-btn': 'records:delete:all',
    'click #submit-all-btn': 'records:submit:all',
    'click #app-reset-btn': 'app:reset',
  },

  onSettingToggled: function (e) {
    let setting = $(e.currentTarget).data('setting');
    let active = $(e.currentTarget).hasClass('active');

    if (e.type != 'toggle' && !browser.isMobile()) {
      //Browser.isMobile() android generates both swipe and click

      active = !active; //invert because it takes time to get the class
      $(e.currentTarget).toggleClass('active', active);
    }

    this.trigger('setting:toggled', setting, active)
  }
});
