export const createParty = (party) => {
    return (dispatch, getState, {getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('Parties').add({
            ...party,
            paid: true
        }).then(() => {
            dispatch({ type: 'CREATE_PARTY_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_PARTY_ERROR' }, err);
        });
    }
};