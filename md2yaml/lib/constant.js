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

module.exports = {Type, Level, CriteriaType};
