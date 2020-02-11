import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { filterNews } from "../redux/actions/newsActions";
import { useSelector, useDispatch } from 'react-redux'


export default function FilterBar(props) {

  const [sources, setSources] = React.useState('');

  const dispatch = useDispatch()
  const redu = useSelector(state => state.newsListReducer)

  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });


  const getSources = (source) => {
  
  }



  

  return (
    <FormGroup row>
    
      <FormControlLabel
        control={
          <Switch checked={props.cnn} onClick={() => getSources(`techcrunch`)} value="cnn" />
          
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
