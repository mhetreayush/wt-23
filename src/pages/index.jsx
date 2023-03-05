import { authentication } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
const Index = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const otpRef = useRef(null);
  const [showOtp, setShowOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      authentication
    );
  };
  const signInWithOtp = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        const user = result.user;
        // dispatch(login(user));
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("User Signed In");
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  const onSignInSubmit = () => {
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const finalPhoneNumber = "+91" + phoneNumber;
    signInWithPhoneNumber(authentication, finalPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP Sent");
        setShowOtp(true);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.message);
      });
  };
  return (
    <div className="bg-[url('/assets/loginBgMobile.svg')] md:bg-[url('/assets/loginBg.svg')] bg-cover bg-center min-h-screen min-w-screen">
      <div className="min-h-screen md:w-1/2 h-full flex items-center justify-center  rounded-md">
        <div className="bg-white h-fit w-[95%] md:w-3/4 p-8 flex flex-col gap-y-8 rounded-md drop-shadow-lg">
          <Typography variant="h4" className="text-center mb-4">
            Login
          </Typography>
          <Box className="flex flex-col gap-y-4">
            <Box className="relative flex items-center ">
              <TextField
                required
                label="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
              />
              <button
                onClick={onSignInSubmit}
                className="absolute right-5 disabled:text-gray-300 text-2xl disabled:cursor-not-allowed p-1 border border-gray-300 rounded-full transition-all duration-300"
                disabled={!phoneNumber.match(/^\d{10}$/)}
              >
                <IoArrowForwardCircleSharp />
              </button>
            </Box>

            <Box>
              <TextField
                required
                label="Enter OTP"
                fullWidth
                inputProps={{
                  className: "disabled:cursor-not-allowed",
                  disabled: !showOtp,
                }}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Box>
          </Box>
          <button onClick={signInWithOtp} className="w-full actionButton">
            Submit
          </button>
        </div>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Index;
