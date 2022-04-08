import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class SegmentUtil {
  getPersonaData = async (userId) => {
    console.debug('Getting persona:', userId);
    if(process.env.FLEX_APP_FUNCTIONS_BASE){
        const fetchUrl = `${process.env.FLEX_APP_FUNCTIONS_BASE}/fetchPersona`;
        const fetchBody = {
            Token: manager.store.getState().flex.session.ssoTokenPayload.token,
            idType: 'user_id',
            limit: 100,
            identifier: userId
        };
        const fetchOptions = {
            method: 'POST',
            body: new URLSearchParams(fetchBody),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
    
        let data;
        try {
            const response = await fetch(fetchUrl, fetchOptions);
            data = await response.json();
            console.debug('Persona data:', data);
        } catch (error) {
            console.error('Failed to get template strings');
        }
    
        return data;
    }

    else {
        console.log('No Segment Service Base URL. Segment Mode deactivated,');
        return null;
    };
}

}

const segmentUtil = new SegmentUtil();

export default segmentUtil;