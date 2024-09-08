import AlumniPost from "./AlumniPost";
import Dashboard from "./Dashboard";
import SpecialEvents from "./SpecialEvents";
import StudentAchievements from "./StudentAchievements ";

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