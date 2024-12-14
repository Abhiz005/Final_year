import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Global Styles
import "./App.css";

// Components
import Header from "./components/1Header";
import DynamicIsland from "./components/2DynamicIsand";
import EmblaCarousel from "./components/4embala";
import Info from "./components/6Info";
import NumberBadge from "./components/7hashtag";
import LikeButton from "./components/8Like";
import Review from "./components/11Review";
import Lineback from "./components/10Lineback"; // Import Lineback
import Map from "./components/12Map";
import FeedBack from "./components/13FeedBack";
import Footer from "./components/14Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchIcon from "./components/3SearchIcon";

// Pages
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import EmailVerificationPage from "./components/pages/EmailVerificationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import DashboardPage from "./components/pages/DashboardPage";

// State Management
import { useAuthStore } from "./components/store/authStore";

// Constants
const OPTIONS = { loop: true };

// Protected Routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Main Application Component
function App() {
  // State
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const [collegeData, setCollegeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colleges, setColleges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Effects
  useEffect(() => {
    checkAuth(); // Runs on initial load to verify authentication
  }, [checkAuth]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("http://localhost:4001/college");
        console.log("Fetched College Data:", res.data);

        // Sort colleges by the first `number` value in ascending order
        const sortedData = res.data.sort((a, b) => {
          const aNumber = parseInt(a.number[0], 10) || 0;
          const bNumber = parseInt(b.number[0], 10) || 0;
          return aNumber - bNumber;
        });

        setCollegeData(sortedData);
        setColleges(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchColleges();
  }, []);

  // Handle loading state
  if (isCheckingAuth) return <LoadingSpinner />;

  // Handlers
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setColleges(collegeData); // Reset to full list if search is empty
      setSelectedCourse(null); // Reset course selection
    } else {
      const filteredColleges = collegeData.filter((college) => {
        return Object.keys(college.courses).some((course) =>
          course.toLowerCase().includes(query.toLowerCase())
        );
      });

      setColleges(filteredColleges);
      setCurrentIndex(0); // Reset carousel to first college in filtered results

      const foundCourse = collegeData
        .flatMap((college) =>
          Object.keys(college.courses).filter((course) =>
            course.toLowerCase().includes(query.toLowerCase())
          )
        )
        .find((course) => course.toLowerCase().includes(query.toLowerCase()));

      setSelectedCourse(foundCourse);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const incrementLikeCount = async () => {
    const updatedCollege = {
      ...colleges[currentIndex],
      likeCount: colleges[currentIndex].likeCount + 1,
    };

    try {
      await axios.put(
        `http://localhost:4001/college/${colleges[currentIndex]._id}`,
        { likeCount: updatedCollege.likeCount }
      );

      const updatedColleges = [...colleges];
      updatedColleges[currentIndex] = updatedCollege;
      setColleges(updatedColleges);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const currentCollege = colleges[currentIndex] ?? {};
  const courseDetails = selectedCourse
    ? currentCollege.courses[selectedCourse] || {}
    : {};

  // Render
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <SearchIcon onSearch={handleSearch} />
              <DynamicIsland />
              <Lineback courseName={selectedCourse || "Colleges"} />
              {colleges.length > 0 && (
                <>
                  <NumberBadge
                    number={
                      courseDetails.number
                        ? courseDetails.number[0]
                        : currentCollege.number[0] || "N/A"
                    }
                  />
                  <EmblaCarousel
                    slides={colleges.map((college) => college.image)}
                    options={OPTIONS}
                    onSlideChange={handleSlideChange}
                  />
                  <LikeButton
                    likeCount={
                      courseDetails.likeCount || currentCollege.likeCount || 0
                    }
                    onLike={incrementLikeCount}
                  />
                  <Info
                    name={currentCollege.name ?? "Unknown"}
                    location={currentCollege.location ?? "N/A"}
                    fees={
                      courseDetails.fees ||
                      currentCollege.fees || ["Not Available"]
                    }
                  />
                  <Review />
                  <Map
                    latitude={currentCollege.latitude ?? 0}
                    longitude={currentCollege.longitude ?? 0}
                  />
                </>
              )}
              <FeedBack />
              <Footer />
            </>
          }
        />
        {/* Authentication Pages */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/DashboardPage"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
