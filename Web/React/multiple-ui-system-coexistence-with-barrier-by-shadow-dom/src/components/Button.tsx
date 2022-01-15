import { Barrier } from "../infrastructures/Barrier";
import { Button as ButtonNewGen } from "../new-gen-components/Button";
import { type ComponentProps } from "react";

/** Component Level Coexistence */
export const Button = (props: ComponentProps<typeof ButtonNewGen>) => (
  <Barrier>
    <ButtonNewGen {...props} />
  </Barrier>
);
