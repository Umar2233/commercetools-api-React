import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  Grid,
  Pagination,
  TextField,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios, { axiosPrivate } from "../api/axios";
import { CLIENT_ID, CLIENT_SECRET } from "../api/accessData";
import SingleCard from "./SingleCard";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Header = () => {
  const limit = 24;

  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [productsData, setProductsData] = useState();
  const [offSet, setOffSet] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
    setOffSet((value - 1) * limit);
  };

  useEffect(() => {
    const getToken = async () => {

      try {
        const res = await axiosPrivate.post(
          "/oauth/token?grant_type=client_credentials",
          {},
          {
            auth: {
              username: CLIENT_ID,
              password: CLIENT_SECRET,
            },
          }
        );
        setAccessToken(res.data.access_token);
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    const getProducts = async () => {

      try {
        const response = await axios.get(
          `/newcommerce123/products?limit=${limit}&offset=${offSet}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setProductsData(response.data.results);
        setCount(Math.ceil(response.data.total / response.data.limit));
        console.log(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, [accessToken, offSet]);

  return (
    <ThemeProvider theme={Theme}>
      {productsData ? (
        <>
          <Typography
            varient="h1"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: "500",
              marginTop: { md: 0, xs: "80px" },
            }}
          >
            My Store
          </Typography>
          <SearchIcon sx={{ position: "absolute", top: 35, right: 30 }} />
          <TextField
            label="Search"
            color="field"
            focused
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              width: "300px",
              padding: 0,
            }}
          />
          <Grid
            container
            spacing={2}
            justifyContent="left"
            sx={{ p: { md: 12, xs: 4 } }}
          >
            {productsData &&
              productsData.map((prod, i) => (
                <SingleCard
                  prod={prod.masterData.staged.name.en}
                  creat={prod.createdAt}
                  img={prod.masterData.staged.masterVariant.images[0].url}
                  key={i}
                />
              ))}
          </Grid>
          <Pagination
            count={count}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            sx={{ display: "flex", justifyContent: "center", mb: 5 }}
          />{" "}
        </>
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  );
};

export default Header;
