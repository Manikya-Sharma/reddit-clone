import { type ThemeProps, withTheme } from "@rjsf/core";
import DescriptionFieldTemplate from "./templates/DescriptionFieldTemplate";
import ErrorListTemplate from "./templates/ErrorListTemplate";
import FieldErrorTemplate from "./templates/FieldErrorTemplate";
import TitleFieldTemplate from "./templates/TitleFieldTemplate";
import EmailWidget from "./widgets/email-widget";
import PasswordWidget from "./widgets/password-widget";

const theme: ThemeProps = {
  widgets: {
    EmailWidget,
    PasswordWidget,
  },
  templates: {
    TitleFieldTemplate,
    DescriptionFieldTemplate,
    FieldErrorTemplate,
    ErrorListTemplate,
  },
};

/**
 * It is the form with custom fields and templates, but is not passed with validator.
 * If you want use validator then use DefaultForm component
 */
export const ThemedForm = withTheme(theme);
