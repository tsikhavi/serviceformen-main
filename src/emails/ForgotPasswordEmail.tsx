import { Body, Container, Head, Html, Section, Text, Heading, Row, Column, Button, Font } from "@react-email/components";

export default function ForgotPasswordEmail(props) {
  const { login, token, title, description, loginText, buttonText } = props;

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Heading
            as="h1"
            style={{
              color: "#98042D",
              fontWeight: "500",
              textAlign: "center",
              fontSize: "20px",
              padding: "10px 25px 25px 25px",
              borderBottom: "0.5px solid #B8B8B8",
              margin: "20px 0",
            }}
          >
            {title}
          </Heading>
          <Section style={paragraphContent}>
            <Text style={paragraph}>{description}</Text>
            <Row>
              <Column width={"100px"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "400" }}>
                  {loginText}:
                </Text>
              </Column>
              <Column>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#98042D", fontWeight: "500" }}>{login}</Text>
              </Column>
            </Row>
            <Section style={buttonContainer}>
              <Button
                style={button}
                href={`https://${process.env.REACT_APP_SITE_NAME}.xyz/change_password/${token}/${login}`}
                target="_blank"
              >
                <Text style={{ marginTop: "10px", fontSize: "15px", color: "#FFFFFF", fontWeight: "500" }}>
                  {buttonText}
                </Text>
              </Button>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#E1E2E7",
  paddingTop: "40px",
  paddingBottom: "40px",
};

const container = {
  marginTop: "100px",
  marginBottom: "100px",
  width: "600px",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
  paddingBottom: "25px",
};

const paragraphContent = {
  padding: "0 40px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#98042D",
  borderRadius: "5px",
  fontWeight: "600",
  color: "#fff",
  width: "250px",
  height: "45px",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};
