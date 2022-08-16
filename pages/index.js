import { Flex, Box, Text, Button, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Property from "../components/Property";
import rent from "../public/rent.jpg";
import sell from "../public/sell.jpg";
import { options, BASE_URL, LOCATION_EX_IDS } from "../utils/fetchApi";

const Banner = ({
   imageUrl,
   perpose,
   title1,
   title2,
   desc1,
   desc2,
   linkName,
   buttonText,
}) => {
   return (
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
         <Image src={imageUrl} height={300} width={500} alt="Banner" />
         <Box p={5}>
            <Text color="gray.500" fontSize="sm" fontWeight="medium">
               {perpose}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
               {title1} <br /> {title2}
            </Text>
            <Text
               fontSize="lg"
               fontWeight="medium"
               paddingTop="3"
               paddingBottom="3"
            >
               {desc1} <br /> {desc2}
            </Text>
            <Button fontSize="xl" colorScheme="teal">
               <Link href={linkName}>
                  <a> {buttonText}</a>
               </Link>
            </Button>
         </Box>
      </Flex>
   );
};

export default function Home({ forRent, forSale }) {
   return (
      <Box>
         <Banner
            perpose="Rent A Home"
            title1="Rental Homes for"
            title2="Everyone"
            desc1="Explore Apartments, Villas, Homes"
            desc2="and more"
            linkName="/search?purpose=for-rent"
            imageUrl={rent}
            buttonText="Explore Renting"
         />
         {/* fetch rent data */}
         <Flex flexWrap="wrap" justifyContent="center">
            {forRent.map((property) => (
               <Property property={property} key={property.id} />
            ))}
         </Flex>
         <Banner
            perpose="Buy A Home"
            title1="Find, Buy Your Own"
            title2="Dream"
            desc1="Explore Apartments, Villas, Homes"
            desc2="and more"
            linkName="/search?purpose=for-sale"
            imageUrl={sell}
            buttonText="Explore Buying"
         />
         {/* fetch sell data */}
         <Flex flexWrap="wrap" justifyContent="center">
            {forSale.map((property) => (
               <Property property={property} key={property.id} />
            ))}
         </Flex>
      </Box>
   );
}
export async function getStaticProps() {
   const propertyForSale = await fetch(
      `${BASE_URL}?${LOCATION_EX_IDS}&purpose=for-sale&hitsPerPage=6`,
      options
   );
   const propertyForRent = await fetch(
      `${BASE_URL}?${LOCATION_EX_IDS}&purpose=for-rent&hitsPerPage=6`,
      options
   );
   const forSale = await propertyForSale.json();
   const forRent = await propertyForRent.json();
   return {
      props: {
         forSale: forSale.hits,
         forRent: forRent.hits,
      },
   };
}
