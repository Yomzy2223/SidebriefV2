import { Combobox } from "./combobox";
import { countries } from "countries-list";

export const AllCOuntries = ({
  setValue,
  value,
  disabled,
}: {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}) => {
  const countryNames = Object.values(countries).map((country) => country.name);
  return (
    <Combobox options={countryNames} selectValue={setValue} value={value} disabled={disabled} />
  );
};
