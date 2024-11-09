import React, { useState, useEffect } from "react";
import Header from "./components/1Header";
import EmblaCarousel from "./components/4embala";
import "./App.css";
import DynamicIsland from "./components/2DynamicIsand";
import Info from "./components/6Info";
import Review from "./components/11Review";
import Lineback from "./components/10Lineback";
import NumberBadge from "./components/7hashtag";
import LikeButton from "./components/8Like";
import Map from "./components/12Map";
import FeedBack from "./components/13FeedBack";
import Footer from "./components/14Footer";
import axios from "axios";

const OPTIONS = { loop: true };

function App() {
  const [collegeData, setCollegeData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colleges, setColleges] = useState(() => {
    const savedColleges = localStorage.getItem("colleges");
    return savedColleges ? JSON.parse(savedColleges) : [];
  });

  // Fetch college data
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("http://localhost:4001/college");
        console.log("Fetched College Data:", res.data);
        setCollegeData(res.data);
        setColleges(res.data); // Ensure state reflects updated data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchColleges();
  }, []);

  // Handle slide change
  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  // Update the like count in both frontend and backend
  const incrementLikeCount = async () => {
    const updatedCollege = {
      ...colleges[currentIndex],
      likeCount: colleges[currentIndex].likeCount + 1,
    };
    try {
      // Send the updated like count to the backend
      await axios.put(
        `http://localhost:4001/college/${colleges[currentIndex]._id}`, // Ensure the ID is correct
        { likeCount: updatedCollege.likeCount } // Send the updated likeCount
      );

      // After successfully updating the backend, update the frontend
      const updatedColleges = [...colleges];
      updatedColleges[currentIndex] = updatedCollege;
      setColleges(updatedColleges);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const currentCollege = colleges[currentIndex] ?? {};

  return (
    <>
      <Header />
      <DynamicIsland />
      <Lineback />

      {collegeData.length > 0 && (
        <>
          <NumberBadge number={currentCollege.number ?? "N/A"} />
          <EmblaCarousel
            slides={collegeData.map((college) => college.image)}
            options={OPTIONS}
            onSlideChange={handleSlideChange}
          />
          <LikeButton
            likeCount={currentCollege.likeCount ?? 0}
            onLike={incrementLikeCount}
          />
          <Info
            name={currentCollege.name ?? "Unknown"}
            location={currentCollege.location ?? "N/A"}
            fees={currentCollege.fees ?? "Not Available"}
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
  );
}

export default App;
