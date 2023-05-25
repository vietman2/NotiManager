import { createStyles, Theme } from "@material-ui/core";

const recurrenceStyle = (theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(2),
      padding: 0.5,
      fontSize: 2,
      textAlign: "center",
    },
  });
};

export default recurrenceStyle;