import { Button, Container, Heading, Input, VStack, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import { useToast } from "@chakra-ui/core";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: ''
    })

    const toast = useToast();
    const {createProduct} = useProductStore()

    const handleAddProduct = async() => {
        const {success, message} = await createProduct(newProduct)
        if(!success) {
            console.log(message)
            // toast ({
            //     title: "Error",
            //     description: message,
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            // });
        } else {
            console.log(success)
            // toast({
            //     title: "Success",
            //     description: message,
            //     status: "success",
            //     duration: 3000,
            //     isClosable: true,
            // });
        }

    }

    return <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create a new product
            </Heading>
            <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input placeholder='Product Name' name='name' value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <Input placeholder='Product Price' name='price' type='number' value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <Input placeholder='Product Image(URL)' name='image' value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />

                    <Button colorScheme={"blue"} onClick={handleAddProduct} w='full'> Add Product </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
}

export default CreatePage