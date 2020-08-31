import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getAll as getUserList } from "../../services/athlete-traffic";
import { withConditionalRender } from "../../enhancers/withConditionalRender";
import capitalize from "../functions/capitalize";
import Refresh from "@material-ui/icons/Refresh";
import { Container, Paper as P, Button as MUIButton } from "@material-ui/core";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

export const Search = withConditionalRender((props: any) => {
  const [inputValue, setInputValue] = React.useState("");
  const [athleteList, setAthleteList] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);

  React.useEffect(() => {
    updateAthletesList();
  }, []);

  const updateAthletesList = () => {
    setSpinner(true);
    getUserList().then(
      (data) => {
        setAthleteList(data);
        setSpinner(false);
      },
      () => {
        setSpinner(false);
      }
    );
  };
  const Button = withConditionalRender(MUIButton);

  // spinner
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const { value, setValue } = props;
  return (
    <div className="row search-row">
      {spinner ? <div className="spinner-backdrop" /> : ""}
      <div className="sweet-loading">
        <BounceLoader css={override} size={150} color={"#123abc"} loading={spinner} />
        {spinner ? <div className="loading-athletes-list">Loading athlete's list</div> : ""}
      </div>
      <Autocomplete
        value={value ? value : null}
        onChange={(event, newValue) => {
          if (newValue != null) {
            setValue(newValue);
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        // options={athleteList}
        options={athleteList.sort((a: any, b: any) => -b.group.localeCompare(a.group))}
        groupBy={(athlete) => athlete.group}
        getOptionLabel={(athlete) => capitalize(athlete.name)}
        renderInput={(params) => <TextField {...params} label="Athlete's Name" variant="outlined" />}
        className="search-bar"
      />
      <Button variant="outlined" color="primary" className="refresh-button" display={!value.name} onClick={updateAthletesList}>
        <Refresh fontSize="small" className="refresh-button" />
      </Button>
    </div>
  );
});
