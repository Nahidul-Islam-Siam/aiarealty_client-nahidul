"use client";

import { useState } from "react";
import { Modal, Button, Checkbox, Select, Slider, Popover, Space, Row, Col, Collapse } from "antd";
import { PlusOutlined, RightOutlined, CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useGetPropertyTypesFilterQuery } from "@/redux/service/filterAPI/PropertyTypeAPI";
// import { useGetLifestylesQuery } from "@/redux/service/filterAPI/lifestyleAPI";
// import { useGetFeaturesFilterQuery } from "@/redux/service/filterAPI/featureFilterApi";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => void;
}

const { Panel } = Collapse;

const FilterModal = ({ open, onClose, onSubmit }: FilterModalProps) => {
  // State management
  const [listingType, setListingType] = useState("FOR BUY");
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 500000]);
  const [squareFeetRange, setSquareFeetRange] = useState<[number, number]>([500, 2000]);
  const [acreageRange, setAcreageRange] = useState<[number, number]>([1, 5]);
  const [exclusiveOnly, setExclusiveOnly] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [inPerson, setInPerson] = useState(false);
  const [openHousesOnly, setOpenHousesOnly] = useState(false);
  const [pricePopoverOpen, setPricePopoverOpen] = useState(false);
  const [squareFeetPopoverOpen, setSquareFeetPopoverOpen] = useState(false);
  const [acreagePopoverOpen, setAcreagePopoverOpen] = useState(false);
  const [activePanels, setActivePanels] = useState<string[]>(['listing', 'filters']);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);


    const { data: propertyTypeData } = useGetPropertyTypesFilterQuery({});

//     {
//     "success": true,
//     "message": "Lifestyles retrieved successfully",
//     "meta": {
//         "page": 1,
//         "limit": 10,
//         "total": 2,
//         "totalPage": 1
//     },
//     "data": [
//         {
//             "id": "68705e2ffe28f77ade7e3a79",
//             "lifestyle": "High-End Fashion & Leisure",
//             "slug": "high-end fashion & leisure",
//             "createdAt": "2025-07-11T00:43:27.438Z",
//             "updatedAt": "2025-07-11T00:43:27.438Z"
//         },
//         {
//             "id": "68705e20fe28f77ade7e3a78",
//             "lifestyle": "Exclusive Housing & Properties",
//             "slug": "exclusive housing & properties",
//             "createdAt": "2025-07-11T00:43:12.571Z",
//             "updatedAt": "2025-07-11T00:43:12.571Z"
//         }
//     ]
// }
  
    // const { data: lifestylesData } = useGetLifestylesQuery();
    // const { data: categoriesData } = useGetFeaturesFilterQuery({});


  
const handlePropertyTypeChange = (id: string, checked: boolean) => {
  setSelectedPropertyTypes(prev => 
    checked 
      ? [...prev, id] 
      : prev.filter(item => item !== id)
)};
  // Handlers
  const handleClearAll = () => {
    setListingType("FOR BUY");
    setPriceRange([100000, 500000]);
    setSquareFeetRange([500, 2000]);
    setAcreageRange([1, 5]);
    setExclusiveOnly(false);
    setVirtual(false);
    setInPerson(false);
    setOpenHousesOnly(false);
  };

  const handleApply = () => {
    onSubmit({
      listingType,
      priceRange,
      squareFeetRange,
      acreageRange,
      exclusiveOnly,
      virtual,
      inPerson,
      openHousesOnly,
    });
    onClose();
  };

  const handlePanelChange = (keys: string | string[]) => {
    setActivePanels(Array.isArray(keys) ? keys : [keys]);
  };

  // Slider components
  const renderSlider = (
    title: string,
    value: [number, number],
    onChange: (value: [number, number]) => void,
    min: number,
    max: number,
    step: number,
    formatter: (value?: number) => string
  ) => (
    <div style={{ width: 250, padding: "16px 8px" }}>
      <div style={{ marginBottom: 16 }}>
        <strong>{title}</strong>
      </div>
      <Slider
        range
        value={value}
        // onChange={onChange}
        min={min}
        max={max}
        step={step}
        tooltip={{ formatter }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "12px", color: "#666" }}>
        <span>{formatter(value[0])}</span>
        <span>{formatter(value[1])}</span>
      </div>
    </div>
  );

  // Filter row component
  const FilterRow = ({
    title,
    valueText = "Any",
    popoverContent,
    popoverOpen,
    onPopoverChange,
  }: {
    title: string;
    valueText?: string;
    popoverContent: React.ReactNode;
    popoverOpen: boolean;
    onPopoverChange: (open: boolean) => void;
  }) => (
    <div className="filter-row">
      <span className="filter-title">{title}</span>
      <div className="filter-control">
        <span className="filter-value">{valueText}</span>
        <Popover
          content={popoverContent}
          trigger="click"
          open={popoverOpen}
          onOpenChange={onPopoverChange}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<PlusOutlined />}
            size="small"
            className="filter-button"
          />
        </Popover>
      </div>
    </div>
  );

  // Select popover component
  const SelectPopoverRow = ({
    title,
    options,
    placeholder = "Select",
  }: {
    title: string;
    options: { value: string; label: string }[];
    placeholder?: string;
  }) => (
    <div className="filter-row">
      <span className="filter-title">{title}</span>
      <div className="filter-control">
        <Popover
          trigger="click"
          placement="bottomRight"
          content={
            <Select
              mode="multiple"
              style={{ minWidth: 200 }}
              placeholder={placeholder}
              options={options}
            />
          }
        >
          <span className="filter-value clickable">{placeholder}</span>
        </Popover>
        <Button
          type="text"
          icon={<RightOutlined />}
          size="small"
          className="filter-button"
        />
      </div>
    </div>
  );

  return (
    <Modal
      title={
        <div className="modal-header">
          <span className="modal-title">Filters</span>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            className="close-button"
          />
        </div>
      }
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
      closeIcon={null}
      className="filter-modal"
    >
      <div className="modal-content">
        <Collapse 
          activeKey={activePanels}
          onChange={handlePanelChange}
          bordered={false}
          expandIcon={({ isActive }) => isActive ? <UpOutlined /> : <DownOutlined />}
          expandIconPosition="end"
          className="filter-collapse"
        >
          {/* Listing Type Section */}
          <Panel header="Listing Type" key="listing" className="filter-panel">
            <div className="section">
              <div className="section-header">
                <Select
                  defaultValue="Properties for Sale"
                  bordered={false}
                  suffixIcon={null}
                  className="listing-select"
                >
                  <Select.Option value="Properties for Sale">Properties for Sale</Select.Option>
                  <Select.Option value="Properties for Rent">Properties for Rent</Select.Option>
                </Select>
              </div>

              {/* Toggle Buttons */}
              <div className="toggle-buttons">
                <Space size={8}>
                  <Button
                    type={listingType === "FOR BUY" ? "primary" : "default"}
                    onClick={() => setListingType("FOR BUY")}
                    className={`toggle-button ${listingType === "FOR BUY" ? "active" : ""}`}
                  >
                    FOR BUY
                  </Button>
                  <Button
                    type={listingType === "FOR RENT" ? "primary" : "default"}
                    onClick={() => setListingType("FOR RENT")}
                    className={`toggle-button ${listingType === "FOR RENT" ? "active" : ""}`}
                  >
                    FOR RENT
                  </Button>
                </Space>
              </div>

              {/* Checkboxes */}
           <Row gutter={[16, 12]} className="checkbox-group">
  {propertyTypeData?.data?.map((propertyType) => (
    <Col span={12} key={propertyType.id}>
      <Checkbox
        checked={selectedPropertyTypes.includes(propertyType.id)}
        onChange={(e) => handlePropertyTypeChange(propertyType.id, e.target.checked)}
        className="checkbox-item"
      >
        {propertyType?.type}
      </Checkbox>
    </Col>
  ))}
</Row>
            </div>
          </Panel>

          {/* Filter Rows */}
          <Panel header="Property Filters" key="filters" className="filter-panel">
            <div className="filter-section">
              <FilterRow
                title="Price"
                popoverContent={renderSlider(
                  "Price Range",
                  priceRange,
                  setPriceRange,
                  0,
                  1000000,
                  10000,
                  (value) => `$${value?.toLocaleString()}`
                )}
                popoverOpen={pricePopoverOpen}
                onPopoverChange={setPricePopoverOpen}
              />

              <FilterRow
                title="Square Feet"
                popoverContent={renderSlider(
                  "Square Feet",
                  squareFeetRange,
                  setSquareFeetRange,
                  0,
                  10000,
                  50,
                  (value) => `${value} sq ft`
                )}
                popoverOpen={squareFeetPopoverOpen}
                onPopoverChange={setSquareFeetPopoverOpen}
              />

              <FilterRow
                title="Acreage"
                popoverContent={renderSlider(
                  "Acreage",
                  acreageRange,
                  setAcreageRange,
                  0,
                  100,
                  0.5,
                  (value) => `${value} acres`
                )}
                popoverOpen={acreagePopoverOpen}
                onPopoverChange={setAcreagePopoverOpen}
              />

              <SelectPopoverRow
                title="Features"
                options={[
                  { value: "Pool", label: "Pool" },
                  { value: "Garage", label: "Garage" },
                  { value: "Fireplace", label: "Fireplace" },
                  { value: "Garden", label: "Garden" },
                ]}
              />

              <SelectPopoverRow
                title="Lifestyles"
                options={[
                  { value: "Beach", label: "Beach" },
                  { value: "Golf", label: "Golf" },
                  { value: "Mountain", label: "Mountain" },
                  { value: "Urban", label: "Urban" },
                ]}
              />
            </div>
          </Panel>
        </Collapse>

        {/* Footer */}
        <div className="modal-footer">
          <Button type="text" onClick={handleClearAll} className="clear-button">
            CLEAR ALL
          </Button>
          <Button type="primary" onClick={handleApply} className="apply-button">
            APPLY
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;

// CSS-in-JS styles
const styles = `
  .filter-modal .ant-modal-header {
    border-bottom: none;
    padding-bottom: 16px;
  }
  
  .filter-modal .ant-modal-body {
    padding-top: 0;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-title {
    font-size: 24px;
    font-weight: normal;
  }
  
  .close-button {
    border: none;
    box-shadow: none;
  }
  
  .modal-content {
    padding: 0 0 24px 0;
  }
  
  .filter-collapse {
    background: transparent;
  }
  
  .filter-collapse > .ant-collapse-item {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .filter-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }
  
  .filter-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    color: #666;
  }
  
  .filter-panel .ant-collapse-content-box {
    padding: 16px 0;
  }
  
  .section {
    margin-bottom: 16px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .listing-select {
    font-size: 14px;
    color: #666;
  }
  
  .toggle-buttons {
    margin-bottom: 20px;
  }
  
  .toggle-button {
    font-weight: 500;
    font-size: 13px;
  }
  
  .toggle-button.active {
    background-color: #D4B896;
    border-color: #D4B896;
    color: #000;
  }
  
  .checkbox-group {
    margin-top: 16px;
  }
  
  .checkbox-item {
    font-size: 13px;
    color: #666;
  }
  
  .filter-section {
    padding-top: 8px;
  }
  
  .filter-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 16px;
  }
  
  .filter-title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .filter-control {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .filter-value {
    font-size: 14px;
    color: #666;
  }
  
  .clickable {
    cursor: pointer;
  }
  
  .filter-button {
    color: #999;
    padding: 0;
    min-width: 24px;
    height: 24px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    padding-top: 24px;
    border-top: 1px solid #f0f0f0;
    margin-top: 24px;
  }
  
  .clear-button {
    color: #666;
    font-weight: 500;
    font-size: 13px;
    padding: 0;
    height: auto;
  }
  
  .apply-button {
    background-color: #D4B896;
    border-color: #D4B896;
    color: #000;
    font-weight: 500;
    font-size: 13px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}