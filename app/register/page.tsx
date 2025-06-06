import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
    return (
      <Container>
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <Input type="email" placeholder="Email address" />
        <Input type="password" placeholder="Password" className="mt-4" />
        <Input type="password" placeholder="Confirm Password" className="mt-4" />
        <Button className="mt-6">
          Register
        </Button>
      </Container>
    );
  }