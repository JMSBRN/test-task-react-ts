import { Course } from "./interfaces";

function CourseCard({ course }:{ course: Course }) {
    const { bgColor, name } = course;
  return (
    <div className="course">
    <div style={{ backgroundColor: `${bgColor}`}} className="imageContainer">
      <img src={course.image} alt="course-image" />
    </div>
    <div
      className="course-name"
    >
      {name}
    </div>
  </div>
  )
}

export default CourseCard;