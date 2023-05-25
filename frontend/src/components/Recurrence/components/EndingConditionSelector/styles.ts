import { createStyles } from "@material-ui/core";

const EndConditionStyle = () => {
  return createStyles({
    occurrencesNumber: {
      "& p": {
        fontSize: "0.8rem",
      },
    },
    radioGroup: {},
    radio: {},
    endDate: {},
  });
};

export default EndConditionStyle;