import { Button, Navbar } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi"; // Import the HiArrowLeft component from the appropriate library
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Note: The 'useHistory' hook is part of the 'react-router' package, not 'react-router-dom'

interface NavBarProps {
  showBackButton: boolean;
}



const NavBar: React.FC<NavBarProps> = ({ showBackButton }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackButtonClick = () => {
    navigate(-1); // Navigate to the previous page
  }

  return (
    <Navbar fluid rounded className="place-content-evenly">
      <Navbar.Brand href="/">
        <img
          src="/images/logo.jpeg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Fresh Markets Prices
        </span>
      </Navbar.Brand>

      {showBackButton && (
        <div className="flex md:order-2">
          <Button onClick={handleBackButtonClick}
            gradientDuoTone="greenToBlue"
            size="sm"
            outline
            className="mr-2"
          >
            <HiArrowLeft className="mr-2 mt-1" />{" "}
            {/* Add the back arrow icon */}
            Back
          </Button>
        </div>
      )}
    </Navbar>
  );
};

export default NavBar;
