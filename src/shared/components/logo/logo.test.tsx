import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
// import { SiEpicgames } from "react-icons/si";
import { FaUser } from "react-icons/fa";
import { StyledIcon, StyledStoreIcon } from "./logo";
// import { ThemeProvider } from "styled-components";
import { StoreTypes } from "../../../@types/global.d";
// import { lightTheme, darkTheme } from "../../styles/theme";

vi.mock("react-icons/fa", () => ({
  FaSteam: () => <svg aria-label="steam-icon" />,
  FaXbox: () => <svg aria-label="xbox-icon" />,
  FaUser: () => <svg aria-label="user-icon" />,
}));

vi.mock("react-icons/si", () => ({
  SiEpicgames: () => <svg aria-label="epic-icon" />,
}));

const storeIconsList: Record<StoreTypes, string> = {
  [StoreTypes.STEAM_STORE]: "steam-icon",
  [StoreTypes.EPIC_STORE]: "epic-icon",
  [StoreTypes.XBOX_STORE]: "xbox-icon",
};

describe("StyledIcon component- Unit Tests", () => {
  test("Should render jsx children with default styles and props", () => {
    render(
      <StyledIcon>
        <svg aria-label="svg-icon" />
      </StyledIcon>
    );
    const svgElement = screen.getByLabelText("svg-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveStyle("font-size:'30px'");
  });

  test("Should render React-icon children with default styles and props", () => {
    render(
      <StyledIcon size={"40px"}>
        <FaUser />
      </StyledIcon>
    );
    const svgElement = screen.getByLabelText("user-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveStyle("font-size:'40px'");
  });

  test("Should render React-icon children with default styles and props", () => {
    render(
      <StyledIcon size={"40px"}>
        <FaUser />
      </StyledIcon>
    );
    const svgElement = screen.getByLabelText("user-icon");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveStyle("font-size:'40px'");
  });
});

describe("StyledStoreIcon component", () => {
  test("Should render StoreTypes icons correctly", () => {
    Object.entries(storeIconsList).forEach(([store, label]) => {
      render(<StyledStoreIcon store={store} />);
      const storeIcon = screen.getByLabelText(label);
      expect(storeIcon).toBeInTheDocument();
    });
  });
});

// describe("StyledIcon component - Integration Tests", () => {
//   test("Should render correct color when light theme is set", () => {
//     render(
//       <ThemeProvider theme={lightTheme}>
//         <StyledIcon>
//           <FaUser aria-label="user-icon" />
//         </StyledIcon>
//       </ThemeProvider>
//     );
//     const steamIcon = screen.getByLabelText("user-icon");
//     expect(steamIcon).toBeInTheDocument();
//     expect(steamIcon).toHaveAttribute("color", lightTheme.logo);

//   });
// });

// describe("StyledStoreIcon component - Integration Tests", () => {
//   test("Should render StoreTypes icons and size correctly", async () => {
//     Object.entries(storeIconsList).forEach(([store, label]) => {
//       render(<StyledStoreIcon store={store} />);
//       const storeIcon = screen.getByLabelText(label);
//       expect(storeIcon).toBeInTheDocument();
//       expect(storeIcon).toHaveAttribute("height", "1em");
//       expect(storeIcon).toHaveAttribute("width", "1em");
//     });
//   });
//   test("Should render StoreTypes icons and size correctly", () => {
//     const componentSize = "40px";
//     Object.entries(storeIconsList).forEach(([store, label]) => {
//       render(<StyledStoreIcon store={store} size={componentSize} />);
//       const storeIcon = screen.getByLabelText(label);
//       expect(storeIcon).toBeInTheDocument();
//       expect(storeIcon).toHaveAttribute("height", componentSize);
//       expect(storeIcon).toHaveAttribute("width", componentSize);
//     });
//   });

//   test("Should render correct color when light theme is set", async () => {
//     render(<StyledStoreIcon store={StoreTypes.STEAM_STORE} />);
//     const steamIcon = screen.getByLabelText(storeIconsList.Steam);
//     await userEvent.hover(steamIcon);
//     const iconStyles = window.getComputedStyle(steamIcon);
//     expect(iconStyles.transform).toBe("scale(1.1)");
//   });
// });
