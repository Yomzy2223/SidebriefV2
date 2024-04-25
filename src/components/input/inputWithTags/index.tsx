import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useActions } from "./actions";
import { X } from "lucide-react";
import { IProps } from "./constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import TagIcon from "@/assets/icons/tagIcon";

const InputWithTags = ({
  size,
  textInputProp,
  minTagChars,
  maxTag,
  errors,
  submitErr,
  handleKeyDown,
  defaultTags,
  disabled,
}: IProps) => {
  const [tags, setTags] = useState<string[]>(defaultTags || []);
  const [errorMsg, setErrorMsg] = useState("");
  const [value, setValue] = useState("");

  const { getRandColor } = useGlobalFunctions();
  const { onKeyDown, validateTags, removeTag } = useActions({
    setValue,
    tags,
    setTags,
    setErrorMsg,
    handleKeyDown,
    minTagChars,
    maxTag,
    errors,
  });

  useEffect(() => {
    if (submitErr) setErrorMsg(submitErr.toString());
  }, [submitErr]);

  useEffect(() => {
    if (defaultTags) setTags(defaultTags);
  }, [defaultTags]);

  return (
    <div>
      <TextInput
        type="text"
        sizing={size || "md"}
        helperText={<>{errorMsg}</>}
        color={errorMsg && "failure"}
        className={errorMsg ? "focus:[&_input]:ring-0" : ""}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => {
          errorMsg && validateTags(e.target.value);
          setValue(e.target.value);
        }}
        disabled={disabled}
        // {...textInputProp}
      />
      <div className="flex gap-2 flex-wrap">
        {tags?.map((tag: string, i) => {
          const color = getRandColor(i);

          return (
            <div
              key={tag}
              className={`${color.bg} flex items-center gap-1 text-xs font-normal pl-2.5 pr-1.5 py-0.5 rounded-md`}
            >
              <TagIcon fill={color.text} />
              {tag}
              <Button size="fit" color="ghost" onClick={() => removeTag(tag)}>
                <X size={12} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputWithTags;
