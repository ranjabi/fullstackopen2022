const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
  {parts.map((part) => <Part part={part} />)}
  </>
);

const Course = ({ course }) => 
<>
<Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((prev, cur) => prev + cur.exercises, 0)}
      />
</>;

export default Course