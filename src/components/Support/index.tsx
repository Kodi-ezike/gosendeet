import { Button } from "../ui/button";

const ContactSupport = () => {
  return (
    <a href="mailto:info@gosendeet.com">
      <Button variant={"secondary"} className="w-fit">
        Contact Support
      </Button>
    </a>
  );
};

export default ContactSupport;
