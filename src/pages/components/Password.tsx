import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withConditionalRender } from '../../enhancers/withConditionalRender';

export const Password = withConditionalRender((props: any) => {
  const [visibility, setVisibility] = React.useState(false);

  const { state, setState, placeholder = '', maxLength = 20, className, style } = props;
  const handleChange = (prop: any) => (event: any) => {
    if (event.target) {
      if (event.target.value.length <= maxLength) {
        if (props.name) {
          setState({ ...state, [props.name]: event.target.value });
        } else {
          setState({ ...state, [prop]: event.target.value });
        }
      }
    }
  };

  const handleClickShowPassword = () => {
    setVisibility(!visibility);
  };

  return (
    <FormControl className={className} style={style}>
      <InputLabel htmlFor="adornment-password">{placeholder}</InputLabel>
      <Input
        id="adornment-password"
        type={visibility ? 'text' : 'password'}
        value={props.name ? state[props.name] : state.password}
        error={props.error}
        onChange={handleChange('password')}
        inputProps={{ inputMode: 'numeric' }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
              {visibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});
