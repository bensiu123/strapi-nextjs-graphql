import { GetDishesByRestaurantIdDocument } from "@/graphql/generated";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

const Restaurant: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GetDishesByRestaurantIdDocument, {
    variables: { restaurantId: typeof id === "string" ? id : "" },
  });

  useEffect(() => {
    if (typeof id !== "string") router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const name = useMemo<string>(
    () => data?.restaurant?.data?.attributes?.name ?? "Restaurant not found",
    [data]
  );

  const dishes = useMemo(() => {
    const dishesData = data?.restaurant?.data?.attributes?.dishes?.data;
    if (!Array.isArray(dishesData)) return [];

    return dishesData.map((d) => {
      const { id, attributes } = d;
      if (!attributes) return { id };

      const { name, description, image } = attributes;
      const url = image?.data?.attributes?.url;
      return { id, name, description, image: { url } };
    });
  }, [data]);

  if (error) return <h1>Error Loading Dishes</h1>;
  if (loading) return <h1>Loading ...</h1>;

  return (
    <>
      <h1>{name}</h1>
      <Row>
        {dishes.map((res) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`${process.env.NEXT_PUBLIC_API_URL}${res?.image?.url}`}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button outline color="primary">
                  + Add To Cart
                </Button>

                <style jsx>
                  {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Restaurant;
