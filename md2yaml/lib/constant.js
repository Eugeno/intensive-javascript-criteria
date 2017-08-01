const Type = {
  HEADING: `heading`,
  EMPHASIS: `emph`,
  THEMATIC_BREAK: `thematic_break`
};

const Level = {
  TYPE: 1,
  SECTION: 2,
  CRITERIA: 3
};

const CriteriaType = {
  BASIC: {
    type: `basic`,
    name: `Базовые критерии`
  },
  ADVANCED: {
    type: `advanced`,
    name: `Дополнительные критерии`
  }
};

const INDEX_HEADER = `intro: |
    <link rel="stylesheet" href="/static/css/highlight.min.css" />
    <script src="/static/js/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <h2 class="m-b-2">Введение</h2>

    <p>Итоговая оценка разбита на две составляющие: базовая и дополнительная.</p>

    <p>Базовая оценка предполагает перепроверку некоторых важных критериев. При условии, что они выполнены, выставляется базовая оценка и наставник переходит к дополнительной оценке.</p>

    <p>Дополнительная оценка выставляется по дополнительным критериям. Дополнительные критерии оценивают проект с точки зрения шлифовки его качества и оптимизации, и выстроены по принципу перфекционизма. Мы не требуем сделать проект идеально, но набрать максимальное количество баллов возможно.</p>`;

module.exports = {Type, Level, CriteriaType, INDEX_HEADER};
