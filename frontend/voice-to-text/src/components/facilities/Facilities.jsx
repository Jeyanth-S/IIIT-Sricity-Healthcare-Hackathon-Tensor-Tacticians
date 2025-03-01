import "./facilities.css"
import facility1 from "../../assets/images/facility1.jpg"
import facility2 from "../../assets/images/facility2.jpg"

const Facilities = () => {
  return (
    <div className="facilities-container">
        <h3>Our Facilities</h3>

        <div className="facilities-wrapper">

            <div className="facility-details">
                <div className="facility-detail-head">
                    <h6>Clinical facilities are the backbone of<br />modern healthcare systems</h6>
                </div>
                <div className="facility-detail-body">
                    <p>Providing essential resources for the diagnosis, treatment, and management of various medical conditions. These facilities encompass a wide range of settings, from hospitals and clinics to diagnostic laboratories and rehabilitation centers. In this article, we will explore the vital role that clinical facilities play in delivering high-quality healthcare and improving patient outcomes</p>
                </div>
                <div className="facility-detail-button">
                    <button>Find Out More</button>
                </div>
            </div>

            <div className="facility-images">
                <img className="facility1" src={facility1} alt="facility1" />
                <img className="facility2" src={facility2} alt="facility2" />
            </div>

        </div>
    </div>
  )
}

export default Facilities