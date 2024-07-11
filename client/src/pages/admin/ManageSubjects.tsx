import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExamSubjects } from "../../interfaces/Users";
import {
  addSubject,
  deleteSubject,
  editSubject,
  fetchSubjects,
} from "../../store/reducers/admin/getSubject";
import SubjectModal from "../../components/admin/FormSubject";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageSubjects() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();

  const subjects: ExamSubjects[] = useSelector(
    (state: any) => state.subject.subject
  );

  const [newSubject, setNewSubject] = useState<any>({
    title: "",
    description: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/20.jpg?alt=media&token=a41bd001-b347-4d45-876e-b408f734a36a",
    courseId: Number(id),
  });
  const [editingSubject, setEditingSubject] = useState<null | ExamSubjects>(
    null
  );
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchSubjects(id));
  }, [dispatch]);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingSubject(null);
    setNewSubject({
      title: "",
      description: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/project-df4f0.appspot.com/o/20.jpg?alt=media&token=a41bd001-b347-4d45-876e-b408f734a36a",
      courseId: Number(id),
    });
  };

  const handleAddSubject = () => {
    dispatch(addSubject(newSubject));
    closeModal();
  };

  const handleEditSubject = (subject: ExamSubjects) => {
    setEditingSubject(subject);
    setNewSubject(subject);
    openModal();
  };

  const handleSaveSubject = () => {
    dispatch(editSubject(newSubject));
    closeModal();
  };

  const handleDeleteSubject = (subjectId: number) => {
    dispatch(deleteSubject(subjectId));
  };

  const handleNext = (id: number) => {
    navigate(`/admin/coursesAd/subjectAd/examAd/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Môn Thi</h1>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Thêm Mới
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">STT</th>
            <th className="py-2 px-4 border-b">Tiêu Đề</th>

            <th className="py-2 px-4 border-b">Mô Tả</th>
            <th className="py-2 px-4 border-b">Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject: ExamSubjects, index: number) => (
            <tr
              key={subject.id}
              className="hover:bg-gray-300"
              onClick={() => handleNext(subject.id)}
            >
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                {subject.title}
              </td>

              <td className="py-2 px-4 border-b text-center">
                {subject.description}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditSubject(subject);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubject(subject.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SubjectModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        subject={newSubject}
        setSubject={setNewSubject}
        handleSave={editingSubject ? handleSaveSubject : handleAddSubject}
        isEditing={!!editingSubject}
      />
    </div>
  );
}
