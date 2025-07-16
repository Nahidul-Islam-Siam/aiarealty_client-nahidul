import type { Property } from "@/interface/globalType"
import {  Card, Col, Row, Typography } from "antd"


import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { CiHeart } from "react-icons/ci";

interface FilterProps {
  filteredProperties: Property[] | []
}

const CardPage: React.FC<FilterProps> = ({ filteredProperties }) => {
  const { Title, Text } = Typography

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <Row gutter={[24, 24]}>
        {filteredProperties?.map((property) => (
          <Col xs={24} sm={12} lg={8} key={property.id}>
            <Card
              hoverable
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                border: "1px solid #f0f0f0",
              }}
              cover={
                <div style={{ position: "relative" }}>
                  <Image
                    alt={property?.title}
                    src={property?.images[0]?.url || "/placeholder.svg"}
                    width={400}
                    height={240}
                    className="w-full h-60"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      borderBlockColor: "",
                      top: "12px",
                      right: "12px",
                      background: "white",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
             <CiHeart size={16} />
                  </div>
                </div>
              }
              bodyStyle={{ padding: "20px" }}
            >
              <div>
<div className="flex justify-between items-center">
          <div>
                  <Text
                  type="secondary"
                  style={{
                    fontSize: "12px",
                    transform:"capitalize",
            
                    letterSpacing: "0.5px",
                    marginBottom: "8px",
                    display: "block",
                    color: "#6C6C6C",
                  }}
                  className="font-inter"
                >
                  Homes For {property?.listingType}
                </Text>
        </div>

                <div className="flex items-center mb-2">
                  <IoLocationOutline  size={16} style={{ color: "#E2C59F", marginRight: 4 }} />
                  <Text type="secondary" style={{ fontSize: "14px" }}>
                    {property?.address}
                  </Text>
                </div>
</div>

                <Title
                  level={3}
                  style={{
                    margin: "8px 0 4px 0",
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#000",
                  }}
                >
               $ {property?.price}
                </Title>

      <Text
  style={{
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
    display: "block",
  }}
>
  {property?.featureNames?.slice(0, 4).join(", ")}
</Text>


                <Link href={`/search-page/${property?.id}`}>
                  <button
                   
                    className="hover:bg-[#D4B896] hover:text-white transition-all duration-300 rounded-full w-full py-2 text-sm font-medium text-[#E2C59F] border border-[#E2C59F]"
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CardPage
