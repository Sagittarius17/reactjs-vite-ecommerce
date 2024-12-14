import { Container, Heading, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  })
  return <Container>
    <VStack>
      <Heading>
        Create a new product
      </Heading>
    </VStack>
  </Container>
}

export default CreatePage