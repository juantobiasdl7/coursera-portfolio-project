import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
    return (
        <VStack backgroundColor="#bbf7d3" borderRadius="10px" align="start" >  
            <Image borderRadius="10px" src={imageSrc}/>
            <Heading size="md" style={{ padding: "10px" }} color="black">{title}</Heading>    
            <Text style={{ padding: "10px" }} color="black">{description}</Text>
            <HStack color="black" >
                <a href="" style={{ paddingLeft: "10px" }} >See More</a>
                <FontAwesomeIcon icon={faArrowRight} size="1x" />
            </HStack>
        </VStack>
    );
};

export default Card;