import { useState, useEffect } from "react";
import * as ui from "@chakra-ui/react";
import PropTypes from "prop-types";
 
const LoginScreen = ({setToken}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if(!formData.email.length || !formData.password.length)
      {
       setError('Complete both fields')
       setLoading(false)
       return
      }  

      setError('')
    try {
      const response = await fetch('https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: new URLSearchParams({ email: formData.email, password: formData.password }),
      });

      if (response.status === 400 || response.status == 401) {
        setError('Wrong username or password.')
        setLoading(false)
      }

      const data = await response.json();
      setToken(data.token)
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <ui.Flex justify="center" align="center" minH="80vh">
      <form onSubmit={handleSubmit}>
        <ui.Flex
          width="max(420px, 30vw)"
          borderRadius="1em"
          borderWidth="1px"
          borderColor="teal.300"
          bg="#3b3b3b"
          boxShadow="xl"
          p="2rem"
          direction="column"
          >
          <ui.Heading my="1rem">Log in to the app</ui.Heading>
          {error.length > 0 ? (<ui.Text color='red.300'>Error: {error}</ui.Text>) : null}
          <ui.Box py="1rem">
            <ui.FormLabel>Email</ui.FormLabel>
            <ui.Input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleChange}
              borderColor={error.length && 'red.300'}
            />
          </ui.Box>
          <ui.Box py="1rem">
            <ui.FormLabel>Password</ui.FormLabel>
            <ui.Input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={formData.password}
              onChange={handleChange}
              borderColor={error.length && 'red.300'}
            />
          </ui.Box>
          <ui.Flex justify="flex-end">
            <ui.Button colorScheme="teal" type="submit" w="25%" isLoading={loading}>
              {loading ? (
                <ui.Spinner/>
              ) : 
              (
                'Log in' 
              )}
            </ui.Button>
          </ui.Flex>
        </ui.Flex>
      </form>
    </ui.Flex>
  );
};

LoginScreen.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default LoginScreen;
