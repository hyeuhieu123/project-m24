import { FaSignOutAlt } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import ManageUser from "./ManageUser";
import ManageCourses from "./ManageCourses";
import ManageSubjects from "./ManageSubjects";
import ManageExams from "./ManageExams";
import ManageQuestions from "./ManageQuestions";

export default function HomeAdmin() {
  return (
    <>
      <header className="bg-black">
        <div className=" mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center">
            ADMIN
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative"></div>

            <span className="text-white"> Admin</span>

            <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100 flex items-center">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex">
        <nav className="w-64 bg-gradient-to-b from-white to-gray-200 shadow-lg min-h-screen p-4">
          <ul className="space-y-4">
            <li className="flex items-center p-2 hover:bg-gray-300 rounded-md text-black">
              <Link to="userAd" className="flex">
                User
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-300 rounded-md text-black">
              <Link to="coursesAd" className="flex">
                Course
              </Link>
            </li>
          </ul>
        </nav>
        <main className="flex-grow p-6">
          <Routes>
            <Route path="userAd" element={<ManageUser />}></Route>
            <Route path="coursesAd" element={<ManageCourses />}></Route>
            <Route
              path="coursesAd/subjectAd/:id"
              element={<ManageSubjects />}
            ></Route>
            <Route
              path="coursesAd/subjectAd/examAd/:id"
              element={<ManageExams />}
            ></Route>
            <Route
              path="coursesAd/subjectAd/examAd/questionAd/:id"
              element={<ManageQuestions />}
            ></Route>
          </Routes>
        </main>
      </div>
    </>
  );
}
