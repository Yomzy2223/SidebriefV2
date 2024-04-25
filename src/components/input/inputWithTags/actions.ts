import { Dispatch, KeyboardEvent, SetStateAction } from "react";

export const useActions = ({
  setValue,
  tags,
  setTags,
  setErrorMsg,
  handleKeyDown,
  minTagChars,
  maxTag,
  errors,
}: actionsProp) => {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (validateTags(value)) {
        setTags([...tags, value]);
        setValue("");
        handleKeyDown([...tags, value]);
      }
    }
  };

  const validateTags = (value: string) => {
    if (maxTag && tags.length >= maxTag) {
      value.length === 0
        ? setErrorMsg("")
        : setErrorMsg(errors?.length || `Tags cannot be more than ${maxTag}`);
      return;
    }
    if (normalize(value) === "") {
      setErrorMsg(errors?.empty || "Enter tag");
      return;
    }
    if (value.length < minTagChars) {
      setErrorMsg(errors?.minTagChars || `Tags cannot be less than ${minTagChars} characters`);
      return;
    }
    if (tags.some((tag) => normalize(tag) === normalize(value))) {
      setErrorMsg(errors?.exists || "Tag already exists");
      return;
    }
    setErrorMsg("");
    return true;
  };

  const normalize = (text: string) => text.trim().toLowerCase();

  const removeTag = (tag: string) => {
    const newTags = [...tags].filter((el) => el !== tag);
    handleKeyDown(newTags);
    setTags(newTags);
  };

  return {
    onKeyDown,
    validateTags,
    removeTag,
  };
};

interface actionsProp {
  setValue: Dispatch<SetStateAction<string>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  handleKeyDown: (tags: string[]) => void;
  minTagChars: number;
  maxTag?: number;
  errors?: {
    empty?: string;
    length?: string;
    exists?: string;
    minTagChars?: string;
  };
}
