import { useNavigate } from "react-router-dom"
import "/src/pages/home.css"

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="homeContainer">
        <div onClick={() => navigate('/courses')}>Click here to Update the Courses</div>
    </div>
  )
}

export default Home