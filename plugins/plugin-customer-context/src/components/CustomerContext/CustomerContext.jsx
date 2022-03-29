import React from 'react';
import PropTypes from 'prop-types';
import * as util from 'util';
 

import { CustomerTimelineComponentStyles, Header, Content, AttributeLabel } from './CustomerContext.Styles';
import { withTheme, withTaskContext } from '@twilio/flex-ui'


// It is recommended to keep components stateless and use redux for managing states
const CustomTaskList = (props) => {

  const { task } = props;

  if(!task){
    return null;
  }

  let { context } = task._task.attributes;

  context  = Object.keys(context)
      .map((key) => {

        return <div>
          <AttributeLabel>
            {key.replaceAll('_',' ')}
          </AttributeLabel>
          <div>
            {context[key]}
          </div>
        </div>
      });

  //console.log(task.getAttributes());

  console.log(`%c ${util.inspect(context)}`, 'background: green; color: white;');
  

  return (
    <CustomerTimelineComponentStyles>
      <Header>Customer Timeline</Header>
      <Content>{context}</Content>
    </CustomerTimelineComponentStyles>
  );
};

CustomTaskList.displayName = 'CustomTaskList';

CustomTaskList.propTypes = {
};

export default withTheme(withTaskContext(CustomTaskList));
