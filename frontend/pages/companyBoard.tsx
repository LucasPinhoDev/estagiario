import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import * as jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import React, { ReactNode, ReactText, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FiChevronDown, FiCompass, FiHome, FiTrendingUp } from "react-icons/fi";

import { CreateCompany, CreateJob, EditCompany, EditJob } from "../components";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Cadastrar Empresa", icon: FiHome },
  { name: "Listar Empresas", icon: FiHome },
  { name: "Cadastrar Vagas", icon: FiTrendingUp },
  { name: "Listar Vagas", icon: FiTrendingUp },
];

export default function Sidebar({}: { children: ReactNode }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [activeItem, setActiveItem] = useState<string>(LinkItems[0].name);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      if (userType !== "company" || !userType) {
        router.push("/vagas");
        return;
      }
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        activeItem={activeItem}
        onItemClick={handleItemClick}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            activeItem={activeItem}
            onItemClick={handleItemClick}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Renderizar o conteúdo com base no item ativo */}
        {activeItem === "Cadastrar Empresa" && <CreateCompany />}
        {activeItem === "Listar Empresas" && <EditCompany />}
        {activeItem === "Cadastrar Vagas" && <CreateJob />}
        {activeItem === "Listar Vagas" && <EditJob />}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  activeItem: string;
  onItemClick: (name: string) => void;
}

const SidebarContent = ({
  onClose,
  activeItem,
  onItemClick,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <Image
            w="140px"
            h="40px"
            alt="feature image"
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/545/8005182545_01d7c8f6-695a-442b-89d9-5cd1f63f57f9.png?cb=1671608255"
          />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          active={activeItem === link.name}
          onClick={() => onItemClick(link.name)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({
  icon,
  children,
  active,
  onClick,
  ...rest
}: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        bg={active ? "cyan.400" : undefined}
        color={active ? "white" : undefined}
        {...rest}
        onClick={onClick}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        size="md"
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Link href="/">
          <Image
            w="140px"
            h="40px"
            alt="feature image"
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/545/8005182545_01d7c8f6-695a-442b-89d9-5cd1f63f57f9.png?cb=1671608255"
          />
        </Link>
      </Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://dewey.tailorbrands.com/production/brand_version_mockup_image/545/8005182545_01d7c8f6-695a-442b-89d9-5cd1f63f57f9.png?cb=1671608255"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{localStorage.getItem("name")}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem as={"a"} onClick={handleLogout}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
