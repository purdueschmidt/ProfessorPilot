const [major, setMajor] = useState("");
const [courses, setCourses] = useState([]);

const fetchCoursesAndMajors = async () => {
    try {
      const response = await fetch("http://localhost:6060/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  