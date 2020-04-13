const initState = {
    parties: [
        {
            partyName: '',
            participantsAge: 0,
            contactName: '',
            email: '',
            phoneNumber: '',
            payPalInfo: 0,
            partyDate: '',
            partyStartTime: 0,
            partyEndTime: 0,
            partyPackage: 0,
            roomsRequested: [],
            roomTimes: [[]],
            dayOfWeek: 0
        }
    ]
};

const partyReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PARTY_SUCCESS':
            console.log('create project success');
            return state;
        case 'CREATE_PARTY_ERROR':
            console.log('create project error');
            return state;
        default:
            return state;
    }
};

export default partyReducer