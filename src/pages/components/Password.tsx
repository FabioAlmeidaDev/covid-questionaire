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
  const { state, setState, placeholder = '', maxLength = 20, className } = props;
  const handleChange = (prop: any) => (event: any) => {
    if (event.target) {
      if (event.target.value.length <= maxLength) {
        setState({ [prop]: event.target.value });
      }
    }
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  return (
    <FormControl className={className}>
      <InputLabel htmlFor="adornment-password">{placeholder}</InputLabel>
      <Input
        id="adornment-password"
        type={state.showPassword ? 'text' : 'password'}
        value={state.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
              {state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});
