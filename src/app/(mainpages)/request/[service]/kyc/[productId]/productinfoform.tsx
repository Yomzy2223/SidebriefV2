import { TextInput, Label, Button } from "@/components/flowbite";
import { ArrowRight } from "@/assets/icons";

export const ProductInfoForm = () => {
  return (
    <form className="flex flex-col gap-12 items-start">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <Label htmlFor="address" value="Business address" />
          <TextInput id="address" placeholder="Enter your address here" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="DOB" value="Date of birth" />
          <TextInput id="DOB" placeholder="DD-MM-YYYY" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-address" value="Business contact address" />
          <TextInput id="contact-address" placeholder="" />
        </div>
      </div>
      <Button color="secondary" size={"lg"}>
        <div className="space-x-2 flex items-center">
          <p>Continue</p>
          <ArrowRight />
        </div>
      </Button>
    </form>
  );
};
