import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import axios from "axios";

const method = [
  {
    value: "post",
    label: "POST"
  },
  {
    value: "get",
    label: "GET"
  }
];

const Layout = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;
const Card = styled.div`
  border: 2px solid #d9a7c7;
  border-radius: 1rem;
  background-color: #fff;
  padding: 2rem;
  width: 25rem;
`;
const Title = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #642b73;
`;
const Top = styled.div`
  margin-top: 1rem;
`;
const Line = styled.div`
  opacity: 0.2;
  background: #000000;
  width: 58.63rem;
  height: 0.1rem;
  margin: 1.5rem 0;
  @media (max-width: 1024px) {
    width: 21.5rem;
  }
  @media (max-width: 360px) {
    width: 18rem;
  }
`;
const LineLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SubTitle = styled.div`
  font-family: "Roboto", sans-serif;
  margin-bottom: 1.2rem;
  color: #000;
  font-weight: 500;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.22rem;
  align-items: flex-start;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.5rem;
  }
`;
const GridItem = styled.div`
  text-align: left;
`;
const Btn = styled(Button)`
  background-color: #642b73 !important;
  &:hover {
    background-color: #4a1956 !important;
  }
`;
function App() {
  const [methodAPI, setMethodAPI] = React.useState("post");
  const { register, handleSubmit } = useForm();
  const onSubmit = async input => {
    console.log(input);
    console.log(methodAPI);
    const {
      username,
      password,
      url,
      contenttype,
      granttype,
      authorization
    } = input;

    const data = {
      username: username,
      password: password
    };
    const headers = {
      headers: {
        authorization: authorization,
        "Content-Type": contenttype,
        granttype: granttype
      }
    };
    switch (methodAPI) {
      case "post":
        let response = await axios.post(url, data, headers);
        console.log(response.data);
        break;
      case "get":
        response = await axios.get(url, headers);
        console.log(response.data);
        break;
      default:
      //
    }
  };

  const handleChange = event => {
    setMethodAPI(event.target.value);
  };

  return (
    <Layout>
      <Card>
        <Title>Penetration Testing</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubTitle>Body</SubTitle>
          <GridContainer>
            <GridItem>
              <TextField
                label="Username"
                id="username"
                variant="outlined"
                fullWidth
                margin="dense"
                inputRef={register}
                name="username"
              />
            </GridItem>
            <GridItem>
              <TextField
                label="Password"
                id="password"
                variant="outlined"
                fullWidth
                margin="dense"
                inputRef={register}
                type="password"
                name="password"
              />
            </GridItem>
          </GridContainer>
          <LineLayout>
            <Line />
          </LineLayout>
          <SubTitle>Header</SubTitle>
          <Top>
            <TextField
              id="method"
              select
              label="Method"
              value={methodAPI}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="dense"
              inputRef={register}
              name="method"
            >
              {method.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Top>
          <Top>
            <TextField
              label="URL"
              id="url"
              variant="outlined"
              fullWidth
              margin="dense"
              inputRef={register}
              name="url"
            />
          </Top>
          <Top>
            <TextField
              label="Content-Type"
              id="contenttype"
              variant="outlined"
              fullWidth
              defaultValue="application/json"
              margin="dense"
              inputRef={register}
              name="contenttype"
            />
          </Top>
          <Top>
            <TextField
              label="granttype"
              id="granttype"
              variant="outlined"
              fullWidth
              defaultValue="password"
              margin="dense"
              inputRef={register}
              name="granttype"
            />
          </Top>
          <Top>
            <TextField
              label="authorization"
              id="authorization"
              variant="outlined"
              fullWidth
              margin="dense"
              inputRef={register}
              name="authorization"
            />
          </Top>
          <Top>
            <Btn variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Btn>
          </Top>
        </form>
      </Card>
    </Layout>
  );
}

export default App;
