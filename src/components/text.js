import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const splash_pink = (theme) => `
    font-size: 16px;
    font-weight: ${theme.fontWeights.bold};
    color: #F9616399;
    margin-right:auto;
`;

const splash_button = (theme) => `
    font-size: 20px;
    font-weight: ${theme.fontWeights.bold};
`;

const splash_heading = (theme) => `
    padding:10px 0px 20px 0px;
    font-size: 60px;
    font-weight: ${theme.fontWeights.bold};
    color: #3C444C;
`;
const welcomebar_caption = (theme) => `
    font-size: 20px;
    font-weight: ${theme.fontWeights.regular};
    color: #A3A3A3;
`;
const welcomebar_heading = (theme) => `
    font-size: 24px;
    font-weight: ${theme.fontWeights.bold};
    color: #F96163;
`;

const mealtag = (theme) => `
    font-size: 18px;
    font-weight: ${theme.fontWeights.regular};
    color: #999999;
    margin-right:10px;
    padding:10px 20px 10px 20px;
    border-radius:10px;
    background-color:#F3F3F3;
    height:40px;
`;
const mealtag_active = (theme) => `
    font-size: 18px;
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.brand.primary};
    margin-right:10px;
    padding:10px 20px 10px 20px;
    border-radius:10px;
    background-color:${theme.colors.brand.primary}12;
    height:40px;
`;
const card_rating = (theme) => `
    font-size: 25px;
    color: #FFF;
`;
const card_heading = (theme) => `
    font-size: 22px;
    font-weight: ${theme.fontWeights.bold};
    color: #FFF;
`;
const card_timer = (theme) => `
    font-size: 18px;
    color: #FFF;
`;

const recipe_header = (theme) => `
    font-size: 24px;
    font-weight: ${theme.fontWeights.bold};
    color: #131313;
`;

const recipe_title = (theme) => `
    font-size: 26px;
    font-weight: ${theme.fontWeights.regular};
    color: #131313;
    margin:0 auto;
`;

const recipe_info_value = (theme) => `
    font-size: 20px;
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.brand.primary};
`;
const recipe_info_text = (theme) => `
    font-size: 20px;
    font-weight: ${theme.fontWeights.regular};
    color: #C1C1C1;
`;
const recipe_summary = (theme) => `
    font-size: 18px;
    font-weight: ${theme.fontWeights.regular};
    color: #131313;
    padding:10px;
`;

const variants = {
  body,
  mealtag,
  mealtag_active,
  error,
  hint,
  splash_pink,
  splash_button,
  splash_heading,
  welcomebar_caption,
  welcomebar_heading,
  card_rating,
  card_heading,
  card_timer,
  recipe_header,
  recipe_title,
  recipe_info_text,
  recipe_info_value,
  recipe_summary,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
