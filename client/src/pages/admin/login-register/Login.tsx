import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<LoginForm> = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Định dạng email không hợp lệ";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "email") {
      const email = e.target.value;
      const response = await axios.get(
        `http://localhost:3000/users?email_like=${email}`
      );

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].email === email) {
          const password = response.data[i].password;
          // console.log(password);
        }
      }
      // console.log(response.data.length);
      // console.log(email);
    }
    // console.log(e.target.value);
  };
  const handleChangePassword = async (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const passwordLogin = await bcrypt.hash(formData.password, 10);
    // console.log(passwordLogin);
    if (validate()) {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const user = response.data.find(
          (user: any) => user.email === formData.email
        );

        if (user) {
          const passwordMatch = await bcrypt.compare(
            formData.password,
            user.password
          );
          console.log(formData.password);
          console.log(user.password);
          console.log(passwordMatch);

          if (passwordMatch) {
            console.log("Đăng nhập thành công:", user);
            navigate("/admin");
          } else {
            setErrorMessage(
              "Mật khẩu không đúng. Vui lòng kiểm tra lại thông tin."
            );
          }
        } else {
          setErrorMessage(
            "Email không tồn tại. Vui lòng kiểm tra lại thông tin."
          );
        }
      } catch (error) {
        setErrorMessage(
          "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin."
        );
        console.error("Lỗi khi đăng nhập:", error);
      }
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formData.password}
                  onChange={handleChangePassword}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đăng nhập
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Chưa có tài khoản?{" "}
                <a
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href="/register"
                >
                  Đăng ký tại đây
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
