'use client'
import { Button, Form, Select, Space, Modal, Row, Col, Card, InputNumber, Checkbox, Segmented } from "antd";
import { FilterOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/typography/Title";

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface HeroSectionProps {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    backgroundImage?: string;
}

const HeroSectionWithSingleRowFilter: React.FC<HeroSectionProps> = ({
    backgroundImage = "/assets/hero.png",
    title
}) => {
    const [form] = Form.useForm();
    const [buyRent, setBuyRent] = useState<string>("Buy");
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleSubmit = (values: Record<string, unknown>) => {
        console.log("Search values:", { ...values, buyRent });
    };

    const handleFilterSubmit = (values: Record<string, unknown>) => {
        console.log("Filter values:", values);
        setIsFilterModalOpen(false);
    };

    return (
        <div className="w-full h-[360px] bg-no-repeat bg-cover relative font-inter text-base md:text-xl md:mb-24 mb-72"
            style={{
                backgroundImage: `url("${backgroundImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
          
            {
                title !=='Immigration Services' &&(

                <div className="absolute bottom-[-50%] md:bottom-[-10%] w-full ">
                    <div className="max-w-7xl mx-auto px-4">
                        <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0">
                            <Form form={form} onFinish={handleSubmit} className="space-y-6  text-[#6C6C6C]">
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={12} md={5}>
                                        <Form.Item name="country" className="mb-0">
                                            <Select placeholder="Country" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={4}>
                                        <Form.Item name="city" className="mb-0">
                                            <Select placeholder="City" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                
                                    <Col xs={24} sm={12} md={5}>
                                        <Form.Item name="company-agent-name" className="mb-0">
                                            <Select placeholder="Company/Agent Name" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    {
                                        title =='mortgage' &&
                                        <Col xs={24} sm={12} md={4}>
                                            <Form.Item name="mortgage-type" className="mb-0">
                                                <Select placeholder="Mortgage Type" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    }
                                    {
                                        title =='Find-Agent' &&
                                    <Col xs={24} sm={12} md={4}>
                                        <Form.Item name="agents" className="mb-0">
                                            <Select placeholder="Agent" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    }
                                    <Col xs={24} sm={12} md={4}>
                                        <Button
                                            type="primary"
                                            size="large"
                                            htmlType="submit"
                                            className="w-full text-[#171A2A] h-[40px] bg-[#E2C59F] hover:bg-[#B8A366] border-[#CBB677] hover:border-[#B8A366]"
                                        >
                                            Search
                                        </Button>
                                    </Col>
                                </Row>

                        
                            </Form>
                        </Card>
                    </div>
                </div>
                )
            }

            <Modal
                title={<div className="flex items-center gap-2"><FilterOutlined /><span>Advanced Filters</span></div>}
                open={isFilterModalOpen}
                onCancel={() => setIsFilterModalOpen(false)}
                width={700}
                footer={null}
                className="filter-modal"
            >
                <Form onFinish={handleFilterSubmit} layout="vertical" className="mt-6">
                    <div className="space-y-6">
                        {/* Listing Type Section */}
                        <div>
                            <Title level={5} className="mb-4 text-gray-900">Listing Type</Title>
                            <Row gutter={[16, 16]}>
                                <Col xs={12}>
                                    <Form.Item name="listingType" className="mb-0">
                                        <Segmented
                                            options={["For Buy", "For Rent"]}
                                            value={buyRent}
                                            onChange={(value) => setBuyRent(value as string)}
                                            size="large"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>

                        {/* Filters Section */}
                        <div>
                            <Title level={5} className="mb-4 text-gray-900">Filters</Title>
                            <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                    <Form.Item name="exclusive" valuePropName="checked" className="mb-0">
                                        <Checkbox>Sotheby&apos;s International Realty Exclusive Only</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item name="virtual" valuePropName="checked" className="mb-0">
                                        <Checkbox>Virtual</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item name="inPerson" valuePropName="checked" className="mb-0">
                                        <Checkbox>In Person</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item name="openHouses" valuePropName="checked" className="mb-0">
                                        <Checkbox>Open Houses Only</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>

                        {/* Price and Acreage Section */}
                        <div>
                            <Title level={5} className="mb-4 text-gray-900">Property Details</Title>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="price" label="Price">
                                        <InputNumber
                                            placeholder="Price"
                                            size="large"
                                            className="w-full"
                                            min={0}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="acreage" label="Acreage">
                                        <InputNumber
                                            placeholder="Acreage"
                                            size="large"
                                            className="w-full"
                                            min={0}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                        <Button
                            type="text"
                            onClick={() => form.resetFields()}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Clear All
                        </Button>
                        <Space>
                            <Button size="large" onClick={() => setIsFilterModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                htmlType="submit"
                                className="bg-[#CBB677] hover:bg-[#B8A366] border-[#CBB677] hover:border-[#B8A366]"
                            >
                                Apply Filters
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default HeroSectionWithSingleRowFilter;