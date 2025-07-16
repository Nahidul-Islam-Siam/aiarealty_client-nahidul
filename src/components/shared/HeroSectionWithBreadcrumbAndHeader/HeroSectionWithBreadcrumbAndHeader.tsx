'use client'
import { Button, Form, Select, Space, Modal, Row, Col, Card, InputNumber, Checkbox, Segmented } from "antd";
import { FilterOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import Link from "next/link";

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface HeroSectionProps {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    backgroundImage?: string;
}

const HeroSectionWithBreadcrumbAndHeader: React.FC<HeroSectionProps> = ({
    breadcrumbs = [{ title: "Home", href: "/" }, { title: "Areas" }],
    title = "Best Real Estate Areas",
    backgroundImage = "/assets/hero.png"
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
            {/* Breadcrumb */}
            <div className="absolute top-10 md:top-20 w-full z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center justify-center gap-2 text-white">
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center">
                                {item.href ? (
                                    <Link href={item.href} className="text-white hover:text-gray-200 transition-colors">
                                        {item.title}
                                    </Link>
                                ) : (
                                    <span className="text-white">{item.title}</span>
                                )}
                                {index < breadcrumbs.length - 1 && (
                                    <span className="mx-2 text-white">{'>'}</span>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Header Title */}
            <div className="absolute top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center">
                    {title}
                </h1>
            </div>

            {/* Search Form Card */}
            <div className="absolute bottom-[-50%] md:bottom-[-10%] w-full ">
                <div className="max-w-7xl mx-auto px-4">
                    <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0">
                        <Form form={form} onFinish={handleSubmit} className="space-y-6 text-[#6C6C6C]">
                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="country" className="mb-0">
                                        <Select placeholder="Country" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="state" className="mb-0">
                                        <Select placeholder="State" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={20} sm={12} md={4}>
                                    <Segmented
                                        options={["Buy", "Rent"]}
                                        value={buyRent}
                                        onChange={(value) => setBuyRent(value as string)}
                                        size="large"
                                        className="w-full"
                                    />
                                </Col>

                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="propertyType" className="mb-0">
                                        <Select placeholder="Property Type" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="price" className="mb-0">
                                        <Select placeholder="Price" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="bedrooms" className="mb-0">
                                        <Select placeholder="Bedrooms" size="large" suffixIcon={<DownOutlined />} className="w-full">
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={6}>
                                    <Button
                                        type="default"
                                        size="large"
                                        icon={<FilterOutlined />}
                                        onClick={() => setIsFilterModalOpen(true)}
                                        className="w-full h-[40px] flex items-center justify-center"
                                    >
                                        Filters
                                    </Button>
                                </Col>

                                <Col xs={24} sm={12} md={6}>
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

export default HeroSectionWithBreadcrumbAndHeader;