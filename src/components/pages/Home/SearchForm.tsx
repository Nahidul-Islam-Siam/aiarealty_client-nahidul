/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Button,
  Form,
  Select,
  Row,
  Col,
  Card,
  Segmented,
  Slider,
  Popover,
} from "antd";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import FilterModal from "./FilterModal";

import { useRouter } from "next/navigation";
import { useGetCountriesQuery } from "@/redux/service/filterAPI/countryAPI";
import { useGetFilterCityQuery } from "@/redux/service/filterAPI/CityFilterApi";
import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";

const SearchForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [buyRent, setBuyRent] = useState<string>("Buy");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Keep priceRange in state for popover display and submit
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const { data: countryData } = useGetCountriesQuery();
  const { data: cityData } = useGetFilterCityQuery({});
  const { data: propertyType } = useGetPropertyTypesFilterQuery({});

  const handleSubmit = (values: Record<string, any>) => {
    const { country, city, propertyType, bedrooms, price } = values;

    const [minPrice, maxPrice] = price || priceRange;

    const query = new URLSearchParams();

    // Compose searchTerm from country and city if exist
    let searchTerm = "";
    if (country) searchTerm += country;
    if (city) searchTerm += (searchTerm ? " " : "") + city;
    if (searchTerm) query.set("searchTerm", searchTerm);

    if (propertyType) query.set("propertyType", propertyType);
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.set("priceRange", `${minPrice},${maxPrice}`);
    }
    if (bedrooms) query.set("beds", bedrooms);
    if (buyRent) query.set("listingType", buyRent.toUpperCase());

    router.push(`/search-page?${query.toString()}`);
  };

  const handleFilterSubmit = (values: Record<string, unknown>) => {
    console.log("Filter values:", values);
    setIsFilterModalOpen(false);
  };

  const priceContent = (
    <div style={{ width: 260, padding: 12 }}>
      <Slider
        range
        min={0}
        max={5000000}
        step={100000}
        value={priceRange}
        onChange={(val) => setPriceRange(val as [number, number])}
        tooltip={{ formatter: (val) => `$${val?.toLocaleString()}` }}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>${priceRange[0].toLocaleString()}</span>
        <span>${priceRange[1].toLocaleString()}</span>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0">
      <Form
        form={form}
        onFinish={handleSubmit}
        className="space-y-6 text-[#6C6C6C]"
        initialValues={{ price: priceRange }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="country" className="mb-0">
              <Select
                placeholder="Country"
                size="large"
                suffixIcon={<DownOutlined />}
                className="w-full"
                options={
                  countryData?.data?.map((country: any) => ({
                    label: country.countryName,
                    value: country.slug,
                  })) || []
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="city" className="mb-0">
              <Select
                placeholder="City"
                size="large"
                suffixIcon={<DownOutlined />}
                className="w-full"
                options={
                  cityData?.data?.map((city: any) => ({
                    label: city.cityName,
                    value: city.cityName,
                  })) || []
                }
              />
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
              <Select
                placeholder="Property Type"
                size="large"
                suffixIcon={<DownOutlined />}
                className="w-full"
                options={
                  Array.isArray(propertyType?.data)
                    ? propertyType.data.map((type: any) => ({
                        label: type.type,
                        value: type.slug,
                      }))
                    : []
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="price" className="mb-0" noStyle>
              <Popover
                content={priceContent}
                title="Select Price Range"
                trigger="click"
                open={popoverVisible}
                onOpenChange={setPopoverVisible}
              >
                <Button
                  size="large"
                  block
                  icon={<DownOutlined />}
                  className="text-left"
                >
                  Price: ${priceRange[0].toLocaleString()} - $
                  {priceRange[1].toLocaleString()}
                </Button>
              </Popover>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="bedrooms" className="mb-0">
              <Select
                placeholder="Bedrooms"
                size="large"
                suffixIcon={<DownOutlined />}
                className="w-full"
                options={[
                  { label: "1+ Beds", value: "1" },
                  { label: "2+ Beds", value: "2" },
                  { label: "3+ Beds", value: "3" },
                  { label: "4+ Beds", value: "4" },
                  { label: "5+ Beds", value: "5" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Button
              type="default"
              size="large"
              icon={<FilterOutlined />}
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full h-[40px] flex items-center md:text-[30px] text-2xl font-medium text-[#171A2A] justify-center"
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

      <FilterModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onSubmit={handleFilterSubmit}
      />
    </Card>
  );
};

export default SearchForm;
