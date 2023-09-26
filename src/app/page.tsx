import CourseCard from '@/components/CourseCard'
import SliderMain from '@/components/SliderMain'
import axios from 'axios';

const images = [
  '/a.jpg',
  '/b.jpg',
  '/c.jpg'
]

async function loadCourses() {
  const { data } = await axios.get('http://localhost:3000/api/course');
  return data.object;
}

export default async function Home() {
  const courses = await loadCourses();

  return (
    <main className='W-[100%]'>
      <SliderMain images={images} />
      <div>
        <div className='flex flex-wrap px-8'>
          {courses.map((item: any) => (
            <CourseCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </main>
  )
}