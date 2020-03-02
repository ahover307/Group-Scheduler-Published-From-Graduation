const initState = {
    parties: [
        {
            partyName: 'Alex Hover',
            partyKidBirthday: '12/11/1997',
            hostName: 'Trevor Zack',
            email: 'ahover307@gmail.com',
            phone: '12345',
            paid: true,
            startTime: '3/8/2020 2:00',
            endTime: '3/8/2020 4:00',
            partyPackage: 1,
            mainGymStart: '2:00',
            mainGymEnd: '3:20'
        }
    ]
};

//todo Do something with this
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