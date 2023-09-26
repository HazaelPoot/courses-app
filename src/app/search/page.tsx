import CourseCard from "@/components/CourseCard";
import axios from "axios";

async function searchCourse(name: string) {
    const { data } = await axios.get(`http://localhost:3000/api/course?name=${name}`)
    return data.object;
}

async function SearchPage({ searchParams }: any) {
    const course = await searchCourse(searchParams.result);

    return (
        <div>
            <div className='flex flex-wrap px-8'>
                {course.length > 0 ? (
                    course.map((item: any) => (
                        <CourseCard key={item.id} data={item} />
                    ))
                ) : (
                    <div>
                        <h1 className="text-xl">
                            Lo sentimos, no hemos encontrado resultados para <b>{(searchParams as any).result}</b>.
                        </h1>
                        <p className="text-lg font-semibold mb-4 mt-8">Modifica tu búsqueda. Aquí tienes algunas ideas:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Asegúrate de que todas las palabras están escritas correctamente</li>
                            <li>Prueba con términos de búsqueda diferentes</li>
                            <li>Prueba con términos de búsqueda más generales</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage