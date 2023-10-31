import React, { useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faMedium,
    faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Fade } from "@chakra-ui/react";

const socials = [
    {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
    },
    {
    icon: faGithub,
    url: "https://github.com",
    },
    {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
    },
    {
    icon: faMedium,
    url: "https://medium.com",
    },
    {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
    },
];

const Header = () => {

    const [showHeader, setShowHeader] = useState(true);
    const prevScrollY = useRef(0); // To keep track of the previous scroll position

    const handleScroll = () => {
        const currentScrollY = window.scrollY; // Get current scroll position

        console.log("CURRENT" + currentScrollY);
        console.log("PREVV-----" + prevScrollY.current);

        if (prevScrollY.current < currentScrollY && showHeader) {
            // If scrolled down and header is shown
            console.log("HIDE-----------------------------------------------------------");
            setShowHeader(false); // Hide header
        } else if (prevScrollY.current > currentScrollY && !showHeader) {
            // If scrolled up and header is hidden
            console.log("SHOW-----------------------------------------------------------");
            setShowHeader(true); // Show header
        }

        prevScrollY.current = currentScrollY; // Update the previous scroll position
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // Cleanup: remove the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [showHeader]);



    const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            });
        }
    };

    return (
        <Fade in={showHeader} transition={{exit: {delay: 0.2}, enter: {duration: 0.2}}}>
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            translateY={showHeader ? 0 : "-200px"}
            transitionProperty="transform"
            transitionDuration=".3s"
            transitionTimingFunction="ease-in-out"
            backgroundColor="#18181b"
        >
            <Box color="white" maxWidth="1280px" margin="0 auto">
            <HStack
                px={16}
                py={4}
                justifyContent="space-between"
                alignItems="center"
            >
                <nav>
                {/* Add social media links based on the `socials` data */}
                    <HStack spacing={4}>
                        {socials.map((social, index) => (
                            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={social.icon} size="2x" />
                            </a>
                        ))}
                    </HStack>
                </nav>
                <nav>
                <HStack spacing={8}>
                    {/* Add links to Projects and Contact me section */}
                    <a href="/#projects" onClick={handleClick("projects")}>
                        Projects
                    </a>
                    <a href="/#contact-me" onClick={handleClick("contactme")}>
                        Contact Me
                    </a>
                </HStack>
                </nav>
            </HStack>
            </Box>
        </Box>
        </Fade>
    );
};
export default Header;