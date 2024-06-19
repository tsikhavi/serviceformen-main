import { Body, Container, Head, Html, Section, Text, Heading, Row, Column, Font } from "@react-email/components";

export default function ContactUsEmail(props) {
  const { name, email, text, emailTitle, emailName, emailMessage } = props;

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
            {emailTitle}
          </Heading>
          <Section style={paragraphContent}>
            <Row>
              <Column width={"125px"} valign={"top"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "500" }}>
                  <b>{emailName}:</b>
                </Text>
              </Column>
              <Column valign={"top"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "400" }}>{name}</Text>
              </Column>
            </Row>
            <Row>
              <Column width={"125px"} valign={"top"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "500" }}>
                  <b>Email:</b>
                </Text>
              </Column>
              <Column valign={"top"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "400" }}>{email}</Text>
              </Column>
            </Row>
            <Row>
              <Column width={"125px"} valign={"top"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "500" }}>
                  <b>{emailMessage}:</b>
                </Text>
              </Column>
              <Column valign={"top"}>
                <Text style={{ margin: "5px 0px", fontSize: "15px", color: "#1B1B1B", fontWeight: "400" }}>{text}</Text>
              </Column>
            </Row>
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
