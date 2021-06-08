

const DEMOGRAPHICS = [
  "race",
  "sexual",
  "gender",
  "childAges",
  "childRelate",
  "relationshipConfig"
];

const $makeDemographicLI = demographic => {
  const $li = $(`<li class="demographic ">${demographic[0]}: <strong>${demographic[1]}</strong></li>`);
  return $li
};

export const $makeDemographicList = demographicCount => {
  const $ul = $('<ul class="demographics"></ul>');
  demographicCount.forEach(demo=>$ul.append($makeDemographicLI(demo)))
  return $ul
};

export function $makeDemoBox (participants) {
  const $box = $(`<div></div>`);
  DEMOGRAPHICS.forEach(demo=> {
    const demographicCount = _.toPairs(_.countBy(participants, demo));
    $box.append($makeDemographicList(demographicCount))
  })
  return $box
}