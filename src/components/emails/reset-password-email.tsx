import { Body, Button, Container, Head, Html, Section, Tailwind, Text } from '@react-email/components';

type Props = {
  userName: string;
  resetUrl: string;
  requestTime: string;
};

const PasswordResetEmail = ({ resetUrl, userName, requestTime }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
            <Section>
              <Text className="mb-[24px] text-center text-[24px] font-bold text-gray-900">Reset Your Password</Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">Hello {userName},</Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                We received a request to reset your password for your account on {requestTime}. If you made this
                request, click the button below to reset your password:
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  href={resetUrl}
                  className="box-border rounded-[8px] bg-blue-600 px-[32px] py-[16px] text-[16px] font-medium text-white no-underline"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="mb-[24px] text-[16px] leading-[20px] text-gray-600">
                This link will expire in 24 hours for security reasons.
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                If you didn&apos;t request a password reset, please ignore this email. Your password will remain
                unchanged.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
