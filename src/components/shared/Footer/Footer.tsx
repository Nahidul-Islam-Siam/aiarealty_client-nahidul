"use client";
import { Layout, Row, Col, Typography, Select, Space, Divider } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Flag from "react-world-flags";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

export default function Component() {
  const handleCountryChange = (value: string) => {
    console.log("Selected country:", value);
  };

  return (
    <Footer
      style={{
        backgroundColor: "#171A1C",
        color: "#ffffff",
        padding: "60px 50px 30px 50px",
      }}
      className="font-inter"
    >
      <div className="container">
        <Row gutter={[48, 32]}>
          {/* Properties Column */}
          <Col xs={24} sm={12} md={6}>
            <Title
              level={4}
              style={{
                color: "#ffffff",
                marginBottom: "24px",
                fontWeight: "bold",
                fontSize: "26px",
              }}
            >
              Properties
            </Title>
            <Space direction="vertical" size="middle">
              <Link
                href="/search-page?listingType=BUY"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Property for Sale
              </Link>
              <Link
                href="/search-page?listingType=RENT"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
                className="hover:text-[#E2C59F] transition-colors"
              >
                Property for Rent
              </Link>
              <Link
                href="/search-page"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                New Developments
              </Link>
            </Space>
          </Col>

          {/* AIREALTY Column */}
          <Col xs={24} sm={12} md={6}>
            <Title
              level={4}
              style={{
                color: "#ffffff",
                marginBottom: "24px",
                fontWeight: "bold",
                fontSize: "26px",
              }}
            >
              AIREALTY
            </Title>
            <Space
              direction="vertical"
              size="middle"
              style={{ marginBottom: "32px" }}
            >
              <Link
                href="/about"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                About Us
              </Link>
              <Link
                href="/signup"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Join Us
              </Link>
              <Link
                href="/contact"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Contact Us
              </Link>
            </Space>

            <div style={{ marginBottom: "16px" }}>
              <Text
                style={{
                  color: "#d9d9d9",
                  fontSize: "16px",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Follow Us
              </Text>
              <Space size="middle">
                <Link href="#" style={{ color: "#d9d9d9" }}>
                  <InstagramOutlined
                    style={{
                      fontSize: "20px",
                      padding: "8px",
                      border: "2px solid #E2C59F",
                      borderRadius: "50%",
                       color: "#ffffff", 
                    }}
                  />
                </Link>
                <Link href="#" style={{ color: "#d9d9d9" }}>
                  <FacebookOutlined
                    style={{
                      fontSize: "20px",
                      padding: "8px",
                      border: "2px solid #E2C59F",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
                <Link href="#" style={{ color: "#d9d9d9" }}>
                  <LinkedinOutlined
                    style={{
                      fontSize: "20px",
                      padding: "8px",
                      border: "2px solid #E2C59F",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
                <Link href="#" style={{ color: "#d9d9d9" }}>
                  <TwitterOutlined
                    style={{
                      fontSize: "20px",
                      padding: "8px",
                      border: "2px solid #E2C59F",
                      borderRadius: "50%",

                    }}
                    className="text-[#ffffff] hover:text-[#E2C59F]"
                  />
                </Link>
              </Space>
            </div>
          </Col>

          {/* Global Column */}
          <Col xs={24} sm={12} md={6}>
            <Title
              level={4}
              style={{
                color: "#ffffff",
                marginBottom: "24px",
                fontWeight: "bold",
                fontSize: "26px",
              }}
            >
              Global
            </Title>
            <Select
              placeholder="Select a country"
              size="large"
              className="w-full"
              onChange={handleCountryChange}
            >
              <Select.Option value="US">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Flag
                    code="US"
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <span>United States</span>
                </div>
              </Select.Option>
              <Select.Option value="GB">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Flag
                    code="GB"
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <span>United Kingdom</span>
                </div>
              </Select.Option>
              <Select.Option value="IN">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Flag
                    code="IN"
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  <span>India</span>
                </div>
              </Select.Option>
              {/* Add more countries similarly */}
            </Select>
          </Col>

          {/* Professional Column */}
          <Col xs={24} sm={12} md={6}>
            <Title
              level={4}
              style={{
                color: "#ffffff",
                marginBottom: "24px",
                fontWeight: "bold",
                fontSize: "26px",
              }}
            >
              Professional
            </Title>
            <Space direction="vertical" size="middle">
              <Link
                href="/find-agent"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Real Estate Agents
              </Link>
              <Link
                href="/find-agent"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Developers
              </Link>
              <Link
                href="/mortgage"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Mortgage Adviser
              </Link>
              <Link
                href="/currency-exchange"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Currency Exchange
              </Link>
              <Link
                href="/immigration"
                style={{
                  color: "#d9d9d9",
                  fontSize: "20px",
                  fontWeight: "normal",
                }}
              >
                Immigration & Law Services
              </Link>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#666", margin: "48px 0 24px 0" }} />

        {/* Copyright and Legal Links */}
        <div style={{ textAlign: "center" }}>
          <Text
            style={{
              color: "#d9d9d9",
              fontSize: "14px",
              display: "block",
              marginBottom: "16px",
            }}
          >
            © 1999 – 2024 Aiarealty International Real Estate all rights
            reserved. Each office is independently owned and operated.
          </Text>
          <Space size="large" wrap>
            <Link href="#" style={{ color: "#d9d9d9", fontSize: "14px" }}>
              Terms of Service
            </Link>
            <Link href="#" style={{ color: "#d9d9d9", fontSize: "14px" }}>
              Privacy Policy
            </Link>
            <Link href="#" style={{ color: "#d9d9d9", fontSize: "14px" }}>
              Cookies
            </Link>
          </Space>
        </div>
      </div>
    </Footer>
  );
}
