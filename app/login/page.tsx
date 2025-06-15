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

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event : React.FormEvent) => {
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:4000/api/users/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const data = await response.json()
      console.log('Login response:', data);  
      if (response.ok) {
        localStorage.setItem('authToken', data.accessToken)
        await login(email, password);
        router.push('/dashboard');
      }
      else {
        
      }  
    }catch (error){
      console.log('Login failed:', error);
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
        <Button type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}