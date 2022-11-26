import { SearchRestaurantDocument } from "@/graphql/generated";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useMemo } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

type Props = {
  search?: string;
};

const RestaurantList: React.FC<Props> = (props) => {
  const { search = "" } = props;
  const { loading, error, data } = useQuery(SearchRestaurantDocument, {
    variables: { filters: { name: { containsi: search } } },
  });

  const filteredRestaurants = useMemo(() => {
    if (!(data && data.restaurants && data.restaurants.data.length)) return [];
    return (
      data.restaurants.data
        // .filter((d) => {
        //   const name = d.attributes?.name;
        //   if (!name) return false;
        //   return name.toLowerCase().includes(search?.toLowerCase() as string);
        // })
        .map((d) => {
          const { id, attributes } = d;
          if (!attributes) return { id };
          const { name, description, image } = attributes;
          const url = image?.data?.attributes?.url;
          return { id, name, description, image: { url } };
        })
    );
  }, [data]);

  if (error) return <h1>Error loading restaurants</h1>;

  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  if (loading) return <h1>Fetching</h1>;

  if (filteredRestaurants.length === 0) return <h1>No Restaurants Found</h1>;

  return (
    <Row>
      {filteredRestaurants.map((res) => (
        <Col xs="6" sm="4" key={res.id}>
          <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
            {res?.image?.url && (
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
              />
            )}
            <CardBody>
              <CardTitle>{res.name}</CardTitle>
              <CardText>{res.description}</CardText>
            </CardBody>
            <div className="card-footer">
              <Link
                as={`/restaurants/${res.id}`}
                href={`/restaurants?id=${res.id}`}
                className="btn btn-primary"
              >
                View
              </Link>
            </div>
          </Card>
        </Col>
      ))}

      <style jsx global>
        {`
          a {
            color: white;
          }
          a:link {
            text-decoration: none;
            color: white;
          }
          a:hover {
            color: white;
          }
          .card-columns {
            column-count: 3;
          }
        `}
      </style>
    </Row>
  );
};

export default RestaurantList;
