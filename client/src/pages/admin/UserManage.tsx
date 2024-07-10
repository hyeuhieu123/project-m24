import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../store/reducer/adminReducer";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: number;
}

export default function UserManage() {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.admin.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(2);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  // Lọc và sắp xếp người dùng
  const filteredUsers = users.filter((user: User) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a: User, b: User) => {
    if (a.username < b.username) return sortOrder === "asc" ? -1 : 1;
    if (a.username > b.username) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Chuyển đổi thứ tự sắp xếp
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Tạo nút phân trang
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
      <input
        type="text"
        placeholder="Tìm kiếm người dùng"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-xl rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={toggleSortOrder}
              >
                Username {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th className="py-2 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item: User) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.username}</td>
                <td className="py-2 px-4">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
