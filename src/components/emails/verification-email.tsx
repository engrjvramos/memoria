import { Body, Button, Container, Head, Html, Section, Tailwind, Text } from '@react-email/components';

type Props = {
  userName: string;
  verificationUrl: string;
};

const EmailVerification = ({ userName, verificationUrl }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 p-[48px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
            <Section className="mb-[32px] text-center">
              <Text className="m-0 mb-[8px] text-[28px] font-bold text-gray-900">Welcome to Memoria!</Text>
              <Text className="m-0 text-[16px] text-gray-600">Please confirm your email to get started</Text>
            </Section>

            <Section className="text-center">
              <Text className="text-[16px] text-gray-600">Hi {userName}!</Text>
              <Text className="mb-[24px] text-[16px] leading-[24px] text-balance text-gray-700">
                Thanks for signing up! To complete your registration and secure your account, please verify your email
                address by clicking the button below.
              </Text>

              <Section className="my-10 text-center">
                <Button
                  href={verificationUrl}
                  className="box-border rounded-[8px] bg-blue-500 px-[32px] py-[16px] text-[16px] font-semibold text-white no-underline"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="mb-[16px] text-[16px] leading-[24px] text-balance text-gray-700">
                This verification link will expire in 24 hours for security purposes.
              </Text>

              <Text className="text-[16px] leading-[24px] text-balance text-gray-700">
                If you didn&apos;t create an account with us, you can safely ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;
