"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Spin,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";
import { useGetFeaturesFilterQuery } from "@/redux/service/filterAPI/featureFilterApi";
import { useGetFilterCityQuery } from "@/redux/service/filterAPI/CityFilterApi";
import { useGetLifestylesQuery } from "@/redux/service/filterAPI/lifestyleAPI";
import { useCreatePropertyMutation } from "@/redux/service/addProperty/propertyApi";
import { toast } from "sonner";
import { RcFile } from "antd/es/upload";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

interface PropertyFormValues {
  cityId: string;
  propertyTypeId: string;
  lifestyleId: string;
  title: string;
  description: string;
  address: string;
  zipCode: string;
  lat: number;
  long: number;
  bedRooms: number;
  bathRooms: number;
  price: number;
  squareFeet: number;
  area: number;
  listingType: "BUY" | "RENT" | "SALE";
  developmentStatus: "NEW_DEVELOPMENT" | "DEVELOPED";
}

export default function AddPropertyForm() {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubFeaturesMap, setSelectedSubFeaturesMap] = useState<{
    [category: string]: string[];
  }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: propertyTypeData } = useGetPropertyTypesFilterQuery({});
  const { data: categoriesData } = useGetFeaturesFilterQuery({});
  const { data: citiesData } = useGetFilterCityQuery({});
  const { data: lifestylesData } = useGetLifestylesQuery();
  const [postProperty] = useCreatePropertyMutation();

  const handleImageChange: UploadProps["onChange"] = ({ fileList }) => {
    setImageFileList(fileList);
  };

  const handleVideoChange: UploadProps["onChange"] = ({ fileList }) => {
    setVideoFileList(fileList);
  };

  const toggleSubFeature = (category: string, feature: string) => {
    setSelectedSubFeaturesMap((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(feature)
        ? current.filter((f) => f !== feature)
        : [...current, feature];
      return { ...prev, [category]: updated };
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const onFinish = async (values: PropertyFormValues) => {
    const allSelectedSubFeatures = Object.values(selectedSubFeaturesMap).flat();
    const featureNames = [...allSelectedSubFeatures];

    const imageFiles = imageFileList
      .map((file) => file.originFileObj)
      .filter((f): f is RcFile => !!f);

    const videoFile = videoFileList[0]?.originFileObj;

    if (!videoFile || imageFiles.length === 0) {
      return toast.error("Please upload at least one image and one video.");
    }

    const payload = {
      videos: videoFile,
      images: imageFiles,
      bodyData: {
        ...values,
        featureNames,
      },
    };

    setIsLoading(true);

    try {
      const res = await postProperty(payload).unwrap();
      toast.success(res?.message || "Property submitted successfully!");
      form.resetFields();
      setImageFileList([]);
      setVideoFileList([]);
      setSelectedSubFeaturesMap({});
      setSelectedCategory(null);
    } catch {
      toast.error("An error occurred while submitting the property.");
    } finally {
      setIsLoading(false);
    }
  };

  const formItemWrapperClass = "mb-6 font-semibold text-gray-900 md:text-lg";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#f9f9f9] min-h-screen">
      <Card className="shadow-lg rounded-lg" bodyStyle={{ padding: "32px" }}>
        <Title level={3} className="mb-8 font-bold text-gray-800">
          Add Property
        </Title>

        <Spin spinning={isLoading} size="large">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <div className={formItemWrapperClass}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="e.g. Modern 3BR Apartment"
                      size="large"
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className={formItemWrapperClass}>
                  <Form.Item
                    label="Property Type"
                    name="propertyTypeId"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select Type" size="large" allowClear>
                      {propertyTypeData?.data?.map((type) => (
                        <Option key={type?.id} value={type?.id}>
                          {type?.type}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="City"
                  name="cityId"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select City" size="large" allowClear>
                    {citiesData?.data?.map((city) => (
                      <Option key={city?.id} value={city?.id}>
                        {city?.cityName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Lifestyle"
                  name="lifestyleId"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Lifestyle"
                    size="large"
                    allowClear
                  >
                    {lifestylesData?.data?.map((life) => (
                      <Option key={life?.id} value={life?.id}>
                        {life?.lifestyle}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber style={{ width: "100%" }} size="large" min={0} />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Zip Code"
                  name="zipCode"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col xs={12}>
                <Form.Item
                  label="Latitude"
                  name="lat"
                  rules={[
                    { required: true, message: "Please input the latitude!" },
                    {
                      type: "number",
                      min: -90,
                      max: 90,
                      message: "Latitude must be between -90 and 90!",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label="Longitude"
                  name="long"
                  rules={[
                    { required: true, message: "Please input the longitude!" },
                    {
                      type: "number",
                      min: -180,
                      max: 180,
                      message: "Longitude must be between -180 and 180!",
                    },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Bedrooms"
                  name="bedRooms"
                  rules={[
                    {
                      required: true,
                      message: "Please input the number of bedrooms!",
                    },
                    {
                      type: "number",
                      message: "Please enter a valid number for bedrooms!",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Bathrooms"
                  name="bathRooms"
                  rules={[
                    {
                      required: true,
                      message: "Please input the number of bathrooms!",
                    },
                    {
                      type: "number",
                      message: "Please enter a valid number for bathrooms!",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Square Feet"
                  name="squareFeet"
                  rules={[
                    {
                      required: true,
                      message: "Please input the square footage!",
                    },
                    {
                      type: "number",
                      message: "Please enter a valid number for square feet!",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
              <Col xs={12} md={6}>
                <Form.Item
                  label="Area"
                  name="area"
                  rules={[
                    { required: true, message: "Please input the area!" },
                    {
                      type: "number",
                      message: "Please enter a valid number for area!",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Listing Type"
                  name="listingType"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select Listing Type" size="large">
                    <Option value="BUY">Buy</Option>
                    <Option value="RENT">Rent</Option>
                    <Option value="SALE">Sale</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Development Status"
                  name="developmentStatus"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select Status" size="large">
                    <Option value="NEW_DEVELOPMENT">New Development</Option>
                    <Option value="DEVELOPED">Developed</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Feature Category">
              <Select
                placeholder="Select Feature Category"
                size="large"
                onChange={handleCategoryChange}
                allowClear
              >
                {categoriesData?.data?.map((item) => (
                  <Option key={item.id} value={item.category}>
                    {item.category}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {selectedCategory && (
              <div className="mb-4">
                <div className="mb-1 text-gray-600 font-medium">
                  Select Sub-Features
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoriesData?.data
                    ?.find((cat) => cat.category === selectedCategory)
                    ?.subFeatures?.map((feature: string) => {
                      const selected =
                        selectedSubFeaturesMap[selectedCategory] || [];
                      return (
                        <Tag.CheckableTag
                          key={feature}
                          checked={selected.includes(feature)}
                          onChange={() =>
                            toggleSubFeature(selectedCategory, feature)
                          }
                          style={{ padding: "6px 12px", fontSize: "14px" }}
                        >
                          {feature}
                        </Tag.CheckableTag>
                      );
                    })}
                </div>
              </div>
            )}

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                size="large"
                placeholder="Write full details..."
              />
            </Form.Item>

            <Form.Item label="Property Images">
              <Upload
                listType="picture"
                fileList={imageFileList}
                onChange={handleImageChange}
                beforeUpload={() => false}
                accept="image/*"
                multiple
              >
                <Button icon={<UploadOutlined />} size="large">
                  Upload Images
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Property Videos">
              <Dragger
                fileList={videoFileList}
                onChange={handleVideoChange}
                beforeUpload={() => false}
                accept="video/mp4,video/x-m4v,video/*"
                multiple
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Drag and drop video here or click to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Dragger>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
              >
                Submit Property
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
}
