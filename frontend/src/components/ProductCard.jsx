import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from '@chakra-ui/react';
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import { Toaster, toaster } from "../components/ui/toaster"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter,
        DialogHeader, DialogRoot, DialogTitle, DialogTrigger, } from "../components/ui/dialog"
import { useState } from 'react';


const ProductCard = ({ product }) => {
    const { updateProduct, deleteProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        if (!success) {
            toaster.error({
                title: "Error",
                description: message,
            })
        } else {
            toaster.success({
                title: "Done",
                description: "File Updated Successfully.",
            })
        }
    };

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (!success) {
            toaster.error({
                title: "Something went wrong",
                description: message
            })
        } else {
            toaster.success({
                title: "Done",
                description: "File deleted successfully",
            })
        }
    };


    return (
        <Box shadow='lg' p={4} rounded='lg' overflow='hidden' transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color='gray.300' mb={4}>₹{product.price}</Text>
                <HStack spacing={2}>
                    <DialogRoot placement='center'>
                        <DialogTrigger asChild>
                            <Button _hover={{ bgColor: 'green.500' }}>
                                <MdEdit />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Product</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <VStack spacing='4'>
                                    <Input placeholder='Product Name' name='name' value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})} />
                                    <Input placeholder='Price' name='price' type='number' value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})} />
                                    <Input placeholder='Image URL' name='image' value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})} />
                                </VStack>
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant="outline" >Cancel</Button>
                                </DialogActionTrigger>
                                <Button  onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Save</Button>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>
                    <Button onClick={() => handleDeleteProduct(product._id)} _hover={{ bgColor: 'red.500' }}>
                        <MdDelete />
                    </Button>
                </HStack>
            </Box>
            <Toaster />
        </Box>
    );
};

export default ProductCard