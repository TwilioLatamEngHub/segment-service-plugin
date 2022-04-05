import React, { useEffect, useState } from 'react';
import { Manager } from '@twilio/flex-ui';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@twilio-paste/core/tabs';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Stack } from '@twilio-paste/core/stack';
import { Theme } from '@twilio-paste/theme';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { useUID } from "@twilio-paste/core/uid-library";
 
import { withTheme, withTaskContext } from '@twilio/flex-ui'

import segmentUtil from './../../utils/SegmentUtil';

const CustomTaskList = (props) => {

  const { task } = props;
  const { context, userId } = task.attributes;
  const [segmentData, setSegmentData] = useState();
  const manager = Manager.getInstance();

  if(!task || (!context && !userId)  ){
    return null;
  }

  useEffect(() => {
    userId && segmentUtil.getPersonaData(userId)
      .then(data => {
        setSegmentData(data);
      });

  }, [userId]);

  const contextData  = Object.keys(context)
      .map((key) => {

        return <Card padding="space40">
          <Heading as="h5" variant="heading50">{key.replaceAll('_',' ').toUpperCase()}</Heading>
          <Paragraph>{context[key]}</Paragraph>
        </Card>

      });

  const segmentTraitsTab = segmentData && segmentData.traits &&
    Object.keys(segmentData.traits)
      .filter(key => !key.startsWith('j_o'))      //filter journey traits
      .map(key => segmentData.traits[key] != null &&
        <Card padding="space40">
          <Heading as="h5" variant="heading50">{key.replaceAll('_',' ').toUpperCase()}</Heading>
          <Paragraph>{segmentData.traits[key].toString()}</Paragraph>
        </Card>
        );

  const segmentEventsTab = segmentData && segmentData.events &&
        segmentData.events
          .filter(event => event.event != 'Audience Entered' && event.event != 'Audience Exited')   //filter journey events
          .map(event => {
            const eventDate = new Date(event.timestamp)

            const style = { background: 'rgb(33, 150, 243)', color: '#fff', padding: '4px' };

            return <VerticalTimelineElement
              contentStyle={style}
              contentArrowStyle={{ borderRight: `7px solid  ${style.background}` }}
              iconStyle={style}>
              <Card border-width="border-width-10">
                <Heading as="h4" variant="heading40">{event.event}</Heading>
                <Heading as="h6" variant="heading60">{eventDate.toLocaleString()}</Heading>  
              </Card>
            </VerticalTimelineElement>
            });  

  if(segmentData) console.log(segmentData.events);
    
  const selectedId = useUID();

  return (
    <Theme.Provider>
      <Tabs orientation="vertical" selectedId={selectedId} baseId="vertical-tabs-example">
      <TabList aria-label="Vertical product tabs">
        <Tab id={context && selectedId} disabled={context ? false : true}>Bot Context</Tab>
        <Tab id={context || selectedId} disabled={segmentTraitsTab ? false : true}>Customer Traits</Tab>
        <Tab disabled={segmentEventsTab ? false : true}>Customer Events</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Heading as="h3" variant="heading30">Bot Context</Heading>
          <Stack orientation="vertical" spacing="space60">
            {contextData}
          </Stack>
        </TabPanel>
        <TabPanel>
          <Heading as="h3" variant="heading30">Customer Traits</Heading>
          <Stack orientation="vertical" spacing="space60">
            {segmentTraitsTab}
          </Stack>
        </TabPanel>
        <TabPanel>
          <Heading as="h3" variant="heading30">Customer Events</Heading>
          <VerticalTimeline>
          {segmentEventsTab}
        </VerticalTimeline>
        </TabPanel>
        
      </TabPanels>
    </Tabs>
    </Theme.Provider>
    
  );
};

CustomTaskList.displayName = 'CustomTaskList';

CustomTaskList.propTypes = {
};

export default withTheme(withTaskContext(CustomTaskList));
