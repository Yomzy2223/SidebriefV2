import { Combobox } from "./combobox";
import { countries } from "countries-list";

export const AllCOuntries = ({
  setValue,
  value,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const countryNames = Object.values(countries).map((country) => country.name);
  return <Combobox options={countryNames} selectValue={setValue} value={value} />;
};
