import { ReactNode } from "react";
import OnboardBusinessWrapper from "../../wrapper";

const OnboardWrap = ({ children }: { children: ReactNode }) => {
  return (
    <OnboardBusinessWrapper>
      {children}
    </OnboardBusinessWrapper>
  );
};

export default OnboardWrap;