import {$makeThemeBox} from './templates/ThemeBox.js'

$(document).ready(function () {
  data.forEach(datum=> {
    $('#result').append($makeThemeBox(datum.name, datum.subThemes));
  })
})