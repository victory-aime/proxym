"use client";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field } from "formik";
import LoginSchema from "../validators/LoginSchema";

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // Added username state
  const [password, setPassword] = useState(""); // Added password state
  const isDisabled = !username || !password; // Check isDisabled based on both username and password

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "1",
          username: values.username,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Réponse de l'API:", data);

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", data.username);
      } else {
        const errorData = await response.json();
        console.error("Erreur de l'API:", errorData);
        // Utilisez les informations d'erreur pour afficher un message à l'utilisateur
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      // Gérez les erreurs ici
    } finally {
      setSubmitting(false); // Indiquez à Formik que la soumission est terminée
    }
  };

  return (
    <Box>
      <Box position="relative">
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              Welcome{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                &
              </Text>{" "}
              Sign in to your account
            </Heading>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Insert your informations
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <Box mt={10}>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={LoginSchema}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                  <Form>
                    <Stack spacing={4}>
                      <label>Username :</label>
                      <Input
                        placeholder="username"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                        value={values.username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {touched.username && errors.username && (
                        <Text>{errors.username}</Text>
                      )}
                      <label>Password :</label>

                      <InputGroup size="md">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          bg={"gray.100"}
                          border={0}
                          color={"gray.500"}
                          _placeholder={{
                            color: "gray.500",
                          }}
                          value={values.password}
                          onChange={handleChange}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleTogglePassword}
                          >
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </Stack>

                    <Button
                      fontFamily={"heading"}
                      mt={8}
                      w={"full"}
                      bgGradient="linear(to-r, red.400,pink.400)"
                      color={"white"}
                      _hover={{
                        bgGradient: "linear(to-r, red.400,pink.400)",
                        boxShadow: "xl",
                      }}
                      type="submit"
                      onClick={handleSubmit}
                      isLoading={false}
                      isDisabled={isDisabled}
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
            <Blur
              position={"absolute"}
              top={200}
              left={-10}
              style={{ filter: "blur(70px)" }}
            />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
