import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import noResults from "../assets/images/no_results.png";
import { BASE_URL, options } from "../utils/fetchApi";
export default function Search({ properties }) {
   const [searchFilters, setSearchFilters] = useState(false);
   const router = useRouter();

   return (
      <Box>
         <Flex
            cursor="pointer"
            bg="gray.100"
            borderBottom="1px"
            borderColor="gray.200"
            p="2"
            fontWeight="bold"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters((prev) => !prev)}
         >
            <Text>Search Property By Filters</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter} />
         </Flex>
         {searchFilters && <SearchFilters />}
         <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {router.query.purpose}{" "}
         </Text>
         <Flex flexWrap="wrap">
            {properties.map((property) => (
               <Property property={property} key={property.id} />
            ))}
         </Flex>
         {properties.length === 0 && (
            <Flex
               justifyContent="center"
               alignItems="center"
               flexDirection="column"
               paddingBottom="3"
            >
               <Image
                  alt="no-results"
                  src={noResults}
                  height={400}
                  width={400}
               />
               <Text fontSize="2xl">No Results found</Text>
            </Flex>
         )}
      </Box>
   );
}

export async function getServerSideProps({ query }) {
   const purpose = query.purpose || "for-rent";
   const rentFrequency = query.rentFrequency || "yearly";
   const minPrice = query.minPrice || "0";
   const maxPrice = query.maxPrice || "1000000";
   const roomsMin = query.roomsMin || "0";
   const bathsMin = query.bathsMin || "0";
   const sort = query.sort || "price-desc";
   const areaMax = query.areaMax || "35000";
   const locationExternalIDs = query.locationExternalIDs || "5002";
   const categoryExternalID = query.categoryExternalID || 4;

   const response = await fetch(
      `${BASE_URL}?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`,
      options
   );

   const data = await response.json();
   return {
      props: {
         properties: data?.hits,
      },
   };
}
