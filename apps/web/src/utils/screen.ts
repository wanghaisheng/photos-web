import defaultConfig from "tailwindcss/defaultConfig";
import customConfig from "../../tailwind.config";

const defaultScreens = defaultConfig.theme.screens;
const containerPadding = customConfig.theme.extend.container.padding;

export const getScreenName = (screenWidth: number) => {
  const screensValues = transformObjectValuesToNumbers(
    defaultScreens as Record<string, string>
  );
  for (const [key, value] of Object.entries(screensValues).reverse()) {
    if (screenWidth >= value) return key;
  }
  return Object.keys(screensValues)[0];
};

export const getContainerPaddingValues = () => {
  const paddingValues = transformObjectValuesToNumbers(containerPadding);
  return paddingValues;
};

export const calculateContainerPadding = (screenWidth: number) => {
  const screensValues = transformObjectValuesToNumbers(
    defaultScreens as Record<string, string>
  );
  const screenName = getScreenName(screenWidth);
  const paddingValues = getContainerPaddingValues();
  if (screenWidth < screensValues[screenName])
    return paddingValues["DEFAULT"] * 2;
  return (
    (screenWidth - screensValues[screenName] + paddingValues[screenName]) * 2
  );
};

function transformObjectValuesToNumbers(
  screens: Record<string, string>,
  replaceString = "px"
) {
  const sizes: Record<string, number> = {};

  for (const [key, value] of Object.entries(screens)) {
    if (String(value).includes(replaceString)) {
      sizes[key] = +String(value).replace(replaceString, "");
    }
  }
  return sizes;
}
