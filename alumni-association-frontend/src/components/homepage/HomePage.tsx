import AlumniPost from "./AlumniPost"
import Appbar from "./Appbar"
import Dashboard from "./Dashboard"
import SpecialEvents from "./SpecialEvents"
import StudentAchievements from "./StudentAchievements "
import Footer from "./Footer"

export default function HomePage() {
    return(
        <div>
            <div>
                <Dashboard />
            </div>
            <div>
                <StudentAchievements/>
            </div>
            <div>
                <AlumniPost />
            </div>
            <div>
                <SpecialEvents />
            </div>
        </div>
    )
}