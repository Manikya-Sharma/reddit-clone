import { type ThemeProps, withTheme } from "@rjsf/core";

const theme: ThemeProps = {};

/**
 * It is the form with custom fields and templates, but is not passed with validator.
 * If you want use validator then use DefaultForm component
 */
export const ThemedForm = withTheme(theme);
