import RestaurantList from "@/components/RestaurantList";
import { NextPage } from "next";
import { useState } from "react";
import { Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";

const Home: NextPage = () => {
  const [query, updateQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText addonType="append"> Search </InputGroupText>
              <Input
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
