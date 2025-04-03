import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { verifyUserAPI } from "~/apis";
import Loading from "~/components/Loading/Loading";

const Verification = () => {
  const [searchParams] = useSearchParams();

  const { email, token } = Object.fromEntries([...searchParams]);

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => {
        setVerified(true);
      });
    }
  }, [email, token]);

  if (!verified) {
    return <Loading caption="Đang xác minh tài khoản của bạn..." />;
  }

  return <Navigate to={`/login?verifiedEmail=${email}`} />;
};

export default Verification;
