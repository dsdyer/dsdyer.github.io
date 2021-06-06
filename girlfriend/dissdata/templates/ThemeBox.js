import {$makeSubThemeBox} from './Sub-ThemeBox.js'

export function $makeThemeBox(name, subThemes) {
  const $box = $(`<div class="themebox"></div>`)
  const $header = $(`<h2>${name}</h2>`);
  const $contentBox = $('<div class="content"></div>');
  $box.append($header);               
  $box.append($contentBox);

  $header.click(function(e) {
    $contentBox.slideToggle();
  })

  if(subThemes && subThemes.length) subThemes.forEach(s => $contentBox.append($makeSubThemeBox(s.name, s.participants)))

  return $box
}