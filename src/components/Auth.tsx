import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  email: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  email: null,
  token: null,
};

interface AuthAction {
  type: string;
}

interface LoginAction extends AuthAction {
  type: "LOGIN";
  email: string;
  token: string;
}

interface LogoutAction extends AuthAction {
  type: "LOGOUT";
}

interface UpdateUserAction extends AuthAction {
  type: "UPDATEUSER";
  user: string;
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
        email: action.email,
        token: action.token,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
      };
    case "UPDATEUSER":
      return {
        ...state,
        user: action.user,
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
