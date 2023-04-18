const [major, setMajor] = useState("");
const [courses, setCourses] = useState([]);
const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const fetchCoursesAndMajors = async () => {
    try {
      const response = await fetch(`${apiServerUrl}/api/courses`);
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
  