
import { render } from "@testing-library/react";
import Substitutions from "./components/Designer/Substitutions/Substitutions";

describe("Testing app component", () => {
  it("renders MessageModal without crashing", () => {
    render(<Substitutions></Substitutions>)
   
  });
});
