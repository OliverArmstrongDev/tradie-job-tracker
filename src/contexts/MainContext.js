import { createContext, useEffect, useReducer } from "react";
import {
  collection,
  onSnapshot,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useRef } from "react";

const INIT_CLIENT_LIST_OBJECT = {
  dataIsLoaded: false,
  JobListSortFilter: {
    sortBy: "",
    filterBy: "",
  },
  AuthUID: "FOJSDD2tCIz5kRRxQSHJ", //Mock Auth UID from auth provider
  statuses: [
    {
      status: "Active",
      colour: "green",
    },
    {
      status: "Scheduled",
      colour: "blue",
    },
    {
      status: "Invoicing",
      colour: "orange",
    },
    {
      status: "To Priced",
      colour: "red",
    },
    {
      status: "Completed",
      colour: "gray",
    },
  ],
  CurrentStatusColour: "",
  CurrentlyViewedRecordUID: "",
  JobListItems: [],
  clientUID: "",
  clientFirstName: "",
  clientLastName: "",
  clientEmail: "",
  clientMobile: "",
  clientAddress: [],
  jobs: [
    {
      jobID: "",
      jobTitle: "",
      jobStatus: "",
      jobCreatedDate: "",
      jobNotes: [],
    },
  ],
};

export const MainContext = createContext(INIT_CLIENT_LIST_OBJECT);

export const MainContextReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOBS_LISTSORT_FILTER":
      return {
        ...state,
        JobListSortFilter: action.payload,
      };
    case "REFRESH_JOBS_LIST":
      return {
        ...state,
        JobListItems: action.payload,
      };
    case "SET_CURRENT_STATUS_COLOUR":
      return {
        ...state,
        CurrentStatusColour: action.payload,
      };
    case "GET_ALL_CLIENTS":
      return {
        ...state,
        clientUID: action.payload[0].CUID,
        clientFirstName: action.payload[0].data.ContactInfo.FirstName,
        clientLastName: action.payload[0].data.ContactInfo.LastName,
        clientMobile: action.payload[0].data.ContactInfo.Mobile,
        clientEmail: action.payload[0].data.ContactInfo.Email,
        clientAddress: action.payload[0].data.ContactInfo.Address,
        jobID: action.payload[0].data.JobInfo.JUID,
        jobTitle: action.payload[0].data.JobInfo.Title,
        jobStatus: action.payload[0].data.JobInfo.Status,
        jobCreatedDate:
          action.payload[0].data.JobInfo.CreatedDate.toDate().toLocaleString(),
        jobNotes: action.payload[0].data.JobInfo.Notes,
        dataIsLoaded: true,
        JobListItems: action.payload,
      };
    case "CURRENTLY_SELECTED_CLIENT_DATA":
      return {
        ...state,
        CurrentlyViewedRecordUID: action.payload.CUID,
        clientUID: action.payload.CUID,
        clientFirstName: action.payload.data.ContactInfo.FirstName,
        clientLastName: action.payload.data.ContactInfo.LastName,
        clientMobile: action.payload.data.ContactInfo.Mobile,
        clientEmail: action.payload.data.ContactInfo.Email,
        clientAddress: action.payload.data.ContactInfo.Address,
        jobID: action.payload.data.JobInfo.JUID,
        jobTitle: action.payload.data.JobInfo.Title,
        jobStatus: action.payload.data.JobInfo.Status,
        jobCreatedDate:
          action.payload.data.JobInfo.CreatedDate.toDate().toLocaleString(),
        jobNotes: action.payload.data.JobInfo.Notes,

        dataIsLoaded: true,
      };

    default:
      return state;
  }
};

export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    MainContextReducer,
    INIT_CLIENT_LIST_OBJECT
  );
  const CurrentlyViewedRecordUID = useRef();

  useEffect(() => {
    try {
    const collectionRef = collection(db, `clients/${state.AuthUID}/clientList`);

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      let allClientsData = [];
      snapshot.docs.forEach((doc) => {
        allClientsData.push({ CUID: doc.id, data: doc.data() });
      });
      if (allClientsData) {
        if (CurrentlyViewedRecordUID.current) {
          const currentlySelectedClient = allClientsData.filter(
            (client) => client.CUID === CurrentlyViewedRecordUID.current
          );
          dispatch({
            type: "CURRENTLY_SELECTED_CLIENT_DATA",
            payload: currentlySelectedClient[0],
          });
          dispatch({ type: "REFRESH_JOBS_LIST", payload: allClientsData });
        } else {
          dispatch({ type: "GET_ALL_CLIENTS", payload: allClientsData });
        }
      }
    });
    return () => unsub();
  } catch (err) {
    console.error(err);
  }
  }, [state.AuthUID]);

  const getClientDataByClientID = async (CUID) => {
    try {
      CurrentlyViewedRecordUID.current = CUID;
      const snapshot = await getDoc(
        doc(db, `clients/${state.AuthUID}/clientList`, CUID)
      );

      if (snapshot) {
        return {
          CUID: snapshot.id.trim(),
          data: snapshot.data(),
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatusInDB = async (statusToSave, CUID) => {
    try {
      const ref = doc(db, `clients/${state.AuthUID}/clientList/${CUID}`);

      await setDoc(ref, statusToSave, { merge: true })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };
  const saveNotesIntoDB = async (dataToSave, CUID) => {
    try {
      const ref = doc(db, `clients/${state.AuthUID}/clientList/${CUID}`);

      await setDoc(ref, dataToSave, { merge: true })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };
  const deleteNoteFromDB = async (noteNumberToDelete, CUID) => {
    
    try {
      const ref = doc(db, `clients/${state.AuthUID}/clientList/${CUID}`);
      await updateDoc(ref, {
        [`JobInfo.Notes.${noteNumberToDelete}`]: deleteField(),
      })
        .then((msg) => console.log(msg))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainContext.Provider
      value={{
        state,
        dispatch,
        getClientDataByClientID,
        saveNotesIntoDB,
        deleteNoteFromDB,
        updateStatusInDB,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
