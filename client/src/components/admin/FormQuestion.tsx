import React, { useEffect } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { Questions } from "../../interfaces/Users";

const { Option } = Select;

interface QuestionModalProps {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  questionData: Questions;
  handleInputChange: (name: string, value: string) => void;
  handleOptionChange: (index: number, value: string) => void;
  handleAnswerChange: (value: string) => void;
  handleAddQuestion: () => void;
  handleEditQuestion: () => void;
  isEditMode: boolean;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  setIsModalOpen,
  questionData,
  handleInputChange,
  handleOptionChange,
  handleAnswerChange,
  handleAddQuestion,
  handleEditQuestion,
  isEditMode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(questionData);
  }, [form, questionData]);

  const handleSave = () => {
    form
      .validateFields()
      .then(() => {
        if (isEditMode) {
          handleEditQuestion();
        } else {
          handleAddQuestion();
        }
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Validate Failed:", error);
      });
  };

  return (
    <Modal
      visible={isOpen}
      title={isEditMode ? "Chỉnh Sửa Câu Hỏi" : "Thêm Câu Hỏi Mới"}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={questionData}
      >
        <Form.Item
          name="question"
          label="Câu Hỏi"
          rules={[{ required: true, message: "Câu hỏi không được để trống" }]}
        >
          <Input
            placeholder="Câu Hỏi"
            onChange={(e) => handleInputChange("question", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </Form.Item>

        {questionData.options.map((option, index) => (
          <Form.Item
            key={index}
            name={["options", index]}
            label={`Đáp Án ${index + 1}`}
            rules={[{ required: true, message: "Đáp án không được để trống" }]}
          >
            <Input
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Đáp Án ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </Form.Item>
        ))}

        <Form.Item
          name="answer"
          label="Đáp Án Đúng"
          rules={[
            { required: true, message: "Đáp án đúng không được để trống" },
          ]}
        >
          <Select
            placeholder="Chọn đáp án đúng"
            onChange={handleAnswerChange}
            className="w-full"
          >
            {questionData.options.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} className="bg-blue-500 text-white">
            {isEditMode ? "Cập Nhật" : "Thêm mới"}
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-800"
          >
            Hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default QuestionModal;
