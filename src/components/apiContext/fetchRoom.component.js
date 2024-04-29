import { onSnapshot,doc,where,collection,query, getDocs, getDocFromCache, getDoc } from "firebase/firestore";
import {  setProfiles, updateProfile } from "../../reduxstore/features/Channels/channelSlice";
import { firestore } from "../../firebase/firebase";





const fetchRoom = async (roomId, dispatch) => {
  const roomRef = doc(firestore, 'Rooms', roomId);
  const roomDoc = await getDoc(roomRef);

  if (!roomDoc.exists()) {
    throw new Error('Room not found');
  }

  const roomData = roomDoc.data();
  const memberIds = roomData.members;
  const profilesRef = collection(firestore, 'profile');

  const chunkSize = 10;
  const chunks = chunkArray(memberIds, chunkSize);

  const membersListeners = [];
  const unsubscribers = [];

  for (const chunk of chunks) {
    const profileQuery = query(profilesRef, where('id', 'in', chunk));

    const membersListener = onSnapshot(roomRef, (roomSnapshot) => {
      const updatedMemberIds = roomSnapshot.data().members;
      const newMembers = updatedMemberIds.filter((id) => !memberIds.includes(id));

      const newMemberProfiles = getDocs(query(profilesRef, where('id', 'in', newMembers)));

      newMemberProfiles.then((querySnapshot) => {
        querySnapshot.forEach((profileDoc) => {
          const profileData = profileDoc.data();
          const newData = {
            id: profileDoc.id,
            ...Object.fromEntries(Object.entries(profileData).filter(([key, value]) => key !== 'password')),
            timestamp: profileData.timestamp.toDate().getTime(),
          };

          dispatch(setProfiles(newData));
        });
      });
    });

    membersListeners.push(membersListener);

    const unsubscribe = onSnapshot(
      profileQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        snapshot.docChanges().flatMap((change) => {
          const profileData = change.doc.data();
          const entries = Object.entries(profileData);
          const filteredData = entries.filter(([key, value]) => key !== 'password');
          const newData = {
            id: change.doc.id,
            ...Object.fromEntries(filteredData),
            timestamp: profileData.timestamp.toDate().getTime(),
          };

          if (change.type === 'added') {
            dispatch(setProfiles(newData));
          } else if (change.type === 'modified') {
            dispatch(updateProfile(newData));
          }
        });
      }
    );

    unsubscribers.push(unsubscribe);
  }

  return { unsubscribers, membersListeners };
};



function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
   
export default fetchRoom;