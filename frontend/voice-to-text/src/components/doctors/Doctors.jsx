import "./doctors.css"
import sphere2 from "../../assets/images/Ellipse 2.png"
import sphere3 from "../../assets/images/Ellipse 3.png"
import Doctor from "../doctor/Doctor"

const Doctors = () => {
  return (
    <div className="doctors-container">
        <h3>Our Doctors</h3>
        <p>Teamwork and effective communication among Doctor members is critical to <br /> providing high-quality patient care and ensuring positive health outcomes.</p>

        <img className="sphere2" src={sphere2} alt="sphere2" />
        <img className="sphere3" src={sphere3} alt="sphere3" />

        <div className="doctors-wrapper">
            <Doctor />
        </div>

        <button>Explore More</button>

    </div>
  )
}

export default Doctors