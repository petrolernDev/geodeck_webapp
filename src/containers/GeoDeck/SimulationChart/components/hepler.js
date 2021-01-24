export const getVariableUnit = (variable) => {
  switch (variable) {
    case "Pressure": {
      return "(PSI)";
    }
    case "Temperature": {
      return `(\u00b0C)`;
    }
    default: {
      return "(-)";
    }
  }
};

export const increaseLegend = (chart, options) => {
  chart.legend.afterFit = function () {
    this.height = this.height + 15;
  };
};
