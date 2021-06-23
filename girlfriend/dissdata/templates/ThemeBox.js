import {$makeSubThemeBox} from './Sub-ThemeBox.js'
import {$makeDemoBox} from './DemoBox.js'

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

  $contentBox.prepend($makeDemoBox(_.uniqBy(subThemes.map(s=>s.participants).flat(), 'id')))

  return $box
}