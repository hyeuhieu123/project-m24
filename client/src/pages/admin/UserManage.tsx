import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const state: any = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  console.log(state.admin.users);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-xl rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {state.admin.users.map((item: any) => {
              return (
                <tr>
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.username}</td>
                  <td className="py-2 px-4">{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
