import { Button, Navbar, NavbarCollapse, NavbarToggle, TextInput } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { HiMenu } from "react-icons/hi"; // Hamburger menu icon

export default function Header() {
    const path = useLocation().pathname
  return (
    <Navbar className='border-b-2'>
      <Link to ='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>fragyyy's</span> 
        Blog
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search'
          rightIcon={CiSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden rounded-full flex items-center justify-center' color='gray'>
        <CiSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden rounded-full sm:flex sm:justify-center sm:items-center' color='gray'>
          <FaMoon />
        </Button>
        <Link to='/signup'>
          <Button className='w-16 h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>
            Sign In
          </Button>
        </Link>
        <NavbarToggle className="focus:outline-none p-2 rounded-lg" aria-expanded="true">
          <span className="sr-only">Toggle navigation</span>
          <HiMenu className="w-6 h-6 text-gray-500" />
        </NavbarToggle>
      </div>
      <NavbarCollapse>
        <Navbar.Link className='mr-2' active={path === '/'} as={Link} to='/'>Home</Navbar.Link>
        <Navbar.Link className='mx-2'active={path === '/about'} as={Link} to='/about'>About</Navbar.Link>
        <Navbar.Link className='ml-2' active={path === '/projects'}as={Link} to='/projects'>Projects</Navbar.Link>
      </NavbarCollapse>
    </Navbar>
  );
}
