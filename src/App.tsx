import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./styles/globals.scss";
import MenuButton from "./components/MenuButton";
import CourseCard from "./components/CourseCard";
import { Course } from "./components/interfaces";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const allThemesValue = "Все темы";
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterValue, setFilterValue] = useLocalStorage({
    key: 'filter',
    defaultValue: allThemesValue,
  });

  useEffect(() => {
    fetch("https://logiclike.com/docs/courses.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((e) => console.log(e));
  }, []);
  const handleFilter = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = e.currentTarget.value;
    setFilterValue(value);
  }, []);
  

  const filteredCourses = useMemo(() => {
    if (filterValue !== allThemesValue) {
      return courses.filter((course) => course.tags.includes(filterValue));
    }
    return courses;
  }, [courses, filterValue, allThemesValue]);

  const MemoizedCourseCard = memo(CourseCard);
  return (
    <div className="container">
      <div className="menu">
        <div className="filters">
          <MenuButton
            className="all-courses"
            onClick={handleFilter}
            text={allThemesValue}
            value={allThemesValue}
          />
          {[...new Set(courses.flatMap((course) => course.tags))].map(
            (filter, idx) => (
              <MenuButton
                onClick={handleFilter}
                text={filter}
                value={filter}
                className="filter"
                key={idx.toString()}
              />
            )
          )}
        </div>
      </div>
      <div className="courses-container">
        <div className="courses">
          {filteredCourses.map((course) => (
            <MemoizedCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
