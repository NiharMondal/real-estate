import {useEffect, useState} from 'react'
import { Flex, Select, Text, Box, Input, Spinner, Icon, Button } from '@chakra-ui/react'
import {filterData,getFilterValues} from "../utils/filterData"
import { useRouter } from "next/router";
import Image from "next/image";
import {MdCancel} from 'react-icons/md'
export default function SearchFilters() {
   const router = useRouter();
   const [filters, setFilters] = useState(filterData)
   
   const searchProperties = (filterValues) => {
      const path = router.pathname;
      const { query } = router;
      const values = getFilterValues(filterValues);

      values.forEach((item) => {
         query[item.name]=item.value
      })

      router.push({pathname: path, query})
   }
  return (
     <Flex flexWrap="wrap" bg="gray.100" justifyContent="center">
        {filters.map(filter => (
           <Box key={filter.queryName}>
              <Select
                 w="fit-content"
                 p="2"
                 placeholder={filter.placeholder}
                 onChange={(e) => searchProperties({[filter.queryName]:e.target.value})}
              >
                 {filter?.items?.map(item => (
                    <option value={item.value} key={item.value}> { item.name}</option>
                 ))}
              </Select>
           </Box>
        ))}
    </Flex>
  )
}
