import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import baseUrl from "../api/api";
import { Users } from "../interfaces/Users";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await baseUrl.get("users");
        console.log(response);

        setUsers(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  const onFinish = (values: any) => {
    setLoading(true);
    const user = users.find((u) => u.email === values.email);

    if (user && user.password === values.password) {
      const userInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      if (values.remember) {
        localStorage.setItem("user", JSON.stringify(userInfo));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userInfo));
      }

      if (user.role === 1) {
        notification.success;
        navigate("/admin");
      } else {
        notification.success;
        navigate("/");
      }
    } else {
      notification.error;
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto">
        <div className=" w-auto p-6 bg-white ">
          <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Địa chỉ email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
                { type: "email", message: "Email không đúng định dạng!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Địa chỉ email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a
                className="float-right text-sm text-indigo-600 hover:text-indigo-500"
                href="#"
              >
                Quên mật khẩu?
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-3">
            <span className="text-sm text-gray-600">hoặc</span>
          </div>
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-purple-500 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
