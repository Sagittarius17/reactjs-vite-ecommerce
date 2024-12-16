import { Container, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text fontSize='4xl' fontWeight='bold' color='teal' textAlign={"center"}>Current Products</Text>

        <Text frontSize='xl' textAlign={'center'} fontWeight={'bold'} color='gray.500'>No Products Found {" "}
          <Link to='/create'>
          <Text as='span' color='blue.500' _hover={{textDecoration: "underline"}}>Create a Prodcut</Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage