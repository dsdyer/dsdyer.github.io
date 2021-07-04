const $makeParticipantLI = p => {
  const $li = $(`<li class="participant">${p.id}, ${p.race}, ${p.sexual}, ${p.gender}, ${p.childAges}, ${p.childRelate}, ${p.relationshipConfig}</li>`);
  return $li
};

export const $makeParticipantList = participants => {
  const $ul = $('<ul class="participants"></ul>');
  participants.forEach(p=>$ul.append($makeParticipantLI(p)))
  return $ul
};
