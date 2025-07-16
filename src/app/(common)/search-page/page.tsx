/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CardPage from "@/components/Filters/Card";
import {
  PropertyFilterParams,
  useGetPropertyQuery,
} from "@/redux/service/addProperty/propertyApi";

import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";
import { useGetFeaturesFilterQuery } from "@/redux/service/filterAPI/featureFilterApi";
import { useGetLifestylesQuery } from "@/redux/service/filterAPI/lifestyleAPI";
import {
  CloseOutlined,
  FilterOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { CollapseProps, MenuProps } from "antd";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Dropdown,
  Input,
  Popover,
  Row,
  Select,
  Slider,
  Space,
  Spin,
  Typography,
} from "antd";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface Agent {
  name: string;
  avatar: string;
  phone: string;
  email: string;
}

const bathroomOptions = [
  "1+ Bathrooms",
  "2+ Bathrooms",
  "3+ Bathrooms",
  "4+ Bathrooms",
];
const livingAreaOptions = [
  "1000+ sq ft",
  "2000+ sq ft",
  "3000+ sq ft",
  "4000+ sq ft",
];

export default function LuxuryHomesPage() {
  const searchParams = useSearchParams(); // Updated to useSearchParams

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sortOrder, setSortOrder] = useState<string>("Price High to Low");
  const [listingType, setListingType] = useState<string>("BUY");
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [beds, setBeds] = useState<number>(0);
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>([]);
  const [selectedLivingArea, setSelectedLivingArea] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // API calls
  const { data: propertyTypeData } = useGetPropertyTypesFilterQuery({});

  const { data: lifestylesData } = useGetLifestylesQuery();
  const { data: categoriesData } = useGetFeaturesFilterQuery({});

  useEffect(() => {
    const query = searchParams;

    if (query.get("priceRange")) {
      const [min, max] = query.get("priceRange")?.split(",").map(Number) ?? [
        0, 5000000,
      ];
      setPriceRange([min, max]);
    }
    if (query.get("sortOrder")) {
      setSortOrder(query.get("sortOrder") as string);
    }

    if (query.get("propertyType")) {
      setPropertyType(query.get("propertyType")?.split(",") ?? []);
    }

    if (query.get("beds")) {
      setBeds(Number(query.get("beds")));
    }

    if (query.get("lifestyle")) {
      setSelectedLifestyle(query.get("lifestyle")?.split(",") ?? []);
    }

    if (query.get("features")) {
      setSelectedFeatures(query.get("features")?.split(",") ?? []);
    }

    if (query.get("bathrooms")) {
      setSelectedBathrooms(query.get("bathrooms")?.split(",") ?? []);
    }

    if (query.get("livingArea")) {
      setSelectedLivingArea(query.get("livingArea")?.split(",") ?? []);
    }

    if (query.get("searchQuery")) {
      setSearchQuery(query.get("searchQuery") as string);
    }

    if (query.get("listingType")) {
      setListingType(query.get("listingType") as string);
    }
  }, [searchParams]);

  // Function to update URL query parameters
  const updateUrlParams = (newParams: { [key: string]: any }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(newParams)) {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }

      // newSearchParams.set(key, value);
    }
    // Update the URL with the new search params
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  };
  // Function to update URL query parameters;

  const currentSearchParams: PropertyFilterParams = {};
  if (searchQuery) {
    currentSearchParams.searchTerm = searchQuery;
  }

  if (listingType) {
    currentSearchParams.listingType = listingType === "BUY" ? "BUY" : "RENT";
  }

  if (beds > 0) {
    currentSearchParams.minBedRooms = beds;
  }

  if (selectedBathrooms.length > 0) {
    const bathroomMin = Math.max(
      ...selectedBathrooms.map((opt) => parseInt(opt.match(/\d+/)?.[0] || "0"))
    );
    currentSearchParams.minBathRooms = bathroomMin;
  }

  if (selectedLivingArea.length > 0) {
    const livingAreaMin = Math.max(
      ...selectedLivingArea.map((opt) => parseInt(opt.match(/\d+/)?.[0] || "0"))
    );
    currentSearchParams.minSquareFeet = livingAreaMin;
  }

  if (priceRange[0] > 0 || priceRange[1] < 5000000) {
    currentSearchParams.minPrice = priceRange[0];
    currentSearchParams.maxPrice = priceRange[1];
  }

  if (propertyType.length > 0) {
    currentSearchParams.propertyType = propertyType;
  }

  if (selectedLifestyle.length > 0) {
    currentSearchParams.lifestyle = selectedLifestyle;
  }

  if (selectedFeatures.length > 0) {
    currentSearchParams.featureNames = selectedFeatures;
  }

  // API request with currentSearchParams
  const {
    data: propertiesData,
    isLoading: loadingProperties,
    isFetching,
  } = useGetPropertyQuery(currentSearchParams);

  // Process API data
  const lifestyles =
    lifestylesData?.data?.map(
      (lifestyleItem: { lifestyle: string }) => lifestyleItem.lifestyle
    ) ?? [];

  // Filter handlers
  const handleLifestyleChange = (checkedValues: string[]) => {
    setSelectedLifestyle(checkedValues);
    updateUrlParams({ lifestyle: checkedValues.join(",") });
  };

  const handleFeatureChange = (checkedValues: string[]) => {
    setSelectedFeatures(checkedValues);
    updateUrlParams({ features: checkedValues.join(",") });
  };

  const handleBathroomChange = (checkedValues: string[]) => {
    setSelectedBathrooms(checkedValues);
    updateUrlParams({ bathrooms: checkedValues.join(",") });
  };

  const handleLivingAreaChange = (checkedValues: string[]) => {
    setSelectedLivingArea(checkedValues);
    updateUrlParams({ livingArea: checkedValues.join(",") });
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    updateUrlParams({ sortOrder: value });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
    updateUrlParams({ priceRange: value.join(",") });
  };

  const handleTypeChange = (checkedValues: string[]) => {
    setPropertyType(checkedValues);
    updateUrlParams({ propertyType: checkedValues.join(",") });
  };

  const handleBedsChange = (value: number) => {
    setBeds(value);
    updateUrlParams({ beds: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateUrlParams({ searchQuery: value });
  };

  const handleSaveSearch = () => {
    console.log("Search saved with current filters:", {
      priceRange,
      sortOrder,
      listingType,
      propertyType,
      beds,

      searchQuery,
      selectedLifestyle,
      selectedFeatures,
      selectedBathrooms,
      selectedLivingArea,
    });
  };

  // Collapse items for the filter dropdown
  const collapseItems: CollapseProps["items"] = [
    {
      key: "Lifestyle",
      label: <div style={{ fontSize: "16px", fontWeight: 600 }}>Lifestyle</div>,
      children: (
        <Checkbox.Group
          value={selectedLifestyle}
          onChange={handleLifestyleChange}
          style={{
            width: "100%",
            paddingBottom: "16px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Row gutter={[16, 8]}>
            {lifestyles.map((option) => (
              <Col span={8} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    },
    {
      key: "features",
      label: <div style={{ fontSize: "16px", fontWeight: 600 }}>Features</div>,
      children: (
        <div style={{ width: "100%" }}>
          {categoriesData?.data?.map((category) => (
            <div key={category.id}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 500, marginBottom: 8 }}>
                  {category.category}
                </div>
                <Checkbox.Group
                  value={selectedFeatures}
                  onChange={handleFeatureChange}
                  style={{ width: "100%" }}
                >
                  <Row gutter={[16, 8]}>
                    {category.subFeatures.map((feature) => (
                      <Col span={8} key={feature}>
                        <Checkbox value={feature}>{feature}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </div>
              {category.id !==
                categoriesData.data[categoriesData.data.length - 1].id && (
                <Divider style={{ margin: "12px 0" }} />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "bathrooms",
      label: <div style={{ fontSize: "16px", fontWeight: 600 }}>Bathrooms</div>,
      children: (
        <Checkbox.Group
          value={selectedBathrooms}
          onChange={handleBathroomChange}
          style={{
            width: "100%",
            paddingBottom: "16px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Row gutter={[16, 8]}>
            {bathroomOptions.map((option) => (
              <Col span={8} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    },
    {
      key: "livingarea",
      label: (
        <div style={{ fontSize: "16px", fontWeight: 600 }}>Living Area</div>
      ),
      children: (
        <Checkbox.Group
          value={selectedLivingArea}
          onChange={handleLivingAreaChange}
          style={{
            width: "100%",
            paddingBottom: "16px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Row gutter={[16, 8]}>
            {livingAreaOptions.map((option) => (
              <Col span={8} key={option}>
                <Checkbox value={option}>{option}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    },
  ];

  const dropdownContent = (
    <div
      style={{
        width: 680,
        padding: 24,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Button
          type="text"
          icon={<CloseOutlined />}
          size="small"
          style={{ border: "none", boxShadow: "none" }}
        />
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <Collapse
        items={collapseItems}
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        expandIconPosition="end"
        ghost
        style={{
          backgroundColor: "transparent",
        }}
      />
    </div>
  );

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Checkbox.Group
          value={propertyType}
          onChange={handleTypeChange}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
            {propertyTypeData?.data?.map((propertyTypeItem) => (
              <Checkbox key={propertyTypeItem.id} value={propertyTypeItem.type}>
                {propertyTypeItem.type}
              </Checkbox>
            ))}
          </div>
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:mt-6">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="flex flex-wrap gap-2 items-center flex-1">
              <div className="relative w-[300px]">
                <Search className="absolute left-2 top-1/2  h-4 w-4 z-10 -translate-y-1/2 text-gray-300" />
                <Input
                  placeholder="Search By Location (Country, City)"
                  style={{ paddingLeft: "30px" }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <Space size={8}>
                <Button
                  type={listingType === "BUY" ? "primary" : "default"}
                  onClick={() => {
                    setListingType("BUY");
                    updateUrlParams({ listingType: "BUY" });
                  }}
                  style={{
                    backgroundColor: listingType === "BUY" ? "#D4B896" : "#fff",
                    borderColor: listingType === "BUY" ? "#D4B896" : "#d9d9d9",
                    color: listingType === "BUY" ? "#000" : "#666",
                    fontWeight: 500,
                  }}
                >
                  FOR BUY
                </Button>
                <Button
                  type={listingType === "RENT" ? "primary" : "default"}
                  onClick={() => setListingType("RENT")}
                  style={{
                    backgroundColor:
                      listingType === "RENT" ? "#D4B896" : "#fff",
                    borderColor: listingType === "RENT" ? "#D4B896" : "#d9d9d9",
                    color: listingType === "RENT" ? "#000" : "#666",
                    fontWeight: 500,
                  }}
                >
                  FOR RENT
                </Button>
              </Space>

              <div>
                <Dropdown
                  menu={{ items: menuItems }}
                  trigger={["click"]}
                  placement="bottomLeft"
                >
                  <Button>
                    {propertyType.length > 0
                      ? `${propertyType.length} Selected`
                      : "Select Property Types"}
                  </Button>
                </Dropdown>
              </div>

              <Popover
                content={
                  <div style={{ width: 300, padding: 16 }}>
                    <Text strong>
                      Price Range: ${priceRange[0].toLocaleString()} - $
                      {priceRange[1].toLocaleString()}
                    </Text>
                    <Slider
                      range
                      min={0}
                      max={5000000}
                      step={50000}
                      value={priceRange}
                      onChange={handlePriceChange}
                      tipFormatter={(value) => `$${value?.toLocaleString()}`}
                      style={{ marginTop: 16 }}
                    />
                  </div>
                }
                trigger="click"
                title="Price Range"
              >
                <Button style={{ width: 120 }}>Price</Button>
              </Popover>

              <Select
                value={beds}
                onChange={handleBedsChange}
                style={{ width: 120 }}
                placeholder="Beds"
              >
                <Select.Option value={0}>Any Beds</Select.Option>
                <Select.Option value={1}>1+ Beds</Select.Option>
                <Select.Option value={2}>2+ Beds</Select.Option>
                <Select.Option value={3}>3+ Beds</Select.Option>
                <Select.Option value={4}>4+ Beds</Select.Option>
                <Select.Option value={5}>5+ Beds</Select.Option>
              </Select>

              <Dropdown
                overlay={dropdownContent}
                trigger={["click"]}
                placement="bottomLeft"
                overlayStyle={{ zIndex: 1050 }}
              >
                <Button
                  icon={<FilterOutlined />}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  More Filters
                </Button>
              </Dropdown>

              <Button onClick={handleSaveSearch}>Save Search</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Luxury Homes</Breadcrumb.Item>
          <Breadcrumb.Item>
            {listingType === "BUY" ? "For Sale" : "For Rent"}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Luxury Homes for {listingType === "BUY" ? "Sale" : "Rent"}
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {propertiesData?.data?.results?.length} properties found
            </Text>
          </div>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            style={{ width: 200 }}
            placeholder="Sort by"
          >
            <Select.Option value="Price High to Low">
              Price High to Low
            </Select.Option>
            <Select.Option value="Price Low to High">
              Price Low to High
            </Select.Option>
            <Select.Option value="Newest First">Newest First</Select.Option>
            <Select.Option value="Highest Rated">Highest Rated</Select.Option>
          </Select>
        </div>
      </div>
{(loadingProperties || isFetching) ? (
  <div className="flex justify-center items-center h-64">
    <Spin size="large" />
  </div>
) : (
  <>
    <CardPage filteredProperties={propertiesData?.data?.results || []} />

    {propertiesData?.data?.results &&
      propertiesData?.data?.results?.length > 0 && (
        <div className="text-center pb-8">
          <Button size="large" style={{ minWidth: 200 }}>
            Load More Properties
          </Button>
        </div>
      )}
  </>
)}

    </div>
  );
}
