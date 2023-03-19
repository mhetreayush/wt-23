import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";

const CreateProfileModal = ({
  openModal,
  setOpenModal,
  projectId,
  createProject,
}) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("fullName");
    const uid = user.uid;
    const phoneNumber = user.phoneNumber;
    const addressLine1 = data.get("addressLine1");
    const addressLine2 = data.get("addressLine2");
    try {
      const docRef = doc(db, "userProfiles", uid);
      await setDoc(docRef, {
        name,
        phoneNumber,
        addressLine1,
        addressLine2,
      });
      setOpenModal(false);
      createProject
        ? router.push("/createProject")
        : router.push(`/project?id=${projectId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box className="modalStyle rounded-md bg-primaryYellow p-4">
            <h1 className="textHeadings text-center mb-8">Complete Profile</h1>
            <Box component="form" onSubmit={handleSubmit}>
              <Box className="flex flex-col gap-y-8">
                <TextField
                  required
                  name="fullName"
                  label="Full Name"
                  id="fullName"
                  fullWidth
                />

                <TextField
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  fullWidth
                  disabled
                  value={user?.phoneNumber}
                />
                <TextField
                  required
                  name="addressLine1"
                  label="Address Line 1"
                  id="addressLine1"
                  fullWidth
                />
                <TextField
                  name="addressLine2"
                  label="Address Line 2 (optional)"
                  id="addressLine2"
                  fullWidth
                />
                <button
                  type="submit"
                  className="actionButton w-3/4 self-center"
                >
                  Submit
                </button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default CreateProfileModal;
