import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
  useState,
} from "react";

interface AuthState {
  isAuthenticated: boolean;
  userData: any;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  token: null,
};

interface AuthAction {
  type: string;
}

interface LoginAction extends AuthAction {
  type: "LOGIN";
  userData: any;
  token: string;
}

interface LogoutAction extends AuthAction {
  type: "LOGOUT";
}

interface UpdateUserAction extends AuthAction {
  type: "UPDATEUSER";
  // name: null,
}

type AuthActions = LoginAction | LogoutAction | UpdateUserAction;

interface AuthContextProps {
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const authReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        userData: action.userData,
        token: action.token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
        token: null,
      };
    case "UPDATEUSER":
      return {
        ...state,
        // name: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const savedState = localStorage.getItem("authState");
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
