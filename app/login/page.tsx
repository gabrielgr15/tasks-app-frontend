'use client';
import Container from "@/components/Container";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";



export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event : React.FormEvent) => {
    event.preventDefault();
    
    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)

    if (result.success){
      router.push('/dashboard')
    } else {
      
    }
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading':'Log in'}
        </Button>
      </form>
    </Container>
  );
}