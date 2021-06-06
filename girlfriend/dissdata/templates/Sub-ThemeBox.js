import {$makeParticipantList} from './ParticipantList.js'
import {$makeDemoBox} from './DemoBox.js'

export function $makeSubThemeBox(name, participants) {
  const $box = $(`<div class="sub-themebox"></div>`)
  const $header = $(`<h3>${name}</h3>`);
  const $contentBox = $('<div class="content"></div>');
  const $left = $('<div class="content-left"></div>');
  const $right = $('<div class="content-right"></div>');


  $box.append($header);
  $box.append($contentBox);

  $header.click(function(e) {
    $contentBox.slideToggle();
  });
  
  if(participants && participants.length) $left.append($makeParticipantList(participants))

  $right.append($makeDemoBox(participants))
  
  $contentBox.append($left);
  $contentBox.append($right);
  
  return $box
}
