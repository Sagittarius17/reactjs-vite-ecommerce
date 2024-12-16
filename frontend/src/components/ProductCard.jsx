import { Box, Button, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';
import { Toaster, toaster } from "../components/ui/toaster"

const ProductCard = ({ product }) => {
    const { editProduct, deleteProduct } = useProductStore()
    const handleEditProduct = async (pid) => {

    }
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (!success) {
            toaster.error({
                title: "Something went wrong",
                description: "File Not Deleted.",
                // action: {
                //     label: "Undo",
                //     onClick: () => console.log("Undo"),
                // },
            })
        } else {
            toaster.warning({
                title: "Done",
                description: "File deleted successfully",
                // action: {
                //     label: "Undo",
                //     onClick: () => console.log("Undo"),
                // },
            })
        }
    }
    return (
        <Box shadow='lg' p={4} rounded='lg' overflow='hidden' transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color='gray.300' mb={4}>₹{product.price}</Text>
                <HStack spacing={2}>
                    <Button onClick={() => handleEditProduct(product._id)} _hover={{ bgColor: 'green.500' }}>
                        <MdEdit />
                    </Button>
                    <Button onClick={() => handleDeleteProduct(product.id)} _hover={{ bgColor: 'red.500' }}>
                        <MdDelete />
                    </Button>
                </HStack>
            </Box>
            <Modal></Modal>
        </Box>
    );
};

export default ProductCard