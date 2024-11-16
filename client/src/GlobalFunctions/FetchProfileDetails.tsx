import { axiosPrivate } from "../ApiServices/Axios";
import { setUserProfile } from "../redux/actions/userProfileActions";
import { showToast } from "../ToastServices/ToastServices";


export const fetchProfileData = async (dispatch: any) => {
  try {
    // Start loading
    const response = await axiosPrivate.post("api/v1/profile");

    // Extract and dispatch the profile data
    const profileData = response?.data?.payload;
    dispatch(setUserProfile(profileData));

    // Optionally return the profile data
    return profileData;
  } catch (error: any) {
    console.error("Error fetching profile data:", error);
    showToast(error?.response?.data?.message || "Error fetching profile data", "error", 1000);
    throw error; // Re-throw the error if the caller needs to handle it
  }
};
