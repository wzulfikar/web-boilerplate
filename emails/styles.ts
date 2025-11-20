export const main = {
  backgroundColor: '#ffffff',
}

export const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

export const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

export const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

export const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

export const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}

export const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
}

export const markdownCustomStyles = {
  h1: {
    ...h1,
    margin: '24px 0 16px', // Override just the margin from h1
  },
  h2: {
    ...h1, // Reuse h1 style as base
    fontSize: '18px', // Override just the size
    margin: '20px 0 12px',
  },
  p: {
    ...text, // Reuse text style
    lineHeight: '1.6',
    margin: '16px 0',
  },
  codeInline: {
    backgroundColor: '#f4f4f4',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '13px',
    color: text.color, // Reuse text color
  },
  ul: {
    marginBottom: '16px',
    color: text.color, // Reuse text color
    fontFamily: text.fontFamily, // Reuse font family
    paddingInlineStart: '25px',
  },
  li: {
    marginBottom: 5,
    lineHeight: '1.5',
    fontSize: text.fontSize, // Reuse text font size
  },
}

export const markdownContainerStyles = {
  padding: '0 16px',
  backgroundColor: '#fafafa',
  borderRadius: '6px',
  border: '1px solid #eee',
  fontFamily: text.fontFamily,
}
