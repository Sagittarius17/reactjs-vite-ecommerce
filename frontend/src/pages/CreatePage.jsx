import { Button, Container, Heading, Input, VStack, Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'
import { Toaster, toaster } from "../components/ui/toaster"
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: '',
    })

    const { createProduct } = useProductStore()
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct)
        if (!success) {
            toaster.error({
                title: "Someting went wrong",
                description: "File not created.",
            })
        } else {
            navigate('/');
            toaster.success({
                title: "Done",
                description: "File created successfully.",
            })
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
            <Toaster />
        </VStack>
    </Container>
}

export default CreatePage