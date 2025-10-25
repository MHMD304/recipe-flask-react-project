import { useFetch } from '../hooks/useFetch'
import { getAllRecipes } from '../api/fetcher'

const Recipes = () => {
    const {data:recipes} = useFetch(getAllRecipes,[])
  return (
    <div className="table">
      <ul>
        {recipes?.map(element => (
          <li key={element.id}>
            <strong>{element.title}</strong>: {element.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Recipes;