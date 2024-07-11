import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/reducers/admin/getUsers";
import { Form, Input, Button, notification, Select } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import baseUrl from "../../api/api";

const { Option } = Select;

const NewUserForm = ({
  setModalVisible,
}: {
  setModalVisible: (visible: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const checkEmailExists = async (email: string) => {
    try {
      const response = await baseUrl.get(`users?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleAddUser = async (values: any) => {
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        throw new Error("Email đã được sử dụng");
      }

      const newUser = {
        name: values.name,
        email: values.email,
        profilePicture:
          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
        role: values.role,
        status: true,
        password: values.password,
      };

      if (newUser) {
        dispatch(addUser(newUser));
        setModalVisible(false);
        notification.success({
          message: "Thành công",
          description: "Thêm mới người dùng thành công",
        });
        form.resetFields();
      } else {
        throw new Error("Không thể thêm người dùng");
      }
    } catch (error: any) {
      notification.error({
        message: "Thêm mới thất bại",
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Thêm mới người dùng
        </h2>
        <Form
          form={form}
          name="newUser"
          onFinish={handleAddUser}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nhập họ và tên"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Địa chỉ email"
            rules={[
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                validator: async (_, value) => {
                  if (value) {
                    const exists = await checkEmailExists(value);
                    if (exists) {
                      return Promise.reject("Email đã được sử dụng");
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Nhập địa chỉ email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò!",
              },
            ]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value={0}>Người dùng</Option>
              <Option value={1}>Quản trị viên</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className=" bg-blue-500 text-white"
              >
                Thêm mới
              </Button>
              <Button
                onClick={() => setModalVisible(false)}
                className=" text-gray-800"
              >
                Hủy
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewUserForm;
