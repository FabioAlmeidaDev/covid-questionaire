import React from "react";
import { withConditionalRender } from "../../enhancers/withConditionalRender";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export const Allergies = withConditionalRender((props: any) => {
  const { allergies, setAllergies, drnote, setDrnote } = props;

  const Switchy = (state: any, setState: any) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let tempQuestion = state;
      tempQuestion = event.target.checked;
      setState(tempQuestion);
      console.log("ALLERGIES: ", state);
    };

    return (
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item className={`yesno ${state == false ? "selected-option" : ""}`}>
            No
          </Grid>
          <Grid item>
            <AntSwitch checked={state} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item className={`yesno ${state == true ? "selected-option" : ""}`}>
            Yes
          </Grid>
        </Grid>
      </Typography>
    );
  };

  const AntSwitch = withStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 34,
        height: 22,
        padding: 0,
        display: "flex",
      },
      switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        "&$checked": {
          transform: "translateX(12px)",
          color: theme.palette.common.white,
          "& + $track": {
            opacity: 1,
            backgroundColor: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark,
          },
        },
      },
      thumb: {
        width: 18,
        height: 18,
        boxShadow: "none",
      },
      track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 26 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
      },
      checked: {},
    })
  )(Switch);

  return (
    <div className="questionaire">
      <div className={`question-row row`}>
        <div className="flat-icon-container col-xs-12 col-sm-1">
          <img src="./allergy.svg" className="flat-icon" />
        </div>
        <div className="question col-sm-9 col-xs-12"> Does this person have seasonal allergies or is experiencing any symptoms of seasonal allergies?</div>
        <div className="question-answer col-sm-2 col-xs-12">{Switchy(allergies, setAllergies)}</div>
      </div>
      <div className={`question-row row`} style={{ display: allergies ? "flex" : "none" }}>
        <div className="flat-icon-container col-xs-12 col-sm-1">
          <img src="./drnote.svg" className="flat-icon" />
        </div>
        <div className="question col-sm-9 col-xs-12"> You must provide a doctors note to the front desk before this person is allowed to enter the gym. Have you provided the front desk with a doctors note?</div>
        <div className="question-answer col-sm-2 col-xs-12">{Switchy(drnote, setDrnote)}</div>
      </div>
      <div className="answered-yes" style={{ display: allergies == true && drnote == false ? "flex" : "none" }}>
        You need a Doctors note describing your seasonal allergy and possible symptoms before being allowed in the gym
      </div>
    </div>
  );
});
