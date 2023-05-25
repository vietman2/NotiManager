import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { AppDispatch } from "../../store";
import { authenticate, authSelector, hasToken } from "../../store/slices/auth";

export default function AuthRoute({ children }: any) {
  const auth = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();
  if (hasToken()) {
    if (!Boolean(auth.user)) {
      dispatch(authenticate());
    }
    
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
