
import Link from "next/link"
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer } from "@chakra-ui/react"
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc'
import { FiKey } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'


export default function Navbar() {
  return (
     <Flex p="2" borderBottom="1px" borderColor="gray.100" alignItems="center">
        <Box fontSize="3xl" color="blue.400" fontWeight="bold">
           <Link href="/">
              <a>REAL ESTATE</a>
           </Link>
        </Box>
        <Spacer />
        <Box>
           <Menu>
              <MenuButton
                 as={IconButton}
                 icon={<FcMenu />}
                 variant="outlined"
                 color="red.400"
              />
              <MenuList>
                 <Link href="/">
                    <a>
                       <MenuItem icon={<FcHome />}>Home</MenuItem>
                    </a>
                 </Link>
                 <Link href="/search">
                    <a>
                       <MenuItem icon={<BsSearch />}>Search</MenuItem>
                    </a>
                 </Link>
                 <Link href="/search?purpose=for-sale">
                    <a>
                       <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
                    </a>
                 </Link>
                 <Link href="/search?purpose=for-rent">
                    <a>
                       <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
                    </a>
                 </Link>
              </MenuList>
           </Menu>
        </Box>
     </Flex>
  );
}
