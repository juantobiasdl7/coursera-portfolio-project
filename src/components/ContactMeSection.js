import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
const {isLoading, response, submit} = useSubmit();
const { onOpen } = useAlertContext();

const formik = useFormik({
    initialValues: {
        firstName: '',
        email: '',
        type: 'openSource',
        comment: ''
    },
    onSubmit: (values) => {
        submit(values);
    },
    validationSchema: Yup.object({
        firstName: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        type: Yup.string().required('Type is required'),
        comment: Yup.string().required('Comment is required'),
    }),
});

useEffect(() => {
    if (response?.type === 'success') {
        onOpen(response.type, `${formik.values.firstName}, ${response.message}`);
        formik.resetForm();
    } else if (response?.type === 'error') {
        onOpen(response.type, response.message);
    }
}, [response]);

return (
    <FullScreenSection
        isDarkBackground
        backgroundColor="#512DA8"
        py={16}
        spacing={8}
    >
        <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
            Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
            <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
                <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select {...formik.getFieldProps('type')}>
                    <option value="hireMe">Freelance project proposal</option>
                    <option value="openSource">
                    Open source consultancy session
                    </option>
                    <option value="other">Other</option>
                </Select>
                </FormControl>
                <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                    id="comment"
                    name="comment"
                    height={250}
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit {isLoading}
                </Button>
            </VStack>
            </form>
        </Box>
        </VStack>
    </FullScreenSection>
    );
};

export default LandingSection;