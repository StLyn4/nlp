function makeLine(level, text, scoreTag, agreement, confidence, active=false) {
  return `<tr ${active ? 'class="active-row"' : ''}>
    <td>${level}</td>
    <td>${text}</td>
    <td>${scoreTag}</td>
    <td>${agreement}</td>
    <td>${confidence}</td>
  </tr>`;
}
export default function buildTable(data) {
  let markup = makeLine('Global', '-', data.score_tag, data.agreement, data.confidence, true);
  for (let sn of data.sentence_list) {
    markup += makeLine('Sentence', sn.text, sn.score_tag, sn.agreement, sn.confidence);
    for (let sg of sn.segment_list) {
      markup += makeLine('Segment', sg.text, sg.score_tag, sg.agreement, sg.confidence);
    }
  }
  return markup;
}
