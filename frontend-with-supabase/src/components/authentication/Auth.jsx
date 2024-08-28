import React, { useState, useEffect, useContext } from "react";
import {
  signup,
  login,
  getCurrentUser,
  logout,
  googleSignIn,
} from "../../api/apiAuth";
import { UserContext } from "../context/userContext";
import supabase from "../../api/supabase";
import AdminPanel from "../ui/adminPanel/AdminPanel";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FaGoogle, FaSquareGooglePlus } from "react-icons/fa6";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  margin: 2rem auto;

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 90%;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-700);
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  text-decoration: underline;

  &:hover {
    color: var(--color-brand-800);
  }
`;

const GoogleButton = styled.button`
  background-color: var(--color-brand-700);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-brand-800);
  }
`;

const GoogleIcon = styled.span`
  color: white;
  font-size: 1.4rem;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WelcomeLogout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #f0f4f8;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  padding: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const WelcomeMessage = styled.p`
  font-size: 1.25rem;
  color: #333;
  margin: 0;

  span {
    font-weight: bold;
    color: var(--color-brand-700);
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  background-color: #ff4b5c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e03e4e;
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const AdminPanelContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const Auth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUserRole } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
          const { data: userProfile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", currentUser.id)
            .single();

          if (error) {
            console.error("Error fetching user role:", error.message);
          } else {
            setUserRole(userProfile.role);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [setUserRole]);

  const handleToggle = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleSignup = async (fullName, email, password) => {
    setError(null);
    try {
      const data = await signup({ fullName, email, password });
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const { data: userProfile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error.message);
        } else {
          setUserRole(userProfile.role);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    setError(null);
    try {
      const data = await login({ email, password });
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const { data: userProfile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error.message);
        } else {
          setUserRole(userProfile.role);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const data = await googleSignIn();
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const { data: userProfile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error.message);
        } else {
          setUserRole(userProfile.role);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
      setUser(null);
      setUserRole(null);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      {user ? (
        <WelcomeContainer>
          <WelcomeLogout>
            <WelcomeMessage>
              Welcome,{" "}
              <span>
                {user.user_metadata?.fullName ||
                  user.user_metadata?.name ||
                  user.email}
              </span>
              !
            </WelcomeMessage>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </WelcomeLogout>
          <AdminPanelContainer>
            <AdminPanel />
          </AdminPanelContainer>
        </WelcomeContainer>
      ) : (
        <Wrapper>
          <FormContainer>
            {!isSignUp ? (
              <LoginForm onLogin={handleLogin} error={error} />
            ) : (
              <SignupForm onSignup={handleSignup} error={error} />
            )}
          </FormContainer>

          <GoogleButton onClick={handleGoogleSignIn}>
            <GoogleIcon>
              <FaGoogle />
            </GoogleIcon>{" "}
            {isSignUp ? "Sign Up with Google" : "Sign in with Google"}
          </GoogleButton>

          <ToggleButton onClick={handleToggle}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </ToggleButton>
        </Wrapper>
      )}
    </div>
  );
};

export default Auth;
