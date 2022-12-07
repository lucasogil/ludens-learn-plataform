import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhiWjLiat2dpW3ICPfAN7guLteGn_Sp9c",
  authDomain: "ludensfileupload.firebaseapp.com",
  projectId: "ludensfileupload",
  storageBucket: "ludensfileupload.appspot.com",
  messagingSenderId: "172550719434",
  appId: "1:172550719434:web:72b6cd751daebd0511f133",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
