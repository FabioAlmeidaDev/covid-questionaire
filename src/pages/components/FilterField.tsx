import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { withConditionalRender } from '../../enhancers/withConditionalRender';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import RemoveIcon from '@material-ui/icons/Clear';
import DirectionsIcon from '@material-ui/icons/Directions';

export const Filter = withConditionalRender((props: any) => {
  React.useEffect(() => {}, []);

  return (
    <div className="col-sm-6 col-xs-12">
      <TextField label="Type to search (filter) checked in List" value={props.value} onChange={(e: any) => props.setValue(e)} variant="outlined" className="col-sm-12" />
      <IconButton aria-label="clear" onClick={props.onClearFilter} style={{ display: props.value ? 'inline-flex' : 'none' }} className="clear-filter-button">
        <RemoveIcon />
      </IconButton>
    </div>
  );
});
