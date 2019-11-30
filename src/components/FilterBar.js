import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels(props) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
    <FormControlLabel
        control={
          <Switch checked={props.nyt} onClick={(e) => props.getSourceCheck(e)} value="nyt" />
        }
        label="NY TIMES"
        name = "nyt"
      />
      <FormControlLabel
        control={
          <Switch checked={props.cnn} onClick={(e) => props.getSourceCheck(e)} value="cnn" />
          
        }
        label="CNN"
        name = "cnn"
      />
      <FormControlLabel
        control={
          <Switch checked={props.wsj} onClick={(e) => props.getSourceCheck(e)} value="wsj" />
          
        }
        label="WSJ"
        name = "wsj"
      />

    <FormControlLabel
        control={
          <Switch checked={props.abc} onClick={(e) => props.getSourceCheck(e)} value="abc" />
          
        }
        label="ABC News"
        name = "abc"
      />

<FormControlLabel
        control={
          <Switch checked={props.fox} onClick={(e) => props.getSourceCheck(e)} value="fox" />
          
        }
        label="Fox News"
        name = "fox"
      />

<FormControlLabel
        control={
          <Switch checked={props.cbs} onClick={(e) => props.getSourceCheck(e)} value="cbs" />
          
        }
        label="CBS News"
        name = "cbs"
      />

<FormControlLabel
        control={
          <Switch checked={props.twp} onClick={(e) => props.getSourceCheck(e)} value="twp" />
          
        }
        label="The Washington Post"
        name = "twp"
      />

    </FormGroup>

    
  );
}
