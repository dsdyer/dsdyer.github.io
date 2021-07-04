

const DEMOGRAPHICS = [
  "race",
  "sexual",
  "gender",
  "childAges",
  "childRelate",
  "relationshipConfig"
];

const $makeDemographicLI = demographic => {

  const $li = $(`<li class="demographic ">${demographic[0]}: <strong>${demographic[1]}</strong> </li>`);
  return $li
};

export const $makeDemographicList = (demoName, demographicCount) => {
  const $container = $(`<div class="demographic-container demographic-container-${demoName}"></div>`)

  $container.append(`<h4 class="demo-name demo-name-${demoName}">${demoName}</h4>`)


  const $ul = $('<ul class="demographics"></ul>');


  demographicCount.forEach(demo=>$ul.append($makeDemographicLI(demo)))

  $container.append($ul)
  return $container
};

export function $makeDemoBox (participants) {
  const $box = $(`<div class="demo-box"></div>`);
  DEMOGRAPHICS.forEach(demo=> {
    const demographicCount = _.toPairs(_.countBy(participants, demo));
    // console.log(`demographicCount: ${JSON.stringify(demographicCount, null, 2)}`)

    $box.append($makeDemographicList(demo, demographicCount))
    // console.log(`ctb: ${JSON.stringify(demographicCount, null, 2)}`)  
    // $ul.append($makeDemographicLI(_.countBy(participants, demo)))
  })
  return $box
}