import { Center } from "@chakra-ui/react";
import React from 'react'

export default function Footer() {
  return (
     <Center  p="5" color="gray.600" borderTop="1px" borderColor="gray.300">
        {new Date().getFullYear()} RealEstate, Inc
    </Center>
  )
}


