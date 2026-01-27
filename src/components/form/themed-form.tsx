import { type ThemeProps, withTheme } from "@rjsf/core";
import EmailWidget from "./widgets/email-widget";
import PasswordWidget from "./widgets/password-widget";

const theme: ThemeProps = {
  widgets: {
    EmailWidget,
    PasswordWidget,
  },
};

/**
 * It is the form with custom fields and templates, but is not passed with validator.
 * If you want use validator then use DefaultForm component
 */
export const ThemedForm = withTheme(theme);
