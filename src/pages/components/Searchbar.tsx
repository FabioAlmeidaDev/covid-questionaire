import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getAll as getUserList } from '../../services/athlete-traffic';
import { withConditionalRender } from '../../enhancers/withConditionalRender';

export const Search = withConditionalRender((props: any) => {
  const [inputValue, setInputValue] = React.useState('');
  const [athleteList, setAthleteList] = React.useState([]);

  React.useEffect(() => {
    getUserList().then((data) => {
      setAthleteList(data);
    });
  }, []);

  const { value, setValue } = props;
  return (
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
      options={athleteList}
      // options={options.sort((a, b) => -b.name.localeCompare(a.name))}
      groupBy={(athlete) => athlete.group}
      getOptionLabel={(athlete) => athlete.name}
      renderInput={(params) => <TextField {...params} label="Athlete's Name" variant="outlined" />}
      className="search-bar"
    />
  );
});
